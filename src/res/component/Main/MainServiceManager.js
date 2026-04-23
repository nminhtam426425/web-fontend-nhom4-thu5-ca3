import "./styleOfMain.css"
import SidebarTemp from "./SidebarTemp"
import TableAmenAndSerive from "../table/TableAmentAndService"
import Header from "./Header"
import {apiUserService,useBranch,customeFetch} from "../index"
import Modal from "../Form/Modal"
import { useEffect, useState } from "react"

const MainServiceManager = () => {
    const [dataOfService,setDataOfService] = useState([])
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading} = useBranch()
    const [typeManagement,setTypeManagement] = useState("amenities")

    useEffect(()=>{
        const handleFetchService = async () => {
            try{
                setIsLoading(true)
                const res = await customeFetch(apiUserService.baseURL+`/${typeManagement}`,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setDataOfService(data.data)
                }
                setIsLoading(false)
            }
            catch(err){
                console.log("Lỗi lấy dữ liệu nhân viên")
                setIsLoading(false)
            }
        }
        handleFetchService()
    },[setIsLoading,typeManagement])

    const handleOnchangeTypeManagement = async (e) => {
        setTypeManagement(e.target.value)
    }

    return <div>
        <div className="container">
            <SidebarTemp/>
            <div className='main-content'>
                <Header/>
                <div className="filter-section" style={{marginTop:'10px'}}>
                <label htmlFor="typeServiceFilter"><strong>Dữ liệu quản lý:</strong></label>
                <select id="typeServiceFilter" onChange={handleOnchangeTypeManagement}>
                    <option value="amenities">Tiện ích</option>
                    <option value="services">Dịch vụ</option>
                </select>
            </div>
                <TableAmenAndSerive data={dataOfService} 
                                    setDataOfService={setDataOfService} 
                                    setDataItem={setDataItem}
                                    type={typeManagement}/>
            </div>
        </div>
        <Modal styleModal={typeManagement} data={dataItem} setDataItem={setDataItem} setDatas={setDataOfService}/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang xử lý dữ liệu, vui lòng chờ"/>
    </div>
   
}

export default MainServiceManager