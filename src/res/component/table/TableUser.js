import './styleOfTable.css'
import RowTableUser from "./RowTableUser.js"
import {apiUserService,customeFetch,useBranch} from "../index.js"
import { useState } from 'react'
import { FaPlus} from "react-icons/fa"

const temp = {
    username: "tam01",
    password: "123456",
    fullName: "Nguyễn Minh Tâm",
    phone: "0522542373",
    email: "tam@gmail.com",
    address: "HCM",
    add:true
}
const TableUser = ({userForRender,setDataItem,setDataOfUser,dataOfUserActive,setDataOfUserActive,setDetailOfUser,setIsClick,setUserForRender,itemPerPage,
    setTotalPage,dataOfUser,setCurrentPage,currentPage}) => {

    const props = {
            dataOfUser,
            userForRender,
            setDataItem,
            setDataOfUser,
            setDataOfUserActive,
            setDetailOfUser,
            setIsClick,
            setUserForRender,
            setTotalPage,
            setCurrentPage
    }
    const {setIsLoading} = useBranch()
    const [userDisable,setUserDisable] = useState(false)
    
    const handleChangeUserDiasable = async (e) => {
        let isChange = e.target.checked
        setUserDisable(isChange)
        setDetailOfUser({})
        if(isChange){
            try{
                setIsLoading(true)
                const res = await customeFetch(apiUserService.baseURL+'/users/disabled','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    if(data.code===1001){
                        setDataOfUser(data.data)
                        setCurrentPage(1)
                    }
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("fail to get data user disable",err)
            }
        }
        else{
            setDataOfUser(dataOfUserActive)
        } 
    }
    const handleOpenModalStaff = () => {
        setDataItem(temp)
    }
    return <>
        <div>
            <header>
                <h2 id="table-title">Danh sách tài khoản</h2>
                <button className="btn btn-add" onClick={handleOpenModalStaff}>
                    <FaPlus/> Tạo tài khoản khách
                </button>
            </header>

            <section className="table-container">
                <input type="checkbox" name="" checked={userDisable} onChange={handleChangeUserDiasable} id="disable-user" style={{marginRight:'5px'}}/>
                <label htmlFor="disable-user">Tài khoản đã ngừng kích hoạt:</label>
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Fullname</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Hạng thành viên</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {
                            userForRender.map( (item,index) => <RowTableUser {...props} userItem={item} key={index} index={index} />)
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </>
}

export default TableUser