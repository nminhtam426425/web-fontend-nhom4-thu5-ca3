import './styleOfTable.css'
import { apiUserService,useBranch } from '../index'
import { FaLock,FaEdit} from "react-icons/fa"

const RowTableUser = ({dataItem,index,setDataItem,setDataOfService}) => {
    const {setIsLoading} = useBranch()

    const handleDeleteAmenities = async () => {
        if(window.confirm("Bạn chắc chắn muốn xóa không ?")){
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+`/amenities/${dataItem.idAmenities}`,{
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                setIsLoading(false)
                if(res.ok){
                    setDataOfService( services => services.filter( item => item.idAmenities !== dataItem.idAmenities) )
                }
            }
            catch(err){
                setIsLoading(false)
                console.log("co loi fetch amenities")
            }
        }
    }
    
    return <tr>
            <td>{index + 1}</td>
            <td>{dataItem.description}</td>
            <td>
                <button className="btn-1 btn-edit" onClick={()=>setDataItem(dataItem)}>
                    <FaEdit/> Sửa
                    </button>
                <button className="btn-1 btn-lock" onClick={handleDeleteAmenities}>
                    <FaLock/>  Xóa
                </button>
            </td>
        </tr>
}

export default RowTableUser