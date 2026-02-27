import { useState,useEffect } from "react";
import "./style.css"
import {apiUserService} from "../index"
const FormAddUser = ({handleChange,dataEdit,handleUserEdit}) => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: ""
    })

    useEffect(() => {
        if (dataEdit) {
            setUser({
                name: dataEdit.name || "",
                phone: dataEdit.phone || "",
                email: dataEdit.email || ""
            });
        } else {
            // Nếu dataEdit trống (sau khi lưu xong), reset form về rỗng
            setUser({ name: "", phone: "", email: "" });
        }
    }, [dataEdit]); 

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setUser({
            ...user,
            [id]: value 
        })
    }

    const handleInsertUser = async () => {
        try {
            if(dataEdit){
                const response = await fetch(apiUserService+"update",{
                    method:"PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                       id:dataEdit.id,
                       name:user.name,
                       phone:user.phone,
                       email:user.email
                    })
                })
                const data = await response.json()
                if(data.code === 1001){
                    handleChange()
                    setUser({ name: "", phone: "", email: "" });
                    handleUserEdit(null)
                }
                else
                    alert("Thất bại, "+data.data)
            }
            else{
                const response = await fetch(apiUserService+"save",{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                       name:user.name,
                       phone:user.phone,
                       email:user.email
                    })
                })
                const data = await response.json()
                if(data.code === 1001){
                    handleChange()
                    setUser({ name: "", phone: "", email: "" });
                }
                else
                    alert("Thất bại, "+data.data)
            }
        } catch (error) {
            console.error("Lỗi khi thêm dữ liệu:", error)
        }
    }

    return <div className="formInsert">
        <h1 style={{textAlign:"center"}}>Nhập thông tin</h1>
    
        <div>

            <div className="input-group" style={{width:'100%'}}>
                <input type="text" id="name" className="input-field" placeholder="" value={user.name} onChange={handleInputChange}></input>
                <label htmlFor="name" className="input-label">Họ và tên</label>
            </div>
            
            <div className="input-group" style={{width:'100%'}}>
                <input type="text" id="phone" className="input-field" placeholder="" value={user.phone} onChange={handleInputChange}></input>
                <label htmlFor="phone" className="input-label">Số điện thoại</label>
            </div>

            <div className="input-group" style={{width:'100%'}}>
                <input type="text" id="email" className="input-field" placeholder="" value={user.email} onChange={handleInputChange}></input>
                <label htmlFor="email" className="input-label">Email</label>
            </div>

            <button id="btnSave" style={{display: 'block',margin: '20px auto',width: '20%'}} onClick={handleInsertUser}>Lưu</button>
        </div>  
    </div>
}
export default FormAddUser