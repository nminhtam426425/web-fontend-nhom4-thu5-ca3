import './styleOfForm.css'
import { useState,useEffect } from 'react'
import {apiUserService,customeFetch,useBranch} from "../index"
import {passValidation,validateEmail,validatePhoneNumber,validateUsername,validateStrEmpty} from "../Valid"

const FormStaff = ({data,setDataItem,setDatas}) => {
    const {setIsLoading} = useBranch()
    const closeModal = () => {
        setDataItem(null)
    }
    const [staff, setStaff] = useState({
        fullname: "",
        phone: "",
        email: "",
        address:"",
        review_avatar:"",
        username:""

    })
    const [errorStaff, setErrorStaff] = useState({
        username:"",
        password:"",
        fullname: "",
        phone: "",
        email: "",
        address:""
    })

    useEffect(() => {
        if (data) {
            setStaff({
                fullname: data.fullName || "",
                phone: data.phone || "",
                email: data.email || "",
                address: data.address || "",
                review_avatar: data.src || "",
                username: data.username || ""
            });
            setStaff({
                fullname: data.fullName || "",
                phone: data.phone || "",
                email: data.email || "",
                address: data.address || "",
                review_avatar: data.src || "",
                username: data.username || ""
            });
        } else {
            // Nếu dataEdit trống (sau khi lưu xong), reset form về rỗng
            setStaff({ fullname: "", phone: "", email: "",address:"",review_avatar:"" });
        }
    }, [data]); 

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setStaff({
            ...staff,
            [id]: value 
        })
        if(id === 'phone'){
            setErrorStaff({
                ...errorStaff,
                [id]: validatePhoneNumber(value)
            })
        }
        else if(id === 'email'){
            setErrorStaff({
                ...errorStaff,
                [id]: validateEmail(value)
            })
        }
        else if(id === 'username'){
            setErrorStaff({
                ...errorStaff,
                [id]: validateUsername(value)
            })
        }
        else{
            setErrorStaff({
                ...errorStaff,
                [id]: validateStrEmpty(value)
            })
        }
    }
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         URL.revokeObjectURL(staff.review_avatar)
    //         setStaff({
    //             ...staff,
    //             review_avatar: URL.createObjectURL(file)
    //         })
    //     }
    // }
    const handleUpdateUser = async () => {
        try{
            console.log( {id:data.userId || data.id,
                username: data.username,
                password: "",
                fullName: staff.fullname,
                email: staff.email,
                phone: staff.phone,
                address: staff.address,
                roleId: 2,
                isActive: true
            })
            setIsLoading(true)
            const res = await customeFetch(apiUserService.baseURL+"/users/update",
                'authen',
                'PUT',
                JSON.stringify({
                    id:data.userId || data.id,
                    username: data.username,
                    password: "",
                    fullName: staff.fullname,
                    email: staff.email,
                    phone: staff.phone,
                    address: staff.address,
                    roleId: 2,
                    isActive: true
                })
            )
            if(res.ok){
                const data = await res.json()
                if(data.code === 1001){
                    setDatas( staffs => staffs.map( item => {
                        if(item.userId === data.data.id){
                            item.fullName = data.data.fullName
                            item.phone = data.data.phone
                            item.email = data.data.email
                            item.address = data.data.address
                        }
                        return item
                    }))
                    setDataItem(null)
                }
            }
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            console.log("lỗi update user")
        }
    }
    if(data)
        return <>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h3 id="modal-title">Chỉnh sửa thông tin</h3>
                <form id="account-form">
                    {/* <div className="avatar-upload">
                        <img id="review_avatar" alt="Avatar" src={staff.review_avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6WpyGdYzwEFBXQm-nXaTfIXcPH1IB1hGWw&s"}/>
                        <br/>
                        <input type="file" id="input-avatar" accept="image/*" onChange={handleImageChange}/>
                    </div> */}

                    <div className="input-group" style={{width:'100%'}}>
                        <input type="text" id="username" className="input-field" placeholder="" value={staff.username} readOnly onChange={handleInputChange}/>
                        <label htmlFor="username" className="input-label">Tên đăng nhập</label>
                        <span className="validation">{errorStaff.username}</span>
                    </div>
                    
                    <div className="input-group" style={{width:'100%'}}>
                        <input type="text" id="fullname" className="input-field" placeholder="" value={staff.fullname} onChange={handleInputChange}/>
                        <label htmlFor="name" className="input-label">Họ và tên</label>
                        <span className="validation">{errorStaff.fullname}</span>
                    </div>

                    <div className="form-row">
                        <div className="input-group" style={{width:'100%'}}>
                            <input type="text" id="phone" className="input-field" placeholder="" value={staff.phone} onChange={handleInputChange}/>
                            <label htmlFor="name" className="input-label">Số điện thoại</label>
                            <span className="validation">{errorStaff.phone}</span>
                        </div>
                        <div className="input-group" style={{width:'100%'}}>
                            <input type="text" id="email" className="input-field" placeholder="" value={staff.email} onChange={handleInputChange}/>
                            <label htmlFor="name" className="input-label">Email</label>
                            <span className="validation">{errorStaff.email}</span>
                        </div>
                    </div>

                    <div className="input-group" style={{width:'100%'}}>
                        <input type="text" id="address" className="input-field" placeholder="" value={staff.address} onChange={handleInputChange}/>
                        <label htmlFor="name" className="input-label">Địa chỉ</label>
                        <span className="validation">{errorStaff.address}</span>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-save" onClick={handleUpdateUser} 
                                                                        style={{cursor: passValidation(errorStaff) ? 'pointer' : 'not-allowed'}} 
                                                                        disabled={passValidation(errorStaff) ? false : true}>
                            Lưu
                        </button>
                        <button type="button" className="btn btn-cancel" onClick={closeModal}>Hủy</button>
                    </div>
                </form>
            </div>
         </>
    else
        return <></>
}
export default FormStaff