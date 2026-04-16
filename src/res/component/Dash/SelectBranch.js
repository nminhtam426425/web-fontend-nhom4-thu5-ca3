import "./style.css"
import { useState,useEffect } from "react"
import {apiUserService,useBranch} from "../index"

const SelectBranch = () => {
    const [branches,setBranches] = useState([])
    const {selectedBranchId,setSelectedBranchId,setIsLoading} = useBranch()

    useEffect(()=>{
        const getBranches = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+"/branches")
                if(res.ok){
                    const data = await res.json()
                    setBranches(data)
                    setSelectedBranchId(data[0].branchId)
                }
                setIsLoading(false)
            } 
            catch(err){
                setIsLoading(false)
                console.log(err)
            }
        } 
         getBranches()
    },[setSelectedBranchId,setIsLoading])
   
    const handleOnChangeBranchId = async (e) => {
        setSelectedBranchId(e.target.value)
    }

    return <>
        <div className="branch-selector">
            <label htmlFor="branch"><h3>Chi nhánh:</h3></label>
            <select id="branchSelect" value={selectedBranchId || ""} onChange={handleOnChangeBranchId}>
                {
                    branches.map( (item,index) => <option value={item.branchId} key={index}>{item.branchName}</option>)
                }
            </select>
        </div>
    </>
}
export default SelectBranch