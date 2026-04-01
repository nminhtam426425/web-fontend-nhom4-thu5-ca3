import './styleOfTable.css'
import RowTableBranch from "./RowTableBranch.js"
import {SelectBranch} from "../Dash"
import { FaPlus} from "react-icons/fa"

const temp = {
    add:true,
    branchName:"FOURGROUP Hotel Đà Nẵng",
    address: "120 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng",
    phone: "0905123456",
    email: "danang@fourgroup.com",
    description: "FOURGROUP Hotel Đà Nẵng nằm sát bãi biển Mỹ Khê, cung cấp hồ bơi vô cực, spa cao cấp và nhà hàng view biển. Khách sạn đạt tiêu chuẩn 5 sao với đầy đủ tiện nghi hiện đại.",
    isActive: true
}

const TableBranch = ({dataOfBranch,setDataItem,setDataOfBranch}) => {
    const handleOpenModalStaff = () => {
        setDataItem(temp)
    }
    return <>
        <div>
            <header>
                <h2 id="table-title">Danh sách chi nhánh của khách sạn</h2>
                <button className="btn btn-add" onClick={handleOpenModalStaff}>
                    <FaPlus/> Tạo chi nhánh
                </button>
            </header>

            <section className="table-container">
                <SelectBranch/>
                <input type="checkbox" style={{marginRight:'5px'}}/>Chi nhánh đã ẩn:
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên chi nhánh</th>
                            <th>Điện thoại</th>
                            <th>Email hỗ trợ</th>
                            <th style={{textAlign:'center'}}>Số phòng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {
                            dataOfBranch.map( (item,index) => <RowTableBranch branchItem={item} key={index} index={index} setDataItem={setDataItem} setDataOfBranch={setDataOfBranch}/>)
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </>
}

export default TableBranch