import "./styleOfMain.css"
import {apiUserService,useBranch,customeFetch} from "../index"
import TableBranch from '../table/TableBranch.js'
import { useEffect, useState } from 'react'
import Sidebar from './SidebarTemp.js'
import Modal from "../Form/Modal.js"
import Header from './Header.js';

const MainStaffManager = () => {
    const [dataOfBranch,setDataOfBranch] = useState([])
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading} = useBranch()
    const [dataOfBranchActive,setDataOfBranchActive] = useState([])
    const props = {
        dataOfBranch,
        dataOfBranchActive,
        setDataOfBranchActive
    }
    useEffect(()=>{
        const fetchData = async () => {
            try{
                setIsLoading(true)
                const res = await customeFetch(apiUserService.baseURL + "/branches",'authen','GET')
                if (res.ok) {
                    const data = await res.json() 
                    setDataOfBranch(data)
                    setDataOfBranchActive(data)
                }
                setIsLoading(false)
            }
            catch (error) {
                console.error("Fetch error:", error)
                setIsLoading(false)
            }
        }
        fetchData()
    },[setIsLoading])


    return <div>
        <div className='container'>
            <Sidebar/>
            <div className='main-content'>
                <Header/>
                <TableBranch {...props} setDataOfBranch={setDataOfBranch} setDataItem={setDataItem}/>
            </div>
        </div>
        <Modal styleModal="branch" data={dataItem} setDataItem={setDataItem} setDatas={setDataOfBranch} setDatasActive={setDataOfBranchActive}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu chi nhánh"/>
    </div>
   
}

export default MainStaffManager