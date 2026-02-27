import { useEffect, useState } from 'react'

import './style.css'
import Row from "./Row"
import {FormAddUser,apiUserService} from "../index"

const TableUsers = () => {
    const [users,setUsers] = useState([])
    const [isChange,setIsChange] = useState(true)
    const [userEdit,setUserEdit] = useState(null) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUserService.baseURL)
                const data = await response.json()
                setUsers(data.data)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error)
            }
        }
        fetchData()
    }, [isChange])

    const hanldeSetIsChange = (e) => {
        (isChange) ? setIsChange(false) : setIsChange(true)
    }

    return  <>
        <FormAddUser handleChange={hanldeSetIsChange} dataEdit={userEdit} handleUserEdit={setUserEdit}/>
        <div className="tableData">
            <table id="tableStudents" style={{width:'100%'}}>
                <thead>
                        <tr>
                            <th>STT</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                </thead>
                <tbody>
                    { 
                        users.map((user, index) => (
                            <Row key={index} user={user} countUser={index + 1} handleChange={hanldeSetIsChange} handleUserEdit={setUserEdit}/>))
                    }
                </tbody>
            </table>
        </div>
    </>
}
export default TableUsers