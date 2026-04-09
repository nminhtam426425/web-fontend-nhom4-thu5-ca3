import { useEffect, useState } from "react"
import {apiUserService,useBranch} from '../index'
import "./styleOfForm.css"

const FormAddRoom = ({data,setDataItem,setDatas}) => {
    const [room,setRoom] = useState({
        name:""
    })
    const {selectedBranchId,setIsLoading,typeRoomId} = useBranch()

    const handleOnchangeName = (e) => {
        let {id,value} = e.target
        setRoom({
            ...room,
            [id]:value
        })
    }

    useEffect( ()=>{
        if(data){   
            setRoom({
                name:data?.numberRoom || ""
            })
        }
        else{
            setRoom({
                name:""
            })
        }
    },[data])

    const handleAddRoom = async () => {
        try{
            setIsLoading(true)
            const method = (data.id) ? 'PUT' : 'POST'
            const url = (data.id) ? `/rooms/${data.id}` : '/rooms'
            const res = await fetch(apiUserService.baseURL + url,{
                method:method,
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    roomNumber: room.name,
                    typeId: typeRoomId,
                    status: "trống",
                    branchId: selectedBranchId
                })
            })
            setIsLoading(false)
            if(res.ok){
                const dataRes = await res.json()
                if(method === 'POST'){
                    let temp = {
                        checkIn:"-",
                        checkOut:'-',
                        id:dataRes.roomId,
                        numberRoom:dataRes.roomNumber,
                        status:"trống"
    
                    }
                    setDatas( rooms => [...rooms,temp])
                }
                else{
                    setDatas( rooms => rooms.map(item => {
                            if(item.id === data.id){
                                item.numberRoom = room.name
                            }
                            return item
                        })
                    )
                }
                setDataItem(null)
            }
        }
        catch(err){
            setIsLoading(false)
            console.log("Loi khi add room")
        }
    }

    return <>
         <div className="modal-content">
            <span className="close" onClick={()=>setDataItem(null)}>&times;</span>
            <h3 style={{margin:'10px 0'}}>Thêm phòng mới</h3>
            <div id="formRoom">
                <input type="text" placeholder="Nhập mã phòng (VD: B101)" id="name" value={room.name} onChange={handleOnchangeName} required/>
                <button type="submit" className="btn btn-success" onClick={handleAddRoom}>Lưu</button>
            </div>
        </div>
    </>
}

export default FormAddRoom