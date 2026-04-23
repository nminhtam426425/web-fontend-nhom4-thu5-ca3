import "./styleOfRoom.css"
import BranchGallery from "./BranchGallery"

const FormDetailTypeRoom = ({dataDetail,setSrcImage,roomImage}) => {
    console.log(dataDetail)
    return <>
        <div className="detail-header">
            <h3>Chi tiết loại phòng: <span id="selectedTypeName">{dataDetail?.typeName || ""}</span></h3>
            <p>Tổng số phòng thuộc loại: <b id="selectedTypeCount">{dataDetail?.totalRooms || 0}</b></p>
        </div>
        <div className="detail-price">
            <div className="input-price">
                <input type="text" id="price-1" className="input-field" placeholder="" value={dataDetail?.basePrice?.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-1" className="input-label">Giá ngày thường</label>
            </div>
            <div className="input-price">
                <input type="text" id="price-2" className="input-field" placeholder="" value={dataDetail?.priceSundayNormal?.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-2" className="input-label">Giá chủ nhật</label>
            </div>
            <div className="input-price">
                <input type="text" id="price-3" className="input-field" placeholder="" value={dataDetail?.pricePeakSeason?.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-3" className="input-label">Giá mùa cao điểm</label>
            </div>
            <div className="input-price">
                <input type="text" id="price-4" className="input-field" placeholder="" value={dataDetail?.pricePeakSunday?.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-4" className="input-label">Giá CN cao điểm</label>
            </div> 
            <div className="input-price">
                <input type="text" id="price-5" className="input-field" placeholder="" value={dataDetail?.priceHour?.toLocaleString('vi-VN') + 'đ'} readOnly/>
                <label htmlFor="price-5" className="input-label">Giá thuê giờ</label>
            </div>
        </div>

        <BranchGallery setSrcImage={setSrcImage} images={roomImage || []}/>
        
        <div className="amenities-preview">
            <strong>Tiện nghi:</strong>
            {
                dataDetail?.amenities?.map( (item,index) => <label key={index} style={{marginRight:'10px'}} ><input type="checkbox" checked disabled/>{item.description}</label>)
            }
        </div>
    </>
}

export default FormDetailTypeRoom