import "./styleOfMain.css"
import {Chart,Stat,DetailBranchBooking} from "../Dash"
import SidebarTemp from "./SidebarTemp"
import Header from './Header.js'
import Modal from "../Form/Modal"
import {apiUserService,useBranch,customeFetch} from "../index"
import { useEffect, useState } from "react"

const MainHome = () => {
    const [dataOfDash,setDataOfDash] = useState({})
    const {selectedBranchId,setIsLoading,isLoading} = useBranch()

    useEffect(()=>{
        const handleFetchDashData = async () => {
            try{
                setIsLoading(true)
                const url = (selectedBranchId) ? `/dashboard/${selectedBranchId}` : '/dashboard/1'
                const res = await customeFetch(apiUserService.baseURL+url,'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    if(data.code === 200)
                        setDataOfDash(data.data)
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log(err+' loi lay du lieu dash')
            }
        }
        handleFetchDashData()
    },[selectedBranchId,setIsLoading])

    return <div className="container">
        <SidebarTemp/>
        <div className='main-content'>
            <Header/>
            <Stat data={dataOfDash}/>
            <DetailBranchBooking dataOfDash={dataOfDash}/>
            <Chart dataRevenue={dataOfDash}/>
        </div>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Vui lòng chờ"/>
    </div>
   
}

export default MainHome