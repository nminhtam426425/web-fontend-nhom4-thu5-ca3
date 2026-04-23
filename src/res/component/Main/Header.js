import "./styleOfMain.css"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        navigate("/login")
    }
    return <>
        <header className="bg-gray header">
            <h1>Tổng quan hệ thống</h1>
            <div className="user-info">
                <span>Admin Nguyễn</span>
                <img src="https://ui-avatars.com/api/?name=Admin+Nguyen" alt="Avatar"/>

                <div className="menu-container">
                    <div className="profile-header">
                        <h2 className="user-name">Admin Nguyễn</h2>
                        <p className="user-sub">Your personal information and settings.</p>
                        
                        <svg className="avatar-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="logout-icon">↪</span>
                        Log out
                    </button>
                </div>
            </div>
        </header>
        <hr/>
    </>
}
export default Header