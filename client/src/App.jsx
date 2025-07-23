import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import ContactUs from "./components/pages/ContactUs";
import AboutUs from "./components/pages/AboutUs";
import Login from "./components/pages/Login";
import PageNotFound from "./components/pages/PageNotFound";
import Register from "./components/pages/Register";
import Dashboard from "./components/user/UserDashboard";
import Private from "./components/routes/Private";
import Spinner from "./components/Spinner";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ForgotPassword from "./components/ForgotPassword";
import AdminRoute from "./components/routes/AdminRoute";
import Category from "./components/Admin/Category";
import User from "./components/Admin/User";
import CreateProduct from "./components/Admin/CreateProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Search from "./components/pages/Search";
import ProductDetails from "./components/pages/ProductDetails";
import CartPage from "./components/pages/CartPage";
import UserProfile from "./components/pages/UserProfile";
import UserOrder from "./components/user/UserOrder";
import Order from "./components/pages/Order";
import AdminOrder from "./components/Admin/AdminOrder";
function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Private />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<Order />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admin-category" element={<Category />} />
          <Route path="update-product/:slug" element={<UpdateProduct />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="user" element={<User />} />
          <Route path="allorders" element={<AdminOrder />} />
        </Route>

        {/* Catch All Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
