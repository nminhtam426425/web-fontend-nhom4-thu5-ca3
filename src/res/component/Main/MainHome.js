import "./styleOfMain.css"
import {Chart,Stat,DetailBranchBooking} from "../Dash"
import SidebarTemp from "./SidebarTemp"
import Header from './Header.js';


const MainHome = () => {
    return <div className="container">
        <SidebarTemp/>
        <div className='main-content'>
            <Header/>
            <Stat/>
            <DetailBranchBooking/>
            <Chart/>
        </div>
    </div>
   
}

export default MainHome