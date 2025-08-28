import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import TablesPage from "./pages/dashboard/admin/TablesPage";
import WaiterMenagament from "./pages/dashboard/admin/WaiterMenagament";
import Products from "./pages/dashboard/admin/Products";
import { Toaster } from "sonner";
import PrivateRoute from "./lib/PrivateRoute";
import Header from "./components/shared/Header";

function App() {
  return (
    <Router>
            <Header />

      {/* Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/DashboardLayout" element={<DashboardLayout />} />
          <Route path="/TablesPage" element={<TablesPage />} />
          <Route path="/WaiterMenagament" element={<WaiterMenagament />} />
          <Route path="/Products" element={<Products />} />
        </Route>
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
