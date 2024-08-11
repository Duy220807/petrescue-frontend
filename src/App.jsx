// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login'; // Import trang đăng nhập
import AppFooter from './components/Footer';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import PostManagement from './components/admin/PostManagement';
import PetManagement from './components/admin/PetManagement';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/sign-up';

  return (
    <>
      <AppHeader hideHeader={hideHeader} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/posts" element={<PostManagement />} />
        <Route path="/admin/pets" element={<PetManagement />} />


      </Routes>
      <AppFooter />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
