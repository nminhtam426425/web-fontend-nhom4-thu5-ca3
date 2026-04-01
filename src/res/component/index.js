import MainStaffManager from "./Main/MainStaffManager"
import MainBranchManager from "./Main/MainBranchManager"
import MainHome from "./Main/MainHome"
import FormLogin from "./Form/FormLogin"
import MainRoomManager from "./Main/MainRoomManager"
import MainUserManager from "./Main/MainUserManager"
import MainServiceManager from "./Main/MainServiceManager"
import { createContext, useState, useContext } from 'react';

const apiUserService = ({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8081"
})

// provider branch - su dung cho cac component thay doi branch thi fetch lai du lieu
const BranchContext = createContext();

const BranchProvider = ({ children }) => {
    const [selectedBranchId, setSelectedBranchId] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [isFetching,setIsFetching] = useState(false)

    return (
        <BranchContext.Provider value={{ selectedBranchId, setSelectedBranchId,isLoading,setIsLoading,isFetching,setIsFetching }}>
            {children}
        </BranchContext.Provider>
    );
};
const useBranch = () => useContext(BranchContext)

export {apiUserService,MainStaffManager,MainBranchManager,MainHome,FormLogin,MainRoomManager,useBranch,BranchProvider,MainUserManager,MainServiceManager}
