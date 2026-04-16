import "./styleOfMain.css"
import TableStaff from '../table/TableStaff'
import { useEffect, useState } from 'react'
import Sidebar from './SidebarTemp.js'
import Modal from "../Form/Modal"
import Header from './Header.js'
import {apiUserService,useBranch} from "../index.js"

const MainStaffManager = () => {
    const [dataOfStaff,setDataOfStaff] = useState([])
    const [dataOfStaffActive,setDataOfStaffActive] = useState([])
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading,selectedBranchId} = useBranch()
    const props = {
        dataOfStaff,
        dataOfStaffActive,
        dataItem,
        setDataOfStaff,
        setDataOfStaffActive,
        setDataItem
    }
    useEffect(()=>{
        const handleFetchStaffs = async () => {
            try{
                const url = (selectedBranchId) ? `/staff/branch/${selectedBranchId}` : '/staff'
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+url)
                if(res.ok){
                    const data = await res.json()
                    if(data.code === 1001){
                        setDataOfStaff(data.data)
                        setDataOfStaffActive(data.data)
                    }  
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("Lỗi lấy dữ liệu nhân viên")
            }
        }
        handleFetchStaffs()
    },[selectedBranchId,setIsLoading])
    return <div>
        <div className='container'>
            <Sidebar/>
            <div className='main-content'>
                <Header/>
                <TableStaff {...props}/>
            </div>
        </div>
        <Modal styleModal={ dataItem?.add ? 'addStaff' : 'staff'} data={dataItem} setDataItem={setDataItem} setDatas={setDataOfStaff}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu, vui lòng chờ"/>
    </div>
   
}

export default MainStaffManager