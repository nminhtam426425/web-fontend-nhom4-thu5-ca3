import { useEffect, useRef, useState } from "react"
import "./styleOfRoom.css"
import RowTableImage from "../table/RowTableImage"
import {apiCloudinary,apiUserService,customeFetch,useBranch} from "../index"

const FormUpdateTypeRoom = ({dataDetail,price,setRoomImage,roomImage,setDataDetail}) => {
    const inputImage = useRef(null)
    const [imgToUpload,setImgToUpload] = useState([])
    const {setIsLoading} = useBranch()
    const [amenities,setAmenities] = useState([])
    const [amenitiesForUpdate,setAmenitiesForUpdate] = useState([])
    const [typeName, setTypeName] = useState({
        typeName: dataDetail?.typeName || "",
        capacity: dataDetail?.capacity || 0
    })

    const [priceUpdate,setPriceUpdate] = useState({
        basePrice: price?.basePrice || 0,
        sundayPrice: price?.sundayPrice || 0,
        peakPrice: price?.peakPrice || 0,
        peakSundayPrice: price?.peakSundayPrice || 0,
        priceHour: price?.priceHour || 0
    })

    const [focusField, setFocusField] = useState(null);

    const formatCurrency = (val) => {
        return Number(val).toLocaleString('vi-VN') + 'đ';
    };

    const handleChange = (e,field) => {
        const value = e.target.value.replace(/\D/g, '');
        setPriceUpdate(prev => ({
            ...prev,
            [field]: value === '' ? 0 : parseInt(value)
        }));
    };

    const handleOnChangAmenities = (e) => {
        let isChose = e.target.checked
        let valueAmenities = e.target.value
        if(isChose){
            setAmenitiesForUpdate(services => [...services,Number(valueAmenities)])
        }
        else{
            setAmenitiesForUpdate(services => services.filter( item => item !== Number(valueAmenities)))
        }
        setAmenities(items => items.map( item => {
            if(item.idAmenities.toString() === valueAmenities)
                item.checked=isChose
            return item
        }))
    }

    const onChangeInput = (e) => {
        const {id} = e.target
        if(id === 'typeName'){
            let {value} = e.target
            setTypeName(pre => ({
                ...pre,
                [id]: value
            }))
        }
        else{
            const value = e.target.value.replace(/\D/g, '')
            setTypeName(pre => ({
                ...pre,
                [id]: value
            }))
        }
        
    }

    const uploadToCloudinary = async (arrayFile) => {
        const uploadPromises = arrayFile.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file.fileToUpload);
            formData.append("upload_preset", apiCloudinary.preset);
    
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${apiCloudinary.cloudName}/image/upload`,{
                    method: 'POST',
                    body: formData
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length !== 0) {
            const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

            let imgs = files.map(file => {
                if (validExtensions.includes(file.type)) {
                    const imageData = {
                        isNew:true,
                        imageId: file.name.slice(0,file.name.lastIndexOf(".")),
                        name: 'test'+file.name,
                        url: URL.createObjectURL(file),
                        fileToUpload:file
                    }
                    return imageData
                } 
                return null
            })

            imgs = imgs.filter(item => item !== null)
            setImgToUpload( images => [...images,...imgs])
            setRoomImage(images => [...images,...imgs])
            let temp = dataDetail
            temp.images = [...roomImage,...imgs]
            setDataDetail(temp)
        }
    }

    const handleDeleteImage = (img) => {
        const imageToDelete = roomImage.find(image => image.imageId === img.imageId)
        URL.revokeObjectURL(imageToDelete.url)
        setImgToUpload( image => image.filter(image => image.imageId !== img.imageId))
        setRoomImage( image => image.filter(image => image.imageId !== img.imageId))
    }

    const handleButtonAddImage = async (e) => {
        setIsLoading(true)
        const urlImg = await uploadToCloudinary(imgToUpload)
        try{
            let imgs = []
            for(let i of urlImg){
                const res = await customeFetch(apiUserService.baseURL+`/room-images?typeId=${dataDetail.typeId}&imageUrl=${i}`,'authen','POST')
                if(res.ok){
                    const dataRes = await res.json()
                    imgs.push({
                        imageId:dataRes.imageId,
                        imageUrl: dataRes.imageUrl
                    })
                }
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(true)
            console.log("loi khi up anh",err)
        }
    }

    const handleButtonAddImageClick = () => {
       inputImage.current.click()
    }

    useEffect( ()=>{
        setRoomImage(dataDetail?.images)
        const handleGetAmentities = async () => {
            try{
                setIsLoading(true)
                const res = await customeFetch(apiUserService.baseURL+'/amenities','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    const dataAmenities = data.data.map( 
                        item => {
                            const isChecked = dataDetail?.amenities?.some(
                                detailItem => detailItem.idAmenities === item.idAmenities
                            )
                            item.checked = (isChecked) ? true : false
                            return item
                        })
                    setAmenities(dataAmenities)
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("loi lay tien nghi")
            }
        }
        handleGetAmentities()
        setAmenitiesForUpdate(dataDetail?.amenities?.map( item => item.idAmenities))
    },[dataDetail?.images,setRoomImage,setIsLoading,dataDetail?.amenities])

    const updatePriceTypeRoom = async () => {
        try{
            setIsLoading(true)
            const res = await customeFetch(apiUserService.baseURL+`/roomtypes/${dataDetail?.typeId}`,
                'authen',
                'PUT',
                JSON.stringify({
                    typeName:typeName.typeName,
                    basePrice: priceUpdate?.basePrice ,
                    sundayPrice: priceUpdate?.sundayPrice,
                    peakPrice: priceUpdate?.peakPrice,
                    peakSundayPrice: priceUpdate?.peakSundayPrice,
                    priceHour: priceUpdate?.priceHour,
                    capacity: Number(typeName.capacity),
                    amenities: amenitiesForUpdate
                })
            )
            if(res.ok){
                const data = await res.json()
                let temp = dataDetail
                temp.amenities = data.amenities
                temp.basePrice = data.basePrice
                temp.priceSundayNormal = data.priceSundayNormal
                temp.pricePeakSeason = data.pricePeakSeason
                temp.pricePeakSunday = data.pricePeakSunday
                temp.priceHour = data.priceHour
                temp.capacity = data.capacity
                temp.typeName = data.typeName
                setDataDetail(temp)
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi update loai phong")
        }
        
    }

    return <>
        <div className="detail-header">
            <div style={{display:'flex',width:'100%'}}>
                <h3 style={{flex:1}}>Tên phòng: 
                    <input type="text" 
                        className="input-field"  
                        style={{width:'50%'}}
                        id="typeName" 
                        value={typeName.typeName}
                        onChange={onChangeInput}/>
                </h3>
                <h3 style={{flex:1}}> Người / phòng
                    <input type="text" 
                            className="input-field"  
                            id="capacity"
                            style={{width:'20%'}} 
                            value={typeName.capacity}
                            onChange={onChangeInput}/>
                </h3>
            </div>
           
            <div style={{display:'flex',gap:'100px'}}>
                <p style={{padding:'8px 15px',paddingLeft:0}}>Tổng số phòng thuộc loại: <b id="selectedTypeCount">{dataDetail?.totalRooms || 0}</b></p>
                <button className="btn btn-add" onClick={updatePriceTypeRoom}>
                    Lưu thay đổi giá và tiện nghi
                </button>
            </div>
        </div>
        <div className="amenities-preview">
            <strong>Tiện nghi:</strong>
            {
                amenities.map( (item,index) => {
                    return (
                        <label key={index} style={{ marginRight: '10px' }}>
                            <input 
                                value={item.idAmenities}
                                type="checkbox" 
                                checked={item.checked}
                                onChange={handleOnChangAmenities} 
                            />
                            {item.description}
                        </label>
                    )
                })
            }
        </div>
        <div className="detail-price">
            <div className="input-price">
                <input type="text" id="price-1" 
                    className="input-field" 
                    placeholder="" 
                    value={focusField === 'basePrice' ? priceUpdate.basePrice : formatCurrency(priceUpdate.basePrice)}
                    onFocus={() => setFocusField('basePrice')}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => handleChange(e, 'basePrice')}/>
                <label htmlFor="price-1" className="input-label">Giá ngày thường</label>
            </div>

            <div className="input-price">
                <input type="text" id="price-2" 
                    className="input-field" 
                    placeholder=""  
                    value={focusField === 'sundayPrice' ? priceUpdate.sundayPrice : formatCurrency(priceUpdate.sundayPrice)}
                    onFocus={() => setFocusField('sundayPrice')}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => handleChange(e, 'sundayPrice')}/>
                <label htmlFor="price-2" className="input-label">Giá chủ nhật</label>
            </div>

            <div className="input-price">
                <input type="text" id="price-3" 
                    className="input-field" 
                    placeholder="" 
                    value={focusField === 'peakPrice' ? priceUpdate.peakPrice : formatCurrency(priceUpdate.peakPrice)}
                    onFocus={() => setFocusField('peakPrice')}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => handleChange(e, 'peakPrice')}/>
                <label htmlFor="price-3" className="input-label">Giá mùa cao điểm</label>
            </div>

            <div className="input-price">
                <input type="text" id="price-4" 
                    className="input-field" 
                    placeholder="" 
                    value={focusField === 'peakSundayPrice' ? priceUpdate.peakSundayPrice : formatCurrency(priceUpdate.peakSundayPrice)}
                    onFocus={() => setFocusField('peakSundayPrice')}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => handleChange(e, 'peakSundayPrice')}/>
                <label htmlFor="price-4" className="input-label">Giá CN cao điểm</label>
            </div> 

            <div className="input-price">
                <input type="text" id="price-5" 
                    className="input-field" 
                    placeholder="" 
                    value={focusField === 'priceHour' ? priceUpdate.priceHour : formatCurrency(priceUpdate.priceHour)}
                    onFocus={() => setFocusField('priceHour')}
                    onBlur={() => setFocusField(null)}
                    onChange={(e) => handleChange(e, 'priceHour')}/>
                <label htmlFor="price-5" className="input-label">Giá thuê giờ</label>
            </div>
        </div>
        <div className="container-manager-image-2">
            <div className="actions">
                <input type="file" accept=".jpg, .jpeg, .png" multiple style={{display:'none'}} onChange={handleImageChange} ref={inputImage}/>
                <button className="btn btn-add" onClick={handleButtonAddImageClick}>
                    + Thêm hình ảnh
                </button>
                <button className="btn btn-add" onClick={handleButtonAddImage} 
                                                style={{marginLeft:'20px', cursor: imgToUpload.length===0 ? 'not-allowed' : 'pointer'}} 
                                                disabled={imgToUpload.length===0}>
                    Lưu
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
                        roomImage.map( (item,index) => <RowTableImage key={index} 
                                                                        index={index} 
                                                                        img={item} 
                                                                        setRoomImage={setRoomImage} 
                                                                        setDataDetail={setDataDetail} 
                                                                        roomImage={roomImage}
                                                                        dataDetail={dataDetail}
                                                                        setImgToUpload={setImgToUpload}
                                                                        handleDeleteImage={handleDeleteImage}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    </>
}

export default FormUpdateTypeRoom