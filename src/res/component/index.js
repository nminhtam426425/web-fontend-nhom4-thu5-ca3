import MainStaffManager from "./Main/MainStaffManager"
import MainBranchManager from "./Main/MainBranchManager"
import MainHome from "./Main/MainHome"
import FormLogin from "./Form/FormLogin"
import MainRoomManager from "./Main/MainRoomManager"
import MainUserManager from "./Main/MainUserManager"
import MainServiceManager from "./Main/MainServiceManager"
import MainBooking from "./Main/MainBooking"
import { createContext, useState, useContext } from 'react';

const apiUserService = {
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081"
}

const apiCloudinary = {
    preset: process.env.REACT_APP_PRESET,
    cloudName: process.env.REACT_APP_CLOUD_NAME
}

const getToken = () => {
    return localStorage.getItem('token')
}

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}
// nếu refreshTọken thành công --> gọi lại hàm customeFetch
// nêu lỗi 999 - refreshToken hết hạn --> đăng xuất
const refreshToken = async (url,type,method,body) => {
    let refreshToken = getRefreshToken()
    let res = null
    let resAfterGetToken = null
    try{
        res = await fetch(apiUserService.baseURL+`/auth/refresh?refreshToken=${refreshToken}`)
        if(res.ok){
            const data = await res.json()
            if(data.code === 999){
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                console.log("abc")
            }
            else if(data.token){
                localStorage.setItem('token',data.token)
                resAfterGetToken = await customeFetch(url,type,method,body)
            }
        }
    }
    catch(err){
        console.log(err)
    }
    return resAfterGetToken
}

const customeFetch = async (url, type, method, body) => {
    let res = null;
    const token = getToken()

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (type !== 'non-authen' && token) 
        options.headers["Authorization"] = `Bearer ${token}`

    if (body && (method === 'POST' || method === 'PUT')) 
        options.body = body;

    try {
        res = await fetch(url, options)

        if (res.status === 403 || res.status === 401) {
            return await refreshToken(url, type, method, body)
        }
    } catch (err) {
        console.error("Fetch error:", err)
    }

    return res;
}

// provider branch - su dung cho cac component thay doi branch thi fetch lai du lieu
const BranchContext = createContext();

const BranchProvider = ({ children }) => {
    const [selectedBranchId, setSelectedBranchId] = useState(null)
    const [typeRoomId,setTypeRoomId] = useState(-1)
    const [isLoading,setIsLoading] = useState(false)
    const [isFetching,setIsFetching] = useState(false)
    const [currentScroll, setCurrentScroll] = useState(0);

    let props = {
        selectedBranchId,
        setSelectedBranchId,
        isLoading,
        setIsLoading,
        isFetching,
        setIsFetching,
        currentScroll,
        setCurrentScroll,
        typeRoomId,
        setTypeRoomId
    }

    return (
        <BranchContext.Provider value={props}>
            {children}
        </BranchContext.Provider>
    );
};
const useBranch = () => useContext(BranchContext)

export {
    apiUserService,
    apiCloudinary,
    MainStaffManager,
    MainBranchManager,
    MainHome,
    FormLogin,
    MainRoomManager,
    useBranch,
    BranchProvider,
    MainUserManager,
    MainServiceManager,
    MainBooking,
    customeFetch,
    getToken,
    getRefreshToken
}
