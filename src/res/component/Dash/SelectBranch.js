import "./style.css"
import { useState,useEffect } from "react"
import {apiUserService,useBranch} from "../index"

const SelectBranch = () => {
    const [branches,setBranches] = useState([])
    const {selectedBranchId,setSelectedBranchId} = useBranch()

    useEffect(()=>{
        const getBranches = async () => {
            try{
            const res = await fetch(apiUserService.baseURL+"/branches")
                if(res.ok){
                    const data = await res.json()
                    setBranches(data)
                    setSelectedBranchId(data[0].branchId)
                }
            } 
            catch(err){
                console.log(err)
            }
        } 
         getBranches()
    },[setSelectedBranchId])
   
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