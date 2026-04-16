import './styleOfTable.css'
import { apiUserService,useBranch } from '../index'
import { 
    FaLock,FaEdit,FaUnlock
} from "react-icons/fa"

const ButtonActionStaffEnable = ({handleHideStaff,staffItem,setDataItem}) => {
    return <>
        <button className="btn-1 btn-edit" onClick={()=>setDataItem(staffItem)}>
            <FaEdit/> Sửa
        </button>
        <button className="btn-1 btn-lock" onClick={handleHideStaff}>
            <FaLock/> Khóa
        </button>
    </>    
}

const ButtonActionStaffDisable = ({handleOpenStaff}) => {
    return <>
        <button className="btn-1 btn-unlock" onClick={handleOpenStaff}>
            <FaUnlock/> Mở khóa
        </button>
    </>    
}

const RowTableStaff = ({staffItem,index,setDataItem,setDataOfStaff,setDataOfStaffActive}) => {
    
    const {setIsLoading} = useBranch()
    const handleHideStaff = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+`/users/disable/${staffItem.userId}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                const data = await res.json()
                if(data.code === 1001){
                    setIsLoading(false)
                    setDataOfStaff( staffs => staffs.filter( item => item.userId !== staffItem.userId))
                    setDataOfStaffActive( staffs => staffs.filter( item => item.userId !== staffItem.userId))
                } 
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi khoa !")
        }
    }
    const handleOpenStaff = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+`/staff/enable/${staffItem.userId}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                setIsLoading(false)
                const data = await res.json()
                if(data.code === 1001){
                    setIsLoading(false)
                    setDataOfStaff( staffs => staffs.filter( item => item.userId !== staffItem.userId))
                    staffItem.isActive = true
                    setDataOfStaffActive( staffs => [...staffs,staffItem])
                } 
            }
            else 
                setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi khoa !")
        }
    }
    return <tr>
            <td>{index + 1}</td>
            <td>{staffItem.fullName}</td>
            <td>{staffItem.phone}</td>
            <td>{staffItem.email}</td>
            <td>
                {
                    staffItem.isActive 
                    ? 
                    <ButtonActionStaffEnable handleHideStaff={handleHideStaff} staffItem={staffItem} setDataItem={setDataItem}/> 
                    : 
                    <ButtonActionStaffDisable handleOpenStaff={handleOpenStaff}/>
                }
            </td>
        </tr>
}

export default RowTableStaff