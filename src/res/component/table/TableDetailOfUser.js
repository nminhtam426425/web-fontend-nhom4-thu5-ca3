import "./styleOfTable.css"
import { MemberLevel,PrintAmountVND } from "../Dash"
const RowDetail = ({data}) => {
    return <>
        <tr>
            <td>{data?.typeName}</td>
            <td>{data?.roomNumber}</td>
            <td>{data?.checkIn}</td>
            <td>{data?.checkOut}</td>
            <td>
                <PrintAmountVND amount={data?.alreadySpent}/>
            </td>
            <td>{data?.rating} sao</td>
        </tr>
    </>
}
const  TableDetailOfUser = ({detailOfUser}) => {
    return <>
        <div className="booking-detail-container" style={{ display: (detailOfUser?.name) ? 'block' : 'none'}}>
        <div className="customer-info-card">
            <h2 className="title">Chi Tiết Khách Hàng</h2>
            <div className="info-grid">
                <div className="info-item">
                    <span className="label">Tên khách hàng:</span>
                    <span className="value" id="customer-name">{detailOfUser?.name || ""}</span>
                </div>
                <div className="info-item">
                    <span className="label">Số điện thoại:</span>
                    <span className="value" id="customer-phone">{detailOfUser?.phone || ""}</span>
                </div>
                <div className="info-item">
                    <span className="label">Hạng thành viên:</span>
                    <span className="value badge-gold" id="member-rank">
                        <MemberLevel amount={detailOfUser?.alreadySpent || 0} />
                    </span>
                </div>
                <div className="info-item">
                    <span className="label">Tổng tiền đã chi:</span>
                    <span className="value total-amount" id="total-spent">
                        <PrintAmountVND amount={detailOfUser?.alreadySpent || 0}/>
                    </span>
                </div>
            </div>
        </div>
    
        <div className="booking-list-section">
            <h3 className="subtitle">Lịch sử đặt phòng</h3>
            {
                (detailOfUser?.roomRent?.length === 0)
                ? 
                    <h3 className="subtitle">Hiện tại khách hàng này chưa đặt phòng tại khách sạn !</h3>
                :
                    <div className="table-responsive">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Loại phòng</th>
                                <th>Số phòng</th>
                                <th>Ngày Check-in</th>
                                <th>Ngày Check-out</th>
                                <th>Chi phí</th>
                                <th>Đánh giá</th>
                            </tr>
                        </thead>
                        <tbody id="booking-data">
                            {
                                detailOfUser?.roomRent?.map( (item,index) => <RowDetail key={index} data={item} />)
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    </div>
    </>
}

export default TableDetailOfUser