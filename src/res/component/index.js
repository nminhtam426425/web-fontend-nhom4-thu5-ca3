import MainStaffManager from "./Main/MainStaffManager"
import MainBranchManager from "./Main/MainBranchManager"
import MainHome from "./Main/MainHome"
import FormLogin from "./Form/FormLogin"
import MainRoomManager from "./Main/MainRoomManager"
import MainUserManager from "./Main/MainUserManager"
import MainServiceManager from "./Main/MainServiceManager"
import { createContext, useState, useContext } from 'react';

const apiUserService = {
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081"
}

const apiCloudinary = {
    preset: process.env.REACT_APP_PRESET,
    cloudName: process.env.REACT_APP_CLOUD_NAME
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

export {apiUserService,apiCloudinary,MainStaffManager,MainBranchManager,MainHome,FormLogin,MainRoomManager,useBranch,BranchProvider,MainUserManager,MainServiceManager}
