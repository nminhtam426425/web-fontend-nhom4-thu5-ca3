import "./style.css"
import { useState,useEffect } from "react"
import {apiUserService,useBranch} from "../index"

const SelectBranch = ({setDataOfStaff,setDataOfStaffActive}) => {
    const [branches,setBranches] = useState([])
    const {selectedBranchId,setSelectedBranchId,setIsLoading} = useBranch()

    useEffect(()=>{
        const getBranches = async () => {
            try{
            const res = await fetch(apiUserService.baseURL+"/branches")
                if(res.ok){
                    const data = await res.json()
                    setBranches(data)
                    if (data.length > 0 && !selectedBranchId) 
                        setSelectedBranchId(data[0].branchId)
                }
            } 
            catch(err){
                console.log(err)
            }
        } 
         getBranches()
    },[setSelectedBranchId,selectedBranchId])
   
    const handleOnChangeBranchId = async (e) => {
        setSelectedBranchId(e.target.value)
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+`/staff/branch/${e.target.value}`)
            if(res.ok){
                setIsLoading(false)
                const data = await res.json()
                setDataOfStaff(data.data)
                setDataOfStaffActive(data.data)
            }
            else
                setIsLoading(false)

        }
        catch(err){
            setIsLoading(false)
            console.log("loi lay staff theo chi nhanh")
        }
    }

    return <>
        <div className="branch-selector">
            <label htmlFor="branch">Chi nhánh:</label>
            <select id="branchSelect" value={selectedBranchId || ""} onChange={handleOnChangeBranchId}>
                {
                    branches.map( (item,index) => <option value={item.branchId} key={index}>{item.branchName}</option>)
                }
            </select>
        </div>
    </>
}
export default SelectBranch