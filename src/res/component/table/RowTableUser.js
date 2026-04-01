import './styleOfTable.css'
import { apiUserService,useBranch } from '../index'
import {  FaLock,FaEdit,FaUnlock,FaPersonBooth} from "react-icons/fa"

const MemberLevel = ({amount}) => {
    if(amount > 20000000)
        return  "Dadđy"
    else if(amount > 10000000)
        return "VIP"
    else if(amount > 1000000)
        return "Bạn mới"
    else if(amount > 0)
        return "Thành viên"
    return "Thành viên mới"
}

const ButtonActionUserEnable = ({handleHideUser,userItem,setDataItem}) => {
    return <>
        <button className="btn-1 btn-edit" onClick={()=>setDataItem(userItem)}>
            <FaEdit/> Sửa
        </button>
        <button className="btn-1 btn-add">
            <FaPersonBooth/> Chi tiết
        </button>
        <button className="btn-1 btn-lock" onClick={handleHideUser}>
            <FaLock/> Khóa
        </button>
    </>    
}
const ButtonActionUserDisable = ({handleOpenUser}) => {
    return <>
        <button className="btn-1 btn-unlock" onClick={handleOpenUser}>
            <FaUnlock/> Mở khóa
        </button>
    </>    
}

const RowTableUser = ({userItem,index,setDataItem,setDataOfUser,setDataOfUserActive}) => {
    const {setIsLoading} = useBranch()

    const handleHideUser = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+`/users/disable/${userItem.userId}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                setIsLoading(false)
                const data = await res.json()
                if(data.code === 1001){
                    setDataOfUser( users => users.filter( item => item.userId !== userItem.userId))
                    setDataOfUserActive( users => users.filter( item => item.userId !== userItem.userId))
                }
            }
            else
                setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi roi ni oi")
        }
        
    }

    const handleOpenUser = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+`/users/enable/${userItem.userId}`,{
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
                    setDataOfUser( users => users.filter( item => item.userId !== userItem.userId))
                    userItem.isActive = true
                    setDataOfUserActive( users => [...users,userItem])
                } 
            }
            else 
                setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi open !")
        }
    }
    
    return <tr>
            <td>{index + 1}</td>
            <td>{userItem.fullName}</td>
            <td>{userItem.phone}</td>
            <td>{userItem.email}</td>
            <td><MemberLevel amount={userItem.alreadySpent}/></td>
            <td>
                {
                userItem.isActive 
                    ? 
                    <ButtonActionUserEnable handleHideUser={handleHideUser} userItem={userItem} setDataItem={setDataItem}/> 
                    : 
                    <ButtonActionUserDisable handleOpenUser={handleOpenUser}/>
                }
            </td>
        </tr>
}

export default RowTableUser