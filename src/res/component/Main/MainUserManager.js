import "./styleOfMain.css"
import TableUser from '../table/TableUser.js'
import { useEffect, useState } from 'react'
import Sidebar from './SidebarTemp.js'
import Modal from "../Form/Modal"
import Header from './Header.js'
import {apiUserService,useBranch} from "../index.js"
import TableDetailOfUser from "../table/TableDetailOfUser.js"

const MainUserManager = () => {
    const [dataOfUser,setDataOfUser] = useState([])
    const [dataOfUserActive,setDataOfUserActive] = useState([])
    const [isClick,setIsClick] = useState(false)
    const [detailOfUser,setDetailOfUser] = useState({})
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading} = useBranch()
    const props = {
        dataOfUser,
        dataOfUserActive,
        isClick,
        setDataOfUser,
        setDataItem,
        setDataOfUserActive,
        setDetailOfUser,
        setIsClick
    }
    useEffect(()=>{
        const handleFetchStaffs = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+"/users")
                setIsLoading(false)
                if(res.ok){
                    const data = await res.json()
                    if(data.code === 1001){
                        setDataOfUser(data.data)
                        setDataOfUserActive(data.data)
                    }
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
                <TableDetailOfUser detailOfUser={detailOfUser} />
            </div>
        </div>
        <Modal styleModal={ dataItem?.add ? 'addStaff' : 'user'} data={dataItem} setDataItem={setDataItem} setDatas={setDataOfUser} roleForCreate="1"/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu, vui lòng chờ"/>
    </div>
   
}

export default MainUserManager