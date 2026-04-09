import './styleOfTable.css'
import RowTableStaff from "./RowTableStaff.js"
import {SelectBranch} from "../Dash"
import {apiUserService,useBranch} from "../index.js"
import { useState } from 'react'
import { FaPlus} from "react-icons/fa"

const temp = {
    username: "staff01",
    password: "123456",
    fullName: "Nguyen Van A",
    phone: "0522542373",
    email: "staff@gmail.com",
    address: "HCM",
    add:true
}

const TableStaff = ({dataOfStaff,setDataItem,setDataOfStaff,dataOfStaffActive,setDataOfStaffActive}) => {
    const [staffDisable,setStaffDisable] = useState(false)
    const {setIsLoading} = useBranch()
    const handleOpenModalStaff = () => {
        setDataItem(temp)
    }
    const props = {
        setDataItem,
        setDataOfStaff,
        setDataOfStaffActive
    }
    const handleChangeStaffDiasable = async (e) => {
        let isChange = e.target.checked
        setStaffDisable(isChange)
        if(isChange){
            try{
                setIsLoading(true)
                const res = await fetch(apiUserService.baseURL+'/staff/disabled')
                if(res.ok){
                    setIsLoading(false)
                    const data = await res.json()
                    if(data.code===1001)
                        setDataOfStaff(data.data)
                }
                else
                    setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("fail to get data staff disable")
            }
        }
        else
            setDataOfStaff(dataOfStaffActive)
    }
    return <>
        <div>
            <header>
                <h2 id="table-title">Danh sách tài khoản</h2>
                <button className="btn btn-add" onClick={handleOpenModalStaff}>
                    <FaPlus/> Tạo tài khoản nhân viên
                </button>
            </header>

            <section className="table-container">
                <SelectBranch/>
                <input type="checkbox" id="disable-staff" style={{marginRight:'5px'}} checked={staffDisable} onChange={handleChangeStaffDiasable}/>
                <label htmlFor="disable-staff">Nhân viên đang bị khóa:</label>
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Fullname</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {
                            dataOfStaff.map( (item,index) => <RowTableStaff staffItem={item} key={index} index={index} {...props}/>)  
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </>
}

export default TableStaff