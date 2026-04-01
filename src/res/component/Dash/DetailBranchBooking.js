import "./style.css"
import RowDetailBooking from "./RowDetailBooking";
const bookings = [
    { name: "Trần Anh Tuấn", room: "Deluxe 101", date: "22/03/2026", status: "Confirmed" },
    { name: "Lê Thị Lan", room: "Suite 305", date: "22/03/2026", status: "Pending" },
    { name: "Michael Smith", room: "Standard 202", date: "23/03/2026", status: "Confirmed" }
];
const DetailBranchBooking = () => {
    return <>
        <section className="details-grid">
            <div className="recent-bookings">
                <h2>Đơn đặt phòng mới nhất</h2>
                <table>
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
                            bookings.map( (item,index) => <RowDetailBooking dataOfRow={item} key={index}/>)
                        }
                    </tbody>
                </table>
            </div>

            <div className="room-status">
                <h2>Trạng thái phòng nhanh</h2>
                <div className="status-list">
                    <div className="status-item"><span className="dot available"></span> Trống: 15</div>
                    <div className="status-item"><span className="dot occupied"></span> Đang ở: 40</div>
                    <div className="status-item"><span className="dot dirty"></span> Cần dọn: 5</div>
                </div>
            </div>
        </section>
    </>
}

export default DetailBranchBooking