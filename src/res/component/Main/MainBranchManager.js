import "./styleOfMain.css"
import {apiUserService,useBranch} from "../index"
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
                const res = await fetch(apiUserService.baseURL + "/branches")
                if (res.ok) {
                    const data = await res.json() 
                    setIsLoading(false)
                    setDataOfBranch(data)
                    setDataOfBranchActive(data)
                }
                else{
                    setIsLoading(false)
                }
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
        <Modal styleModal="branch" data={dataItem} setDataItem={setDataItem} setDatas={setDataOfBranch}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu chi nhánh"/>
    </div>
   
}

export default MainStaffManager