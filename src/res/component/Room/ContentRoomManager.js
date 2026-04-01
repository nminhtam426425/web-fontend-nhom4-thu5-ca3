import "./styleOfRoom.css"
import {SelectBranch} from "../Dash"
import RowTableTypeRoom from "./RowTableTypeRoom"
import DetailTypeRoom from "./DetailTypeRoom"
import Modal from "../Form/Modal"
import { useEffect, useState } from "react"
import {apiUserService,useBranch} from "../index"

const ContentRoomManager = () => {
    const [isClick,setIsClick] = useState(-1)
    const [typeRoom,setTypeRoom] = useState(null)
    const [room,setRoom] = useState(null)
    const [srcImage,setSrcImage] = useState(null)
    const [roomTypes,setRoomTypes] = useState([])
    const {isLoading,setIsLoading} = useBranch()

    useEffect(()=>{
        const handleFecthRoomType = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+'/roomtypes')
                if(res.ok){
                    setIsLoading(false)
                    const data = await res.json()
                    setRoomTypes(data)
                }
                else
                    setIsLoading(false)
            }
           catch(err){
                console.log("loi khi lay du lieu roomtypes")
                setIsLoading(false)
           }
        }
        handleFecthRoomType()
    },[])

    return <>
        <div className="container-2">
            <section className="header-section">
                <SelectBranch/>

                <div className="stats-cards">
                    <div className="card">
                        <h3>Tổng số phòng</h3>
                        <p id="totalRooms">24</p>
                    </div>
                    <div className="card">
                        <h3>Tổng doanh thu</h3>
                        <p id="totalRevenue">150,000,000 VNĐ</p>
                    </div>
                </div>
            </section>

            <section className="room-type-section">
                <div className="section-header">
                    <h2>Danh sách loại phòng</h2>
                    <button className="btn btn-primary" onClick={()=>setTypeRoom({})}> + Thêm loại phòng</button>
                </div>

                <table className="main-table">
                    <thead>
                        <tr>
                            <th>Tên loại phòng</th>
                            <th style={{textAlign:'center'}}>Ảnh đại diện</th>
                            <th style={{textAlign:'center'}}>Số lượng phòng</th>
                            <th style={{textAlign:'center'}}>Sức chứa</th>
                            <th style={{textAlign:'center'}}>Thao tác</th>
                        </tr>
                    </thead>

                    <tbody id="roomTypeBody">
                        {
                            roomTypes.map( (item,index) => <RowTableTypeRoom setIsClick={setIsClick} index={index} data={item} setRoomTypes={setRoomTypes} key={index} />)
                        }
                    </tbody>
                </table>
            </section>
                
            <DetailTypeRoom isClick={isClick} setRoom={setRoom} setSrcImage={setSrcImage} data={roomTypes[isClick]}/>
        </div>
        <Modal styleModal="addTypeRoom" data={typeRoom} setDataItem={setTypeRoom}/>
        <Modal styleModal="addRoom" data={room} setDataItem={setRoom}/>
        <Modal styleModal="showImage" data={srcImage} setDataItem={setSrcImage}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu, vui lòng chờ"/>
   </>
}
export default ContentRoomManager