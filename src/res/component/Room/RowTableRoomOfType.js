import "./styleOfRoom.css"
import {apiUserService,useBranch} from "../index"

const RowTableRoomOfType = ({data,setRoom,setRoomsOfType}) => {
    const {setIsLoading} = useBranch()
    const handleIsClick = () => {
        setRoom(data)
    } 
    const handleDeleteRoom = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+`/rooms/${data?.id}`,{
                method:'DELETE'
            })
            setIsLoading(false)
            if(res.ok){
                const dataRes = await res.text()
                if(dataRes === `Xóa phòng có id ${data.id} thành công!`){
                    setRoomsOfType( rooms => rooms.filter( item => item.id !== data.id))
                }
            }
        }
        catch(err){
            setIsLoading(false)
            console.log("loi xoa phong",err)
        }
    }
    return <>
            <tr>
                <td>{data?.numberRoom || ""}</td>
                <td style={{width:'150px',height:'100px'}}>{data?.status || ""}</td>
                <td style={{textAlign:'center'}}>{data?.checkIn || "-"}</td>
                <td style={{textAlign:'center'}}>{data?.checkOut || "-"}</td>
                <td style={{textAlign:'center'}}>
                    <button className="btn btn-danger" style={{marginRight:'10px'}} onClick={handleDeleteRoom}>Xóa</button>
                    <button className="btn btn-info" onClick={handleIsClick}>Sửa</button>
                </td>
            </tr>
    </>
}
export default RowTableRoomOfType