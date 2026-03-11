import { useState,useEffect } from "react";
import "./style.css"
import {apiUserService} from "../index"

const FormAddUser = ({dataEdit,setUserEdit,setUsers}) => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        email: ""
    })

    useEffect(() => {
        if (dataEdit) {
            setUser({
                name: dataEdit.name,
                phone: dataEdit.phone,
                email: dataEdit.email
            });
        } else {
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
            let userActionInserOrUpdate = {}
            if(dataEdit)
                userActionInserOrUpdate.id = dataEdit.id

            userActionInserOrUpdate.name = user.name
            userActionInserOrUpdate.phone = user.phone
            userActionInserOrUpdate.email = user.email

            let action = (dataEdit) ? "/update" : "/save"

            const response = await fetch(apiUserService.baseURL+action,{
                method:(dataEdit) ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    userActionInserOrUpdate
                )
            })

            const data = await response.json()
            if(data.code === 1001){
                setUser({ name: "", phone: "", email: "" })
                if(dataEdit){
                    setUsers( users => users.map( item => {
                        if(item.id === data.data.id){
                            item.name = data.data.name
                            item.phone = data.data.phone
                            item.email = data.data.email
                        }
                        return item
                    }))
                    setUserEdit(null)
                }
                else
                    setUsers( users => [...users,data.data])
            }
            else
                alert("Thất bại, "+data.data)
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

            <button id="btnSave" style={{display: 'block',margin: '20px auto',width: '20%',color:'white'}} onClick={handleInsertUser}>Lưu</button>
        </div>  
    </div>
}
export default FormAddUser