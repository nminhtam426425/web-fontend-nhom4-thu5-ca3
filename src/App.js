import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Home,ManagerBranches,ManagerStaff,ManagerTypeRoom,Login,Logout,ManagerUser,ManagerService} from './res/page'
import ProtectedRoute from './res/ProtectRoute'
import './index.css'

function App() {
  const routers = [
    {
      path:'/',
      element:Home
    },
    {
      path:'/branches',
      element:ManagerBranches
    },
    {
      path:'/staff',
      element:ManagerStaff
    },
    {
      path:'/typeRoom',
      element:ManagerTypeRoom
    },
    {
      path:'/logout',
      element:Logout
    },
    {
      path:'/user',
      element:ManagerUser
    },
    {
      path:'/service',
      element:ManagerService
    }
  ]
  return <BrowserRouter>
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {
          routers.map((route,index) => 
            <Route key={index} path={route.path} element={<route.element/>}/>
          )
        }
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App;
