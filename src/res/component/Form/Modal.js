import './styleOfForm.css'
import FormStaff from "./FormStaff"
import FormBranch from "./FormBranch"
import FormAddStaff from "./FormAddStaff"
import FormAddStyleRoom from './FormAddTypeRoom'
import FormAddRoom from "./FormAddRoom"
import FormShowImage from './FormShowImage'
import FormUser from './FormUser'
import FromAmenities from "./FormAmenities"
import Loading from './Loading'
import FormInfoBooking from './FormInfoBooking'
import FormService from './FormService'

const Modal = ({styleModal,data,setDataItem,setDatas,roleForCreate,setDatasActive,message}) => {
    const style = {
        staff:FormStaff,
        branch: FormBranch,
        addStaff:FormAddStaff,
        addTypeRoom:FormAddStyleRoom,
        addRoom:FormAddRoom,
        showImage:FormShowImage,
        user:FormUser,
        amenities:FromAmenities,
        loading:Loading,
        infoBooking: FormInfoBooking,
        services: FormService
    }
    let Element = style[styleModal]
    let props = {
        data,
        setDataItem,
        setDatas,
        message,
        setDatasActive
    }
    if(roleForCreate)
        props.roleForCreate = roleForCreate
   

    return <div className="modal" style={{display: data ? 'flex' : 'none'}}>
        <Element data={data} {...props}/>
    </div>
}

export default Modal