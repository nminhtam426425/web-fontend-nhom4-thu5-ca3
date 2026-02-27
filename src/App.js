import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Home} from './res/page'
function App() {
  const routers = [
    {
      path:'/',
      element:Home
    }

  ]
  return <BrowserRouter>
    <Routes>
      {
        routers.map((route,index) => 
           <Route key={index} path={route.path} element={<route.element/>}/>
        )
      }
    </Routes>
  </BrowserRouter>
}

export default App;
