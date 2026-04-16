import './styleOfTable.css'
import { apiUserService,useBranch } from '../index'
import { FaLock,FaEdit,FaUnlock} from "react-icons/fa"

const ButtonActionBranchEnable = ({handleHideBranch,branchItem,setDataItem}) => {
    return <>
        <button className="btn-1 btn-edit" onClick={()=>setDataItem(branchItem)}>
            <FaEdit/> Sửa
        </button>
        <button className="btn-1 btn-lock" onClick={handleHideBranch}>
            <FaLock/> Khóa
        </button>
    </>    
}

const ButtonActionBranchDisable = ({handleOpenBranch}) => {
    return <>
        <button className="btn-1 btn-unlock" onClick={handleOpenBranch}>
            <FaUnlock/> Mở khóa
        </button>
    </>    
}

const RowTableStaff = ({branchItem,index,setDataItem,setDataOfBranch,setDataOfBranchActive}) => {
    const {setIsLoading} = useBranch()

    const handleHideBranch = async () => {
        const formData = new FormData()
        formData.append('userId',localStorage.getItem('admin_id'))
        const res = await fetch(apiUserService.baseURL+`/branches/hide/${branchItem.branchId}`,{
            method:'PUT',
            body:formData
        })
        const data = await res.json()
        if(data.code === 200){
            setDataOfBranch( branches => branches.filter( item => item.branchId !== branchItem.branchId))
            setDataOfBranchActive( branches => branches.filter( item => item.branchId !== branchItem.branchId))
        } 
    }

    const handleOpenBranch = async () => {
        try{
            setIsLoading(true)
            const res =  await fetch(apiUserService.baseURL+`/branches/update-info/${branchItem.branchId}`,{
                method: 'PUT',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    branchName:branchItem.branchName+"abc",
                    address:branchItem.address,
                    phone:branchItem.phone,
                    email:branchItem.email,
                    description:branchItem.description,
                    isActive:true
                })
            })
            if(res.ok){
                setIsLoading(false)
                const data = await res.json()
                if(data.code === 200){
                    setDataOfBranch( branches => branches.filter( item => item.branchId !== branchItem.branchId))
                    branchItem.isActive = true
                    setDataOfBranchActive( branches => [...branches,branchItem])
                }
            }
            else
                setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("Loi khi cap nhat chi nhanh")
        }
        
    }

    return <tr>
            <td>{index + 1}</td>
            <td>{branchItem.branchName}</td>
            <td>{branchItem.phone}</td> 
            <td>{branchItem.email}</td>
            <td style={{textAlign:'center'}}>{branchItem.rooms}</td>
            <td>
                {
                    branchItem.isActive 
                    ? 
                    <ButtonActionBranchEnable handleHideBranch={handleHideBranch} branchItem={branchItem} setDataItem={setDataItem}/> 
                    : 
                    <ButtonActionBranchDisable handleOpenBranch={handleOpenBranch}/>
                }
            </td>
        </tr>
}

export default RowTableStaff