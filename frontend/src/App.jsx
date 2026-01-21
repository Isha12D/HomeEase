import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import Home from "./Pages/Home";
import ServicePage from "./Components/ServicePage";
import AdminLayout from "./Layout/AdminLayout";
import AddService from "./Components/Admin/AddService";
import LoginForm from "./Components/LoginForm";
import { AdminContext } from "./Context/AdminContext";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import { useAuth } from "./Context/AuthContext";


const ProtectedUserRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useContext(AdminContext);
  if (!admin) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/orders" element={ <Orders /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>

        {/* Admin login */}
        <Route path="/admin/login" element={<LoginForm />} />

        {/* Admin protected routes */}
        <Route element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
          <Route path="/admin/add-service" element={<AddService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
