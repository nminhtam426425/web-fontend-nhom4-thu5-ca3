import './styleOfTable.css'
import { apiUserService } from '../index'
import { FaLock,FaEdit} from "react-icons/fa"

const RowTableStaff = ({branchItem,index,setDataItem,setDataOfBranch}) => {
    const handleHideBranch = async () => {
        const formData = new FormData()
        formData.append('userId',localStorage.getItem('admin_id'))
        const res = await fetch(apiUserService.baseURL+`/branches/hide/${branchItem.branchId}`,{
            method:'PUT',
            body:formData
        })
        const data = await res.json()
        if(data.code === 200)
            setDataOfBranch( branches => branches.filter( item => item.branchId !== branchItem.branchId))
    }

    return <tr>
            <td>{index + 1}</td>
            <td>{branchItem.branchName}</td>
            <td>{branchItem.phone}</td> 
            <td>{branchItem.email}</td>
            <td style={{textAlign:'center'}}>{branchItem.rooms}</td>
            <td>
                <button className="btn-1 btn-edit" onClick={()=>setDataItem(branchItem)}>
                    <FaEdit/> Sửa
                </button>
                <button className="btn-1 btn-lock" onClick={handleHideBranch}>
                    <FaLock/> Khóa
                </button>
            </td>
        </tr>
}

export default RowTableStaff