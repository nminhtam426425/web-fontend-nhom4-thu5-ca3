import "./styleOfMain.css"
import Sidebar from "./SidebarTemp"
import Header from "./Header"
import TableBooking from "../table/TableBooking"
import Modal from "../Form/Modal"
import { SelectBranch } from "../Dash"
import {useBranch,apiUserService} from "../index"
import { useEffect, useState } from "react"


const MainBooking = () => {
    const {setIsLoading,isLoading} = useBranch()
    const [statusBooking, setStatusBooking] = useState("chờ xác nhận")
    const [dataForBooking, setDataForBooking] = useState([])
    const [dataItem,setDataItem] = useState(null)
    useEffect( () => {
        const getDataBooking = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+`/bookings/status?status=${statusBooking}`)
                if(res.ok){
                    const data = await res.json()
                    setDataForBooking(data.data)
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("loi lay du llieu booking")
            }
        }
        getDataBooking()
    },[statusBooking,setStatusBooking,setIsLoading])

    const handleOnchangeStatusBooking = async (e) => {
        setStatusBooking(e.target.value)
    }

    return <div className="container">
        <Sidebar/>
        <div className="main-content">
            <Header/>
            <SelectBranch/>

            <div className="filter-section" style={{marginTop:'10px'}} onChange={handleOnchangeStatusBooking}>
                <label htmlFor="statusFilter"><strong>Trạng thái hiển thị:</strong></label>
                <select id="statusFilter">
                    <option value="chờ xác nhận">Chờ duyệt nhận phòng</option>
                    <option value="đã xác nhận">Chờ nhận phòng</option>
                    <option value="đã check-in">Khách đang ở tại khách sạn</option>
                    <option value="đã check-out">Đã trả phòng</option>
                    <option value="đã hủy">Đã hủy</option>
                </select>
            </div>

            <TableBooking dataForBooking={dataForBooking} status={statusBooking} data={dataItem} setDataItem={setDataItem}/>
        </div>
        <Modal styleModal="infoBooking" data={dataItem} setDataItem={setDataItem}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Vui lòng chờ"/>
    </div>
}

export default MainBooking