import './styleOfTable.css'
import { apiUserService,customeFetch,useBranch } from '../index'
import { FaLock,FaEdit} from "react-icons/fa"

const RowTableUser = ({dataItem,index,setDataItem,setDataOfService,type}) => {
    const {setIsLoading} = useBranch()

    const handleDeleteAmenities = async () => {
        if(window.confirm("Bạn chắc chắn muốn xóa không ?")){
            try{
                setIsLoading(true)
                let id = (dataItem.idAmenities) ? dataItem.idAmenities : dataItem.serviceId
                let idName = (type === 'services') ? 'serviceId' : 'idAmenities'
                let url = `/${type}/${id}`
                const res = await customeFetch(apiUserService.baseURL+url,'authen','DELETE')
                if(res.ok){
                    setDataOfService( services => services.filter( item => item[idName] !== dataItem[idName]))
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("co loi fetch amenities")
            }
        }
    }
    
    return <tr>
            <td>{index + 1}</td>
            {
                (type==='services')&&<td>{dataItem.serviceName}</td>
            }
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