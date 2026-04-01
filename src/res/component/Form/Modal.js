import './styleOfForm.css'
import FormStaff from "./FormStaff"
import FormBranch from "./FormBranch"
import FormAddStaff from "./FormAddStaff"
import FormAddStyleRoom from './FormAddTypeRoom'
import FormAddRoom from "./FormAddRoom"
import FormShowImage from './FormShowImage'
import FormUser from './FormUser'
import FormService from "./FormService"
import Loading from './Loading'

const Modal = ({styleModal,data,setDataItem,setDatas,roleForCreate,message}) => {
    const style = {
        staff:FormStaff,
        branch: FormBranch,
        addStaff:FormAddStaff,
        addTypeRoom:FormAddStyleRoom,
        addRoom:FormAddRoom,
        showImage:FormShowImage,
        user:FormUser,
        service:FormService,
        loading:Loading
    }
    let Element = style[styleModal]
    let props = {
        data,
        setDataItem,
        setDatas,
        message
    }
    if(roleForCreate)
        props.roleForCreate = roleForCreate
   

    return <div className="modal" style={{display: data ? 'flex' : 'none'}}>
        <Element data={data} {...props}/>
    </div>
}

export default Modal