import "./style.css"
import {FaConciergeBell,FaDoorOpen,FaDollarSign,FaPercentage} from "react-icons/fa"
import {PrintAmountVND} from "./index"
const Stat = ({data}) => {
    return <>
        <section className="stats-grid">
            <div className="card">
                <div className="icon-react"><FaConciergeBell/></div>
                <div>
                    <h3>{data.totalCheckInToday}</h3>
                    <p>Check-in hôm nay</p>
                </div>
            </div>
            <div className="card">
                <div className="icon-react"><FaDoorOpen/></div>
                <div>
                    <h3>{data.totalRoomForUser} / {data.totalRoom}</h3>
                    <p>Phòng đang sử dụng</p>
                </div>
            </div>
            <div className="card">
                <div className="icon-react"><FaDollarSign/></div>
                <div>
                    <h3><PrintAmountVND amount={data?.totalRevenue || 0}/></h3>
                    <p>Doanh thu ngày</p>
                </div>
            </div>
            <div className="card">
                <div className="icon-react"><FaPercentage/></div>
                <div>
                    <h3>{
                            Math.floor(data.totalRoomForUser*100/(data.totalRoom === 0 ? 1 : data.totalRoom))
                        }%
                    </h3>
                    <p>Tỉ lệ lấp đầy</p>
                </div>
            </div>
        </section>
    </>
}
export default Stat