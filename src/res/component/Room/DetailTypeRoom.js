import { useEffect,useState } from "react"
import BranchGallery from "./BranchGallery"
import "./styleOfRoom.css"
   
const DetailTypeRoom = ({isClick,setRoom,setSrcImage,data}) => {
    const [price,setPrice] = useState({
        basePrice:0,
        sundayPrice:0,
        peakPrice:0,
        peakSundayPrice:0
    })
    console.log(price)
    useEffect(()=>{
        if(data)
            setPrice({
                basePrice:data.basePrice || 0,
                sundayPrice:data.priceSundayNormal || 0,
                peakPrice:data.pricePeakSeason || 0,
                peakSundayPrice:data.pricePeakSunday || 0
            })
    },[data,setPrice])
    return <>
            <section className="detail-section" style={{ display: isClick !== -1 ? 'block' : 'none'}}>
                <hr/>
                <div className="detail-header">
                    <h3>Chi tiết loại phòng: <span id="selectedTypeName">{data?.typeName || ""}</span></h3>
                    <p>Tổng số phòng thuộc loại: <b id="selectedTypeCount">{data?.rooms || 0}</b></p>
                </div>

                <div className="detail-price">
                    <div className="input-price">
                        <input type="text" id="price-1" className="input-field" placeholder="" value={data?.basePrice.toLocaleString('vi-VN') + 'đ'} readOnly/>
                        <label htmlFor="price-1" className="input-label">Giá ngày thường</label>
                    </div>
                    <div className="input-price">
                        <input type="text" id="price-2" className="input-field" placeholder="" value={data?.priceSundayNormal.toLocaleString('vi-VN') + 'đ'} readOnly/>
                        <label htmlFor="price-2" className="input-label">Giá chủ nhật</label>
                    </div>
                    <div className="input-price">
                        <input type="text" id="price-3" className="input-field" placeholder="" value={data?.pricePeakSeason.toLocaleString('vi-VN') + 'đ'} readOnly/>
                        <label htmlFor="price-3" className="input-label">Giá mùa cao điểm</label>
                    </div>
                    <div className="input-price">
                        <input type="text" id="price-4" className="input-field" placeholder="" value={data?.pricePeakSunday.toLocaleString('vi-VN') + 'đ'} readOnly/>
                        <label htmlFor="price-4" className="input-label">Giá CN cao điểm</label>
                    </div>
                </div>

                <BranchGallery setSrcImage={setSrcImage} images={data?.images || []}/>
                
                <div className="amenities-preview">
                    <strong>Tiện nghi:</strong>
                    <label><input type="checkbox" checked disabled/> Wifi</label>
                    <label><input type="checkbox" checked disabled/> Đỗ xe miễn phí</label>
                </div>

                <div className="section-header">
                    <h4>Danh sách mã phòng</h4>
                    <button className="btn btn-success" onClick={()=>setRoom({})}> + Thêm phòng</button>
                </div>

                <table className="detail-table">
                    <thead>
                        <tr>
                            <th>Mã phòng</th>
                            <th>Trạng thái</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="roomDetailBody">
                        
                    </tbody>
                </table>
            </section>
    </>
}
export default DetailTypeRoom