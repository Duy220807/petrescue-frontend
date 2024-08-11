// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login'; // Import trang đăng nhập
import AppFooter from './components/Footer';
import SignUp from './pages/SignUp';

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
