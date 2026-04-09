import "./styleOfRoom.css"
import BranchGallery from "./BranchGallery"

const FormDetailTypeRoom = ({data,price,setSrcImage,roomImage}) => {
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

        <BranchGallery setSrcImage={setSrcImage} images={roomImage || []}/>
        
        <div className="amenities-preview">
            <strong>Tiện nghi:</strong>
            {
                data?.amenities.map( (item,index) => <label key={index} style={{marginRight:'10px'}} ><input type="checkbox" checked disabled/>{item.description}</label>)
            }
        </div>
    </>
}

export default FormDetailTypeRoom