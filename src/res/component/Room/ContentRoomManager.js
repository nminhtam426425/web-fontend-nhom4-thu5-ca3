import "./styleOfRoom.css"
import {SelectBranch,PrintAmountVND} from "../Dash"
import RowTableTypeRoom from "./RowTableTypeRoom"
import DetailTypeRoom from "./DetailTypeRoom"
import Modal from "../Form/Modal"
import { useEffect, useRef, useState } from "react"
import {apiUserService,useBranch} from "../index"

const ContentRoomManager = () => {
    const [isClick,setIsClick] = useState(-1)
    const [typeRoom,setTypeRoom] = useState(null)
    const [room,setRoom] = useState(null)
    const [roomsOfType,setRoomsOfType] = useState([])
    const [srcImage,setSrcImage] = useState(null)
    const [roomTypes,setRoomTypes] = useState([])
    const [state,setState] = useState('detail')
    const [dataDetail,setDataDetail] = useState({})
    const {isLoading,setIsLoading,selectedBranchId,setCurrentScroll} = useBranch()
    let revenueBranch = useRef(0)
    let totalRoomAtBranch = useRef(0)

    const propsOfDetailRoom = {
        isClick,
        roomsOfType,
        state,
        roomTypes,
        setRoomTypes,
        setSrcImage,
        setRoomsOfType,
        setRoom,
        setDataDetail
    }

    useEffect(()=>{
        const handleFecthRoomType = async () => {
            try{
                let url = (selectedBranchId) ? `/roomtypes/by-branch/${selectedBranchId}` : '/roomtypes/by-branch/1'
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+url)
                if(res.ok){
                    const data = await res.json()
                    setRoomTypes(data.data)
                    setDataDetail({})
                    setIsClick(-1)
                    setCurrentScroll(0)

                    revenueBranch.current = 0;
                    totalRoomAtBranch.current = 0;
        
                    for (let i of data.data) {
                        revenueBranch.current += i?.revenue || 0;
                        totalRoomAtBranch.current += i?.totalRooms || 0;
                    }
                        
                }
                setIsLoading(false)
            }
           catch(err){
                console.log("loi khi lay du lieu roomtypes",err)
                setIsLoading(false)
           }
        }
        handleFecthRoomType()
    },[setIsLoading,selectedBranchId,setCurrentScroll])

    return <>
        <div className="container-2">
            <section className="header-section">
                <SelectBranch/>

                <div className="stats-cards">
                    <div className="card">
                        <h3>Tổng số phòng</h3>
                        <p id="totalRooms">{totalRoomAtBranch.current}</p>
                    </div>
                    <div className="card">
                        <h3>Tổng doanh thu</h3>
                        <p id="totalRevenue">
                            <PrintAmountVND amount={revenueBranch.current || 0}/>
                        </p>
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
                            roomTypes.map( (item,index) => 
                                    <RowTableTypeRoom  index={index} data={item}
                                        setIsClick={setIsClick} 
                                        setRoomTypes={setRoomTypes}
                                        roomTypes={roomTypes} 
                                        setDataDetail={setDataDetail}
                                        key={index} 
                                        setCurrentScroll={setCurrentScroll}
                                        setState={setState}/>
                            )
                        }
                    </tbody>
                </table>
            </section>
                
            <DetailTypeRoom dataDetail={dataDetail} {...propsOfDetailRoom}/>
        </div>
        <Modal styleModal="addTypeRoom" data={typeRoom} setDataItem={setTypeRoom} setDatas={setRoomTypes}/>
        <Modal styleModal="addRoom" data={room} setDataItem={setRoom} setDatas={setRoomsOfType}/>
        <Modal styleModal="showImage" data={srcImage} setDataItem={setSrcImage}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang xử lý dữ liệu, vui lòng chờ"/>
   </>
}
export default ContentRoomManager