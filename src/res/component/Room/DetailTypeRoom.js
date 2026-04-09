import { useEffect,useState } from "react"
import RowTableRoomOfType from "./RowTableRoomOfType"
import FormDetailTypeRoom from "./FormDetailTypeRoom"
import FormUpdateTypeRoom from "./FormUpdateTypeRoom"
import {useBranch} from "../index"
import "./styleOfRoom.css"
   
const DetailTypeRoom = ({isClick,setRoom,setSrcImage,dataDetail,state,roomsOfType,setRoomsOfType,setDataDetail}) => {
    const {setTypeRoomId} = useBranch()
    const [roomImage,setRoomImage] = useState([])
    const [price,setPrice] = useState({
        basePrice:0,
        sundayPrice:0,
        peakPrice:0,
        peakSundayPrice:0,
        priceHour:0
    })

    useEffect( ()=>{
        setRoomsOfType(dataDetail?.rooms || [])
    },[setRoomsOfType,dataDetail?.rooms])

    useEffect(()=>{
        if(dataDetail)
            setPrice({
                basePrice:dataDetail.basePrice || 0,
                sundayPrice:dataDetail.priceSundayNormal || 0,
                peakPrice:dataDetail.pricePeakSeason || 0,
                peakSundayPrice:dataDetail.pricePeakSunday || 0,
                priceHour:dataDetail.priceHour || 0
            })
    },[dataDetail,setPrice])

    useEffect( ()=>{
        setTypeRoomId(dataDetail?.typeId || 0)
        setRoomImage(dataDetail?.images || [])
    },[dataDetail?.typeId,setTypeRoomId,dataDetail?.images,setRoomImage])

    const props = {
        isClick,
        dataDetail, 
        price, 
        roomImage,
        setRoomImage,
        setDataDetail
    }

    return <>
            <section className="detail-section" style={{ display: isClick !== -1 ? 'block' : 'none'}}>
                <hr/>
                <div className="detail-header">
                    <h3>Chi tiết loại phòng: <span id="selectedTypeName">{dataDetail?.typeName || ""}</span></h3>
                    <p>Tổng số phòng thuộc loại: <b id="selectedTypeCount">{dataDetail?.totalRooms || 0}</b></p>
                </div>
                {
                    (state === 'detail')
                    ?
                        <FormDetailTypeRoom dataDetail={dataDetail} price={price} setSrcImage={setSrcImage} roomImage={roomImage}/>
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