import './styleOfForm.css'
import { useState,useEffect } from 'react'
import {apiUserService,useBranch} from "../index"

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
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            URL.revokeObjectURL(staff.review_avatar)
            setStaff({
                ...staff,
                review_avatar: URL.createObjectURL(file)
            })
        }
    }
    const handleUpdateUser = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(apiUserService.baseURL+"/users/update",{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:data.userId,
                    username: data.username,
                    password: "",
                    fullName: staff.fullname,
                    email: staff.email,
                    phone: staff.phone,
                    address: staff.address,
                    roleId: 2,
                    isActive: true
                })
            })
            console.log(data)
            if(res.ok){
                setIsLoading(false)
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
            else
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
                    <div className="avatar-upload">
                        <img id="review_avatar" alt="Avatar" src={staff.review_avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6WpyGdYzwEFBXQm-nXaTfIXcPH1IB1hGWw&s"}/>
                        <br/>
                        <input type="file" id="input-avatar" accept="image/*" onChange={handleImageChange}/>
                    </div>

                    <div className="input-group" style={{width:'100%'}}>
                        <input type="text" id="username" className="input-field" placeholder="" value={staff.username} readOnly/>
                        <label htmlFor="username" className="input-label">Tên đăng nhập</label>
                    </div>
                    
                    <div className="input-group" style={{width:'100%'}}>
                        <input type="text" id="fullname" className="input-field" placeholder="" value={staff.fullname} onChange={handleInputChange}/>
                        <label htmlFor="name" className="input-label">Họ và tên</label>
                    </div>

                    <div className="form-row">
                        <div className="input-group" style={{width:'100%'}}>
                            <input type="text" id="phone" className="input-field" placeholder="" value={staff.phone} onChange={handleInputChange}/>
                            <label htmlFor="name" className="input-label">Số điện thoại</label>
                        </div>
                        <div className="input-group" style={{width:'100%'}}>
                            <input type="text" id="email" className="input-field" placeholder="" value={staff.email} onChange={handleInputChange}/>
                            <label htmlFor="name" className="input-label">Email</label>
                        </div>
                    </div>

                    <div className="input-group" style={{width:'100%'}}>
                        <input type="text" id="address" className="input-field" placeholder="" value={staff.address} onChange={handleInputChange}/>
                        <label htmlFor="name" className="input-label">Địa chỉ</label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-save" onClick={handleUpdateUser}>Lưu</button>
                        <button type="button" className="btn btn-cancel" onClick={closeModal}>Hủy</button>
                    </div>
                </form>
            </div>
         </>
    else
        return <></>
}
export default FormStaff