import "./styleOfMain.css"
import {Chart,Stat,DetailBranchBooking} from "../Dash"
import SidebarTemp from "./SidebarTemp"
import Header from './Header.js';
import {apiUserService,useBranch} from "../index"
import { useEffect, useState } from "react";


const MainHome = () => {
    const [dataOfDash,setDataOfDash] = useState({})
    const {selectedBranchId,setIsLoading} = useBranch()

    useEffect(()=>{
        const handleFetchDashData = async () => {
            try{
                setIsLoading(true)
                const url = (selectedBranchId) ? `/dashboard/${selectedBranchId}` : '/dashboard/1'
                const res = await fetch(apiUserService.baseURL+url)
                if(res.ok){
                    const data = await res.json()
                    if(data.code === 200){
                        setDataOfDash(data.data)
                    }
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
            <DetailBranchBooking data={dataOfDash}/>
            <Chart dataRevenue={dataOfDash}/>
        </div>
    </div>
   
}

export default MainHome