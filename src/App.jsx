import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import DashboardLayout from "./pages/dashboard/DashboardLayout"
import Header from "./components/shared/Header"
import TablesPage from "./pages/dashboard/admin/TablesPage"
import WaiterMenagament from "./pages/dashboard/admin/WaiterMenagament"
import Products from "./pages/dashboard/admin/Products"




function App() {
  return (
    <Router>
      <Header/>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/DashboardLayout" element={<DashboardLayout/>}/> 
      <Route path="/TablesPage" element={<TablesPage/>}/> 
      <Route path="/WaiterMenagament" element={<WaiterMenagament/>}/> 
      <Route path="/Products" element={<Products/>}/> 


      
         </Routes>
  </Router>    
   
  )
}

export default App
