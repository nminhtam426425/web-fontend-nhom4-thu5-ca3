import './styleOfForm.css'
import {PrintAmountVND} from "../Dash/MemberLevel"
const printSdt = (sdt) => {
    let formatSdt = ''
    let length = sdt?.length || 0
    for(let i = 0; i < length; i++){
        if(i === 4 || i === 7)
            formatSdt+=' '
        formatSdt+=sdt[i]
    }
    return formatSdt
}
const numberDayRemain = (dateCheckIn, dayCheckOut) => {
    const dateIn = new Date(dateCheckIn);
    const dateOut = new Date(dayCheckOut);

    // Hiển thị định dạng ngày dễ đọc (DD/MM/YYYY HH:mm)
    // const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    // document.getElementById('checkInDate').innerText = dateIn.toLocaleString('vi-VN', options);
    // document.getElementById('checkOutDate').innerText = dateOut.toLocaleString('vi-VN', options);

    const diffTime = Math.abs(dateOut - dateIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return diffDays
}
const FormInfoBooking = ({data,setDataItem}) => {
    return <>
        <div className="modal" style={{display:'flex'}}>
            <div className="invoice-box">
                <span className="close" onClick={() => setDataItem(null)} style={{color:'black',fontSize:'40px',position:'absolute',top:0,right:'20px'}}>&times;</span>
                <div className="header-info">
                    <h1>Thông Tin Chi Tiết Đặt Phòng</h1>
                    <p>Mã hóa đơn: {data?.bookingCode}</p>
                </div>

                <div className="info-section">
                    <div className="info-group">
                        <h3>Khách hàng</h3>
                        <div className="info-item"><span className="label">Họ tên:</span> <span id="customerName">{data?.name}</span></div>
                        <div className="info-item"><span className="label">Email:</span> <span id="email">{data?.email}</span></div>
                        <div className="info-item"><span className="label">Số điện thoại:</span> <span id="phone">{printSdt(data?.phone)}</span></div>
                    </div>

                    <div className="info-group">
                        <h3>Xác nhận hệ thống</h3>
                        <div className="info-item"><span className="label">Nhân viên:</span> <span id="staffName">{data?.staffName}</span></div>
                        <div className="info-item"><span className="label">Ngày xác nhận:</span> <span id="confirmDate">{data?.dateConfirm}</span></div>
                        <div className="info-item"><span className="label">Đánh giá:</span> <span id="rating"></span></div>
                    </div>
                </div>

                <div className="info-group">
                    <h3>Chi tiết lưu trú</h3>
                    <div className="info-section">
                        <div>
                            <div className="info-item"><span className="label">Loại phòng:</span> <span id="roomType">{data?.typeName}</span></div>
                            <div className="info-item"><span className="label">Số phòng:</span> <span id="roomNumber">{data?.roomNumber}</span></div>
                        </div>
                        <div>
                            <div className="info-item"><span className="label">Ngày Check-in:</span> <span id="checkInDate">{data?.checkIn}</span></div>
                            <div className="info-item"><span className="label">Ngày Check-out:</span> <span id="checkOutDate">{data?.checkOut}</span></div>
                            <div className="info-item"><span className="label">Ngày thực tế đi:</span> <span id="actualCheckOut">{data?.checkIn}</span></div>
                        </div>
                    </div>
                </div>

                <div className="total-section">
                    <div className="info-item">
                        <span className="label">Tổng số ngày ở:</span>
                        <span>
                            <span id="totalDays">{numberDayRemain(data?.checkIn || "",data?.checkOut || "")}</span> ngày 
                        </span>
                    </div>
                    <div className="info-item"><span className="label">Tổng tiền thanh toán:</span> 
                        <span className="total-amount" id="totalPrice">
                            <PrintAmountVND amount={data?.priceAtBooking || 0}/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FormInfoBooking