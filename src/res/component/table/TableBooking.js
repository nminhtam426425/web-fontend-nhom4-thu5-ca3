import "./styleOfTable.css"
import { PrintAmountVND } from "../Dash"
import {apiUserService} from "../index"
import { useEffect, useState } from "react"

const checkForRenderColumnRoomNumber = (status) => {
    if(status === 'đã check-in' || status === 'đã check-out')
        return true
    return false
}

const RowTableBooking = ({dataBookingItem,status,setDataItem}) => {
    const [infoBooking,setInfoBooking] = useState("")
    useEffect( ()=>{
        const handleGetRoomNumber = async () => {
            try{
                const res = await fetch(apiUserService.baseURL + `/bookings/detail/${dataBookingItem.bookingId}`)
                if(res.ok){
                    const data = await res.json()
                    data.data.bookingCode = dataBookingItem.bookingCode
                    setInfoBooking(data.data)
                }
            }
            catch(err){
                console.log("loi lay ma phong thue")
            }
        }
        handleGetRoomNumber()
    },[status,dataBookingItem.bookingId,dataBookingItem.bookingCode])

    const handleOpenInfoBooking= () => {
        setDataItem(infoBooking)
    }
    
    return <tr onClick={handleOpenInfoBooking}>
        <td>{dataBookingItem.customer.fullName}</td>
        <td>{dataBookingItem.roomTypeName}</td>
        <td>{dataBookingItem.checkInDate}</td> 
        <td>{dataBookingItem.checkOutDate}</td>
        {checkForRenderColumnRoomNumber(status)&&<td>{infoBooking.roomNumber}</td>}
        <td><PrintAmountVND amount={dataBookingItem.priceAtBooking}/></td>
        <td>
            <button className="btn btn-info" onClick={handleOpenInfoBooking}>Chi tiết</button>
        </td>
    </tr>
}

const  TableBooking = ({status,dataForBooking,setDataItem}) => {
    return <>
    {
        dataForBooking.length === 0 
        ? 
            <h2>Chưa có khách hàng ở trạng thái '{status}'</h2>
        :
            <div className="table-container">
            <table id="bookingTable">
                <thead id="tableHead">
                    <tr>
                        <th  style={{backgroundColor:'aquamarine'}}>Khách hàng</th>
                        <th  style={{backgroundColor:'aquamarine'}}>Loại phòng</th>
                        <th  style={{backgroundColor:'aquamarine'}}>Check-in</th>
                        <th  style={{backgroundColor:'aquamarine'}}>Check-out</th>
                        {checkForRenderColumnRoomNumber(status)&&<th  style={{backgroundColor:'aquamarine'}}>Số phòng</th>}
                        <th  style={{backgroundColor:'aquamarine'}}>Tổng tiền</th>
                        <th  style={{backgroundColor:'aquamarine'}}>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {
                        dataForBooking.map( (item,index) => <RowTableBooking dataBookingItem={item} key={index} status={status} setDataItem={setDataItem}/>)
                    }
                </tbody>
            </table>
        </div>
    }
    </>
}

export default TableBooking