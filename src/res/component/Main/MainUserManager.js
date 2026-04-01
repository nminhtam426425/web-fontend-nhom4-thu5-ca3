import "./styleOfMain.css"
import TableUser from '../table/TableUser.js'
import { useEffect, useState } from 'react'
import Sidebar from './SidebarTemp.js'
import Modal from "../Form/Modal"
import Header from './Header.js'
import {apiUserService,useBranch} from "../index.js"

const MainUserManager = () => {
    const [dataOfUser,setDataOfUser] = useState([])
    const [dataOfUserActive,setDataOfUserActive] = useState([])
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading} = useBranch()
    const props = {
        dataOfUser,
        dataOfUserActive,
        setDataOfUser,
        setDataItem,
        setDataOfUserActive
    }
    useEffect(()=>{
        const handleFetchStaffs = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+"/users")
                if(res.ok){
                    const data = await res.json()
                    if(data.code === 1001){
                        setIsLoading(false)
                        setDataOfUser(data.data)
                        setDataOfUserActive(data.data)
                    }
                    else
                        setIsLoading(false)
                }
            }
            catch(err){
                setIsLoading(false)
                console.log("Lỗi lấy dữ user")
            }
        }
        handleFetchStaffs()
    },[setIsLoading])
    
    return <div>
        <div className='container'>
            <Sidebar/>
            <div className='main-content'>
                <Header/>
                <TableUser {...props}/>
            </div>
        </div>
        <Modal styleModal={ dataItem?.add ? 'addStaff' : 'user'} data={dataItem} setDataItem={setDataItem} setDatas={setDataOfUser} roleForCreate="1"/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu, vui lòng chờ"/>
    </div>
   
}

export default MainUserManager