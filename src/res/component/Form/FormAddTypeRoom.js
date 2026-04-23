import { useEffect, useState,useRef } from "react"
import "./styleOfForm.css"
import { useBranch,apiUserService,apiCloudinary, customeFetch } from "../index"
import RowTableImage from "../table/RowTableImage"
import {passValidation,validateNoSpecialChars} from "../Valid"

const FormAddStyleRoom = ({setDataItem,setDatas}) => {
    const [amenities,setAmenities] = useState([])
    let [amenitiesForCreate,setAmenitiesForCreate] = useState([])
    const [imageAdminChose,setImageAdminChose] = useState([])
    const [price,setPrice] =useState({
        typeName:"",
        basePrice:"",
        sundayPrice:"",
        peakPrice:"",
        peakSundayPrice:"",
        priceHour:"",
        capacity:""
    })
    const [errorPrice,setErrorPrice] = useState({
        typeName: validateNoSpecialChars("")
    })
    const inputImage = useRef(null)
    const {setIsLoading,selectedBranchId} = useBranch()

    const [focusField, setFocusField] = useState(null);

    const formatCurrency = (val) => {
        return Number(val).toLocaleString('vi-VN') + 'đ';
    };

    const handleInputChange = (e) => {
        const { id } = e.target
       
        if(id === 'typeName'){
            const {value} = e.target;
            setPrice({
                ...price,
                [id]: value 
            })
            setErrorPrice({
                ...errorPrice,
                [id]: validateNoSpecialChars(value)
            })
        }
        else{
            const value = e.target.value.replace(/\D/g, '');
            setPrice({
                ...price,
                [id]: value 
            })
        }
    }

    useEffect(() => {
        const handleFetchAmenities = async ()  => {
            try{
                setIsLoading(true)
                const res = await customeFetch(apiUserService.baseURL+'/amenities','authen','GET')
                if(res.ok){
                    const data  = await res.json()
                    setAmenities(data.data)
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("loi aly tien nghi roi ni oi !")
            }
        }
        handleFetchAmenities()
    },[setIsLoading])

    const uploadToCloudinary = async (arrayFile) => {
        const uploadPromises = arrayFile.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file.fileToUpload);
            formData.append("upload_preset", apiCloudinary.preset);
    
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${apiCloudinary.cloudName}/image/upload`, {
                    method: "POST",
                    body: formData,
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error.message || "Upload failed");
                }
    
                const data = await response.json();
                return data.secure_url; // Trả về link ảnh cho mỗi Promise
            } catch (error) {
                console.error("Lỗi khi upload:", error);
                return null; // Trả về null nếu lỗi để không làm hỏng Promise.all
            }
        });
    
        const results = await Promise.all(uploadPromises);
        
        return results.filter(url => url !== null);
    };

    const handleAddTypeRoom = async () => {
        try{
            setIsLoading(true)
            let imagesToSave = await uploadToCloudinary(imageAdminChose)

            const res = await customeFetch(apiUserService.baseURL+'/roomtypes',
                'authen',
                'POST',
                JSON.stringify({
                    typeName:price.typeName,
                    descriptionRoom:1,
                    basePrice: price.basePrice,
                    priceSundayNormal: price.sundayPrice,
                    pricePeakSeason: price.peakPrice,
                    pricePeakSunday: price.peakSundayPrice,
                    priceHour: price.priceHour,
                    capacity: Number(price.capacity),
                    images: imagesToSave,
                    branchIds: [selectedBranchId],
                    amenities: amenitiesForCreate
                })
            )
           if(res.ok){
                const data  = await res.json()
                if(data){
                    setDatas( roomtypes => 
                        [
                            ...roomtypes,
                            data
                        ]
                    )
                    setDataItem(null)
                    setAmenities([])
                }
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi roi ni oi !",err)
        }
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length !== 0) {
            const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

            files.forEach(file => {
                if (validExtensions.includes(file.type)) {
                    const imageData = {
                        isNew: true,
                        id: Date.now() + Math.random(),
                        name: file.name,
                        url: URL.createObjectURL(file),
                        fileToUpload:file
                    }
                    setImageAdminChose( images => [...images,imageData])
                } else {
                    alert(`File "${file.name}" không đúng định dạng (Chỉ nhận JPG, PNG, JPEG)`);
                }
            })
        }
    }

    const handleDeleteImage = (img) => {
        const imageToDelete = imageAdminChose.find(image => image.id === img.id)
        URL.revokeObjectURL(imageToDelete.url)
        setImageAdminChose( image => image.filter(image => image.id !== img.id))
    }

    const handleOnChangeService = (e) => {
        let isChose = e.target.checked
        let valueAmenities = e.target.value
        if(isChose)
            setAmenitiesForCreate(services => [...services,valueAmenities])
        else
            setAmenitiesForCreate(services => services.filter( item => item !== valueAmenities))
    }

    const handleButtonAddImage = () => {
        inputImage.current.click()
    }

    return <>
        <div className="modal-content" style={{width:'900px'}}>
            <span className="close" onClick={()=>setDataItem(null)}>&times;</span>
            <h3 style={{margin:'10px 0'}}>Thêm loại phòng mới</h3>
            <div>
                <div style={{display:'flex',gap:'20px'}}>
                    <div className="input-price" style={{flex:1}}>
                        <input type="text" id="typeName" className="input-field" value={price.typeName} onChange={handleInputChange} placeholder=""/>    
                        <label htmlFor="typeName" className="input-label">Tên loại phòng</label>
                        <span className="validation">{errorPrice.typeName}</span>
                    </div>
                    <div className="input-price" style={{flex:1}}>
                        <input type="text" id="capacity" className="input-field" value={price.capacity} onChange={handleInputChange} placeholder=""/>
                        <label htmlFor="capacity" className="input-label">Sức chứa</label>
                    </div>
                </div>
                <br/>
                <h3>Chọn ảnh:</h3>
                <div className="container-manager-image">
                    <div className="actions">
                        <input type="file" multiple accept=".jpg, .jpeg, .png" style={{display:'none'}}onChange={handleImageChange} ref={inputImage}/>
                        <button className="btn btn-add" onClick={handleButtonAddImage}>
                            + Thêm hình ảnh
                        </button>
                    </div>
                    <table id="imageTable">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Xem trước</th>
                                <th>Tên file</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody id="imageBody">
                            {
                                imageAdminChose.map( (item,index) => <RowTableImage key={index} index={index} img={item} handleDeleteImage={handleDeleteImage}/>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="checkbox-group">
                    <p>Tiện nghi:</p>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        {
                            amenities.map( (item,index) =>  
                                <label style={{margin:'10px',Width:'40px'}} key={index}>
                                    <input value={item.idAmenities} type="checkbox" onChange={handleOnChangeService}/>{item.description}
                                </label>
                            )
                        }
                    </div>
                </div>
                <div className="detail-price">
                    <div className="input-price">
                        <input type="text" id="basePrice" className="input-field"
                                laceholder="" 
                                value={focusField === 'basePrice' ? price.basePrice : formatCurrency(price.basePrice)}
                                onFocus={() => setFocusField('basePrice')}
                                onBlur={() => setFocusField(null)}
                                onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="basePrice" className="input-label">Giá ngày thường</label>
                    </div>
                    <div className="input-price">
                        <input type="text" id="sundayPrice" className="input-field" 
                                placeholder="" 
                                value={focusField === 'sundayPrice' ? price.sundayPrice : formatCurrency(price.sundayPrice)}
                                onFocus={() => setFocusField('sundayPrice')}
                                onBlur={() => setFocusField(null)}
                                onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="sundayPrice" className="input-label">Giá chủ nhật</label>
                    </div>
                    <div className="input-price">
                        <input type="text" id="peakPrice" className="input-field" 
                                placeholder="" 
                                value={focusField === 'peakPrice' ? price.peakPrice : formatCurrency(price.peakPrice)}
                                onFocus={() => setFocusField('peakPrice')}
                                onBlur={() => setFocusField(null)}
                                onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="peakPrice" className="input-label">Giá mùa cao điểm</label>
                    </div>
                    <div className="input-price">
                        <input type="text" id="peakSundayPrice" className="input-field" 
                                placeholder="" 
                                value={focusField === 'peakSundayPrice' ? price.peakSundayPrice : formatCurrency(price.peakSundayPrice)}
                                onFocus={() => setFocusField('peakSundayPrice')}
                                onBlur={() => setFocusField(null)}
                                onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="peakSundayPrice" className="input-label">Giá CN cao điểm</label>
                    </div> 
                    <div className="input-price">
                        <input type="text" id="priceHour" className="input-field" 
                                placeholder="" 
                                value={focusField === 'priceHour' ? price.priceHour : formatCurrency(price.priceHour)}
                                onFocus={() => setFocusField('priceHour')}
                                onBlur={() => setFocusField(null)}
                                onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="priceHour" className="input-label">Giá thuê giờ</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" 
                        style={{padding:'10px 50px',display:'block',margin:'0 auto',cursor: passValidation(errorPrice) ? 'pointer' : 'not-allowed'}} 
                        onClick={handleAddTypeRoom} 
                        disabled={passValidation(errorPrice) ? false : true}>
                Lưu</button>
            </div>
        </div>
    </>
}

export default FormAddStyleRoom