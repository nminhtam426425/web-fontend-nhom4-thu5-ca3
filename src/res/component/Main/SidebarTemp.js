import "./styleOfMain.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
    FaThLarge, 
    FaUsers, 
    FaChevronDown, 
    FaBed, 
    FaCalendarCheck, 
    FaChevronUp
} from "react-icons/fa"

const Sidebar = () => {
    const [ismMangerBranch, setIsManagerBranch] = useState(false);
    const [isMangerService, setIsManagerService] = useState(false);

    return (
        <>
            <aside className="sidebar">
                <div className="logo">
                    <h2>FOURGROUP HOTEL</h2>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <FaThLarge /> Dashboard
                            </Link>
                        </li> 
                        <li className="has-submenu">
                            <div>
                                <Link onClick={()=>setIsManagerBranch(pre => !pre)} style={{ cursor: 'pointer'}}>
                                    <FaUsers /> Quản lý tài khoản
                                    {
                                        ismMangerBranch ? <FaChevronUp/> : <FaChevronDown/>
                                    }
                                </Link>
                                <div className="submenu" 
                                    style={ ismMangerBranch ? {opacity:1, gridTemplateRows:'1fr'} : {} }>
                                    <ul>
                                        <li><Link to="/staff">Tài khoản nhân viên</Link></li>
                                        <li><Link to="/user">Tài khoản khách</Link></li>
                                        <li><Link to="/branches">Chi nhánh</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link onClick={()=>setIsManagerService(pre => !pre)} style={{ cursor: 'pointer'}}>
                                <FaBed /> Quản lý dịch vụ khách sạn
                                {
                                    isMangerService ? <FaChevronUp/> : <FaChevronDown/>
                                }
                            </Link>
                            <div className="submenu" 
                                style={ isMangerService ? {opacity:1, gridTemplateRows:'1fr'} : {} }>
                                <ul>
                                    <li><Link to="/typeRoom">Quản lý phòng</Link></li>
                                    <li><Link to="/service">Dịch vụ & Tiện nghi</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to="/bookings">
                                <FaCalendarCheck /> Danh sách đặt phòng
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="#">
                                <FaChartLine /> Báo cáo
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </aside>
        </>
    );
};
export default Sidebar