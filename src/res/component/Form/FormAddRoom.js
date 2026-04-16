import { useEffect, useState } from "react"
import {apiUserService,useBranch} from '../index'
import {passValidation,validateStrEmpty, validateNoSpecialChars} from "../Valid"
import "./styleOfForm.css"

const FormAddRoom = ({data,setDataItem,setDatas}) => {
    const [room,setRoom] = useState({
        name:""
    })
    const [errorRoom,setErrorRoom] = useState({
        name: validateStrEmpty(room.name)
    })
    const {selectedBranchId,setIsLoading,typeRoomId} = useBranch()

    const handleOnchangeName = (e) => {
        let {id,value} = e.target
        setRoom({
            ...room,
            [id]:value
        })
        setErrorRoom({
            [id]: validateStrEmpty(value)
        })
        setErrorRoom({
            [id]: validateNoSpecialChars(value)
        })
    }

    useEffect( ()=>{
        if(data){   
            setRoom({
                name:data?.numberRoom || ""
            })
            setErrorRoom({
                name: validateStrEmpty(data?.numberRoom || "")
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
            if(res.ok){
                const dataRes = await res.json()
                if(method === 'POST'){
                    let temp = {
                        checkIn:"-",
                        checkOut:'-',
                        id:dataRes.data.roomId,
                        numberRoom:dataRes.data.roomNumber,
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
            setIsLoading(false)
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
                <div className="input-group" style={{width: '100%'}}>
                    <input type="text" id="name" className="input-field" placeholder="" value={room.name} onChange={handleOnchangeName}/>
                    <label htmlFor="name" className="input-label">Nhập mã phòng (VD: B101)</label>
                    <span className="validation">{errorRoom.name}</span>
                </div>
                <button type="submit" className="btn btn-success" onClick={handleAddRoom}
                                                                    style={{cursor: passValidation(errorRoom) ? 'pointer' : 'not-allowed',marginTop:'10px'}} 
                                                                    disabled={passValidation(errorRoom) ? false : true}>
                    Lưu
                </button>
               
            </div>
        </div>
    </>
}

export default FormAddRoom