import { useNavigate } from "react-router-dom"
const Logout = () => {
    localStorage.removeItem('admin_id')
    const navigate = useNavigate()
    navigate("/login")
}

export default Logout