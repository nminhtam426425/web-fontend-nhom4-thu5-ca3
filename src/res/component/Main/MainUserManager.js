import "./styleOfMain.css"
import TableUser from '../table/TableUser.js'
import { useEffect, useState } from 'react'
import Sidebar from './SidebarTemp.js'
import Modal from "../Form/Modal"
import Header from './Header.js'
import {apiUserService,customeFetch,useBranch} from "../index.js"
import TableDetailOfUser from "../table/TableDetailOfUser.js"
import Paging from "../Paging/Paging.js"

const MainUserManager = () => {
    const itemPerPage = 5
    const [dataOfUser,setDataOfUser] = useState([])
    const [dataOfUserActive,setDataOfUserActive] = useState([])
    const [isClick,setIsClick] = useState(false)
    const [detailOfUser,setDetailOfUser] = useState({})
    const [dataItem,setDataItem] = useState(null)
    const {isLoading,setIsLoading} = useBranch()
    const [userForRender,setUserForRender] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPage,setTotalPage] = useState(0)
    const props = {
        dataOfUser,
        dataOfUserActive,
        isClick,
        itemPerPage,
        currentPage,
        setDataOfUser,
        setDataItem,
        setDataOfUserActive,
        setDetailOfUser,
        setIsClick,
        setUserForRender,
        setCurrentPage,
        setTotalPage
    }
    useEffect(()=>{
        const handleFetchStaffs = async () => {
            try{
                setIsLoading(true)
                const res = await customeFetch(apiUserService.baseURL+"/users",'authen','GET')
                if(res.ok){
                    const data = await res.json()
                    if(data.code === 1001){
                        setDataOfUser(data.data)
                        setDataOfUserActive(data.data)
                    }
                }
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log("Lỗi lấy dữ user")
            }
        }
        handleFetchStaffs()
    },[setIsLoading])

    useEffect(() => {
        let totalPageTemp = dataOfUser.length
        if(totalPageTemp < itemPerPage)
            setTotalPage(1)
        else {
            if(totalPageTemp%itemPerPage === 0)
                setTotalPage(totalPageTemp/itemPerPage)
            else
                setTotalPage(Math.floor(totalPageTemp/itemPerPage)+1)
        }

        const startIndex = (currentPage - 1) * itemPerPage
        const endIndex = startIndex + itemPerPage
        
        setUserForRender(dataOfUser.slice(startIndex, endIndex))
    }, [currentPage, dataOfUser])
    return <div>
        <div className='container'>
            <Sidebar/>
            <div className='main-content'>
                <Header/>
                <TableUser {...props} userForRender={userForRender}/>
                <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} setDetailOfUser={setDetailOfUser}/>
                <TableDetailOfUser detailOfUser={detailOfUser} />
            </div>
        </div>
        <Modal styleModal={ dataItem?.add ? 'addStaff' : 'user'} data={dataItem} setDataItem={setDataItem} setDatas={setDataOfUser} roleForCreate="1"/>
        <Modal styleModal="loading" data={isLoading} setDataItem={setIsLoading} message="Đang tải dữ liệu, vui lòng chờ"/>
    </div>
   
}

export default MainUserManager