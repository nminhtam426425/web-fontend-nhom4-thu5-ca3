import "./styleOfMain.css"
import SidebarTemp from "./SidebarTemp"
import ContentRoomManager from "../Room/ContentRoomManager"
import Header from "./Header"

const MainRoomManager = () => {
    return <div className="container">
        <SidebarTemp/>
        <div className='main-content'>
            <Header/>
            <ContentRoomManager/>
        </div>
    </div>
}

export default MainRoomManager