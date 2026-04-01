import "./styleOfMain.css"
import SidebarTemp from "./SidebarTemp"
import TableAmenAndSerive from "../table/TableAmentAndService"
import Header from "./Header"
import {apiUserService,useBranch} from "../index"
import Modal from "../Form/Modal"
import { useEffect, useState } from "react"

const MainServiceManager = () => {
    const [dataOfService,setDataOfService] = useState([])
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading} = useBranch()

    useEffect(()=>{
        const handleFetchService = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+"/amenities")
                if(res.ok){
                    setIsLoading(false)
                    const data = await res.json()
                    setDataOfService(data)
                }
                else
                    setIsLoading(false)
            }
            catch(err){
                console.log("Lỗi lấy dữ liệu nhân viên")
                setIsLoading(false)
            }
        }
        handleFetchService()
    },[])

    return <div>
        <div className="container">
            <SidebarTemp/>
            <div className='main-content'>
                <Header/>
                <TableAmenAndSerive data={dataOfService} setDataOfService={setDataOfService} setDataItem={setDataItem}/>
            </div>
        </div>
        <Modal styleModal='service' data={dataItem} setDataItem={setDataItem} setDatas={setDataOfService}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu, vui lòng chờ"/>
    </div>
   
}

export default MainServiceManager