import './styleOfTable.css'
import { apiUserService,customeFetch,useBranch } from '../index'
import {  FaLock,FaEdit,FaUnlock,FaPersonBooth} from "react-icons/fa"
import {MemberLevel} from "../Dash"

const ButtonActionUserEnable = ({handleHideUser,userItem,setDataItem,handleFetchDetailOfUser}) => {
    return <>
        <button className="btn-1 btn-edit" onClick={()=>setDataItem(userItem)}>
            <FaEdit/> Sửa
        </button>
        <button className="btn-1 btn-add" onClick={()=>handleFetchDetailOfUser(userItem)}>
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

const RowTableUser = ({userItem,index,setDataItem,setDataOfUser,setDataOfUserActive,setDetailOfUser,setUserForRender,dataOfUser,setTotalPage}) => {
    const {setIsLoading} = useBranch()

    const handleHideUser = async () => {
        setDetailOfUser({})
        try{
            setIsLoading(true)
            const res = await customeFetch(apiUserService.baseURL+`/users/disable/${userItem.userId}`,'authen','PUT')
            if(res.ok){
                const data = await res.json()
                if(data.code === 1001){
                    setDataOfUser( users => users.filter( item => item.userId !== userItem.userId))
                    setDataOfUserActive( users => users.filter( item => item.userId !== userItem.userId))
                }
            }
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
            const res = await customeFetch(apiUserService.baseURL+`/users/enable/${userItem.userId}`,'authen','PUT')
            if(res.ok){
                setIsLoading(false)
                const data = await res.json()
                if(data.code === 1001){
                    setDataOfUser( users => users.filter( item => item.userId !== userItem.userId))
                    userItem.isActive = true
                    setDataOfUserActive( users => [...users,userItem])
                } 
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("loi open !")
        }
    }

    const handleFetchDetailOfUser = async (user) => {
        try{
            setIsLoading(true)
            const res = await customeFetch(apiUserService.baseURL+`/bookings/customer?customerId=${user.userId}`,'authen','GET')
            
            setIsLoading(false)
            if(res.ok){
                const data = await res.json()
                if(data.code === 1001)
                    setDetailOfUser(data.data)
                else{
                    let temp = {
                        userId: user.userId,
                        name: user.fullName,
                        alreadySpent:0,
                        phone:user.phone,
                        roomRent:[]
                    }
                    setDetailOfUser(temp)
                }
            }
        }
        catch(err){
            setIsLoading(false)
            console.log("loi roi ni oi")
        }
    }

    const props = {
        userItem,
        setDataItem ,
        handleFetchDetailOfUser,
        handleHideUser,
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
                    <ButtonActionUserEnable {...props}/> 
                    : 
                    <ButtonActionUserDisable handleOpenUser={handleOpenUser} />
                }
            </td>
        </tr>
}

export default RowTableUser