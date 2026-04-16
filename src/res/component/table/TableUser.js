import './styleOfTable.css'
import RowTableUser from "./RowTableUser.js"
import {apiUserService,useBranch} from "../index.js"
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
const TableUser = ({dataOfUser,setDataItem,setDataOfUser,dataOfUserActive,setDataOfUserActive,setDetailOfUser,setIsClick,setUserForRender,itemPerPage,
    setTotalPage,currentPage}) => {

    const props = {
            setDataItem,
            setDataOfUser,
            setDataOfUserActive,
            setDetailOfUser,
            setIsClick,
            setUserForRender
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
                const res = await fetch(apiUserService.baseURL+'/users/disabled')
                if(res.ok){
                    const data = await res.json()
                    if(data.code===1001){
                        setDataOfUser(data.data)
                        setUserForRender(data.data)
                        let totalPageTemp = data.data.length
                        if(totalPageTemp !== 0){
                            if(totalPageTemp%itemPerPage === 0)
                                setTotalPage(totalPageTemp/itemPerPage)
                            else
                                setTotalPage(Math.floor(totalPageTemp/itemPerPage)+1)
                        }
                        else
                            setTotalPage(0)
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
            let totalPageTemp = dataOfUserActive.length
            if(totalPageTemp !== 0){
                if(totalPageTemp%itemPerPage === 0)
                    setTotalPage(totalPageTemp/itemPerPage)
                else
                    setTotalPage(Math.floor(totalPageTemp/itemPerPage)+1)
                    const startIndex = (currentPage-1) * itemPerPage
                    const endIndex = startIndex + itemPerPage
                    setUserForRender(dataOfUserActive.slice(startIndex,endIndex))
            }
            else
                setTotalPage(0)
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
                            dataOfUser.map( (item,index) => <RowTableUser {...props} userItem={item} key={index} index={index} />)
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </>
}

export default TableUser