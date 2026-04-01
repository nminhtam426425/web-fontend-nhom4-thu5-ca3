import './styleOfForm.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FormLogin = () => {
    const navigate = useNavigate()
    const[authen,setAuthen] = useState({username:"",password:""})
    const handleInputlogin = (e) => {
        const {id,value} = e.target
        setAuthen({
            ...authen,
            [id]:value
        })
    }
    const handleLogin = () => {
        if(authen.username === "admin01" && authen.password === "123456"){
            
            localStorage.setItem("admin_id","50a3a35f-28c2-11f1-b8a4-d481d769f217")
            navigate("/")
        }
        else
            alert("Fail to login !")
    }

    return <>
        <div className="modal" style={{display:'flex'}}>
            <div className="modal-content">
                <h3 id="modal-title" style={{textAlign:'center'}}>LOGIN</h3>
                <form id="account-form">
                    <div className="input-group" style={{width: '100%'}}>
                        <input type="text" id="username" className="input-field" placeholder="" value={authen.username} onChange={handleInputlogin}/>
                        <label htmlFor="username" className="input-label">Username</label>
                    </div>

                    <div className="input-group" style={{width: '100%'}}>
                        <input type="password" id="password" className="input-field" placeholder="" value={authen.password} onChange={handleInputlogin}/>
                        <label htmlFor="password" className="input-label">Password</label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-save" onClick={handleLogin}>Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default FormLogin