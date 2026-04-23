import './styleOfForm.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {apiUserService,customeFetch} from "../index"

const FormLogin = () => {
    const navigate = useNavigate()
    const [errorLogin,setErrorLogin] =useState("")
    const[authen,setAuthen] = useState({username:"",password:""})
    const handleInputlogin = (e) => {
        const {id,value} = e.target
        setAuthen({
            ...authen,
            [id]:value
        })
    }

    const handleLogin = async () => {
        const res = await customeFetch(apiUserService.baseURL+'/auth/login','non-authen','POST',JSON.stringify(authen))
        if(res.ok){
            const data = await res.json()
            if(data.token){
                localStorage.setItem("token",data.token)
                localStorage.setItem("refreshToken",data.refreshToken)
                navigate("/")
            }
            else
                setErrorLogin(data.data)
        }
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
                        <span className="validation" style={{marginTop: '10px'}}>{errorLogin}</span>
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