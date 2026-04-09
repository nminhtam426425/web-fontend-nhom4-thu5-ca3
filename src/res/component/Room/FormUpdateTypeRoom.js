import { useEffect, useRef, useState } from "react"
import "./styleOfRoom.css"
import RowTableImage from "../table/RowTableImage"
import {apiCloudinary,apiUserService,useBranch} from "../index"

const FormUpdateTypeRoom = ({dataDetail,price,setRoomImage,roomImage,setDataDetail}) => {
    const inputImage = useRef(null)
    const [imgToUpload,setImgToUpload] = useState([])
    const {setIsLoading} = useBranch()

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

    const handleButtonAddImage = async (e) => {
        setIsLoading(true)
        const urlImg = await uploadToCloudinary(imgToUpload)
        try{
            let imgs = []
            for(let i of urlImg){
                const res = await fetch(apiUserService.baseURL+`/room-images?typeId=${dataDetail.typeId}&imageUrl=${i}`,{
                    method:'POST'
                })
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
    },[dataDetail?.images,setRoomImage])

    return <>
            <div className="detail-price">
            <div className="input-price">
                <input type="text" id="price-1" className="input-field" placeholder="" value={price?.basePrice.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-1" className="input-label">Giá ngày thường</label>
            </div>
            <div className="input-price">
                <input type="text" id="price-2" className="input-field" placeholder="" value={price?.sundayPrice.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-2" className="input-label">Giá chủ nhật</label>
            </div>
            <div className="input-price">
                <input type="text" id="price-3" className="input-field" placeholder="" value={price?.peakPrice.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-3" className="input-label">Giá mùa cao điểm</label>
            </div>
            <div className="input-price">
                <input type="text" id="price-4" className="input-field" placeholder="" value={price?.peakSundayPrice.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-4" className="input-label">Giá CN cao điểm</label>
            </div> 
            <div className="input-price">
                <input type="text" id="price-5" className="input-field" placeholder="" value={price?.priceHour.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-5" className="input-label">Giá thuê giờ</label>
            </div>
        </div>
        <div className="container-manager-image-2">
            <div className="actions">
                <input type="file" accept=".jpg, .jpeg, .png" multiple style={{display:'none'}} onChange={handleImageChange} ref={inputImage}/>
                <button className="btn btn-add" onClick={handleButtonAddImageClick}>
                    + Thêm hình ảnh
                </button>
                <button className="btn btn-add" onClick={handleButtonAddImage} style={{marginLeft:'20px', cursor: !imgToUpload ? 'not-allowed' : 'pointer'}} disabled={!imgToUpload}>
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
                                                                        setImgToUpload={setImgToUpload}/>
                        )
                    }
                </tbody>
            </table>
        </div>
        <div className="amenities-preview">
            <strong>Tiện nghi:</strong>
            {
                dataDetail?.amenities.map( (item,index) => <label key={index} style={{marginRight:'10px'}} ><input type="checkbox" checked/>{item.description}</label>)
            }
        </div>
    </>
}

export default FormUpdateTypeRoom