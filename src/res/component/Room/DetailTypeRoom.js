import { useEffect,useState } from "react"
import RowTableRoomOfType from "./RowTableRoomOfType"
import FormDetailTypeRoom from "./FormDetailTypeRoom"
import FormUpdateTypeRoom from "./FormUpdateTypeRoom"
import {useBranch} from "../index"
import "./styleOfRoom.css"
   
const DetailTypeRoom = ({isClick,setRoom,setSrcImage,dataDetail,state,roomsOfType,setRoomsOfType,setDataDetail}) => {
    const {setTypeRoomId} = useBranch()
    const [roomImage,setRoomImage] = useState([])

    useEffect( ()=>{
        setRoomsOfType(dataDetail?.rooms || [])
    },[setRoomsOfType,dataDetail?.rooms])


    useEffect( ()=>{
        setTypeRoomId(dataDetail?.typeId || 0)
        setRoomImage(dataDetail?.images || [])
    },[dataDetail?.typeId,setTypeRoomId,dataDetail?.images,setRoomImage])

    const props = {
        isClick,
        dataDetail, 
        roomImage,
        setRoomImage,
        setDataDetail
    }

    return <>
            <section className="detail-section" style={{ display: isClick !== -1 ? 'block' : 'none'}}>
                <hr/>
                {
                    (state === 'detail')
                    ?
                        <FormDetailTypeRoom dataDetail={dataDetail} setSrcImage={setSrcImage} roomImage={roomImage}/>
                    :
                        <FormUpdateTypeRoom {...props}/>
                }

                <div className="section-header">
                    <h4>Danh sách mã phòng</h4>
                    <button className="btn btn-success" onClick={()=> setRoom({})}> + Thêm phòng
                    </button>
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
                        {
                            roomsOfType.map( (item,index) => <RowTableRoomOfType key={index} data={item} setRoom={setRoom} setRoomsOfType={setRoomsOfType}/>)
                        }
                    </tbody>
                </table>
            </section>
    </>
}
export default DetailTypeRoom