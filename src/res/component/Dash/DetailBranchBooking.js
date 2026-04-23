import "./style.css"
import RowDetailBooking from "./RowDetailBooking";
import SelectBranch from "./SelectBranch";
// const bookings = [
//     { name: "Trần Anh Tuấn", room: "Deluxe 101", date: "22/03/2026", status: "Confirmed" },
//     { name: "Lê Thị Lan", room: "Suite 305", date: "22/03/2026", status: "Pending" },
//     { name: "Michael Smith", room: "Standard 202", date: "23/03/2026", status: "Confirmed" }
// ];
const DetailBranchBooking = ({dataOfDash}) => {
    return <>
        <section className="details-grid">
            <div className="recent-bookings">
                <h2 style={{marginBottom:'10px'}}>Đơn đặt phòng mới nhất</h2>
                <SelectBranch/>
                {
                     (dataOfDash?.newCustomer?.length === 0)
                     ?
                        <h3>Hiện tại chưa có booking mới !</h3>
                     :
                     <table style={{marginTop:'10px'}}>
                        <thead>
                            <tr>
                                <th style={{backgroundColor:'aquamarine'}}>Khách hàng</th>
                                <th style={{backgroundColor:'aquamarine'}}>Loại phòng</th>
                                <th style={{backgroundColor:'aquamarine'}}>Ngày đến</th>
                                <th style={{backgroundColor:'aquamarine'}}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody id="booking-data-1">
                            {
                                dataOfDash?.newCustomer?.map( (item,index) => <RowDetailBooking dataOfRow={item} key={index}/>)
                            }
                        </tbody>
                    </table>
                }
            </div>

            <div className="room-status">
                <h2>Trạng thái phòng nhanh</h2>
                <div className="status-list">
                    <div className="status-item"><span className="dot available"></span> Trống: {dataOfDash?.rooms?.empty || 0}</div>
                    <div className="status-item"><span className="dot occupied"></span> Đang ở: {dataOfDash?.rooms?.use || 0}</div>
                    <div className="status-item"><span className="dot dirty"></span> Cần dọn: {dataOfDash?.rooms?.needClean || 0}</div>
                </div>
            </div>
        </section>
    </>
}

export default DetailBranchBooking