import "./style.css"
import RowDetailBooking from "./RowDetailBooking";
import SelectBranch from "./SelectBranch";
import { useEffect, useState } from "react";
import { apiUserService, useBranch } from "../index.js";
const DetailBranchBooking = ({data}) => {
    const [bookings, setBookings] = useState([]);
    const { setIsLoading } = useBranch();

    useEffect(() => {
        const fetchBookings = async () => {
        try {
            setIsLoading(true);

            const res = await fetch(apiUserService.baseURL + "/bookings");

            if (res.ok) {
                const result = await res.json();

                if (result.code === 1001) {
                    const formatted = result.data.map(item => ({
                        name: item.customer?.fullName || "N/A",
                        room: item.roomType?.typeName || "N/A",
                        date: formatDate(item.checkInDate),
                        status: item.status
                    }));

                    setBookings(formatted);
                }
            }

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log("Lỗi lấy bookings");
        }
    };
        fetchBookings();
    }, [setIsLoading]);

    
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN");
    };
    return <>
        <section className="details-grid">
            <div className="recent-bookings">
                <h2 style={{marginBottom:'10px'}}>Đơn đặt phòng mới nhất</h2>
                <SelectBranch/>
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
                            bookings.map( (item,index) => <RowDetailBooking dataOfRow={item} key={index}/>)
                        }
                    </tbody>
                </table>
            </div>

            <div className="room-status">
                <h2>Trạng thái phòng nhanh</h2>
                <div className="status-list">
                    <div className="status-item"><span className="dot available"></span> Trống: {data?.rooms?.empty || 0}</div>
                    <div className="status-item"><span className="dot occupied"></span> Đang ở: {data?.rooms?.use || 0}</div>
                    <div className="status-item"><span className="dot dirty"></span> Cần dọn: {data?.rooms?.needClean || 0}</div>
                </div>
            </div>
        </section>
    </>
}

export default DetailBranchBooking