import React, { useState } from 'react';
import './app.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Package from './Components/Package/Package';
import Overall from './Components/Overall/Overall';
import About from './Components/About/About';
import Review from './Components/Review/Review';
import Footer from './Components/Footer/Footer';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Order from './Components/Order/order';
import Logout from './Components/Logout/Logout';
import FloatingButton from './Components/FloatingButton/FloatingButton';
import { UserProvider } from './context/userContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Router>
      <UserProvider>
        {showLogin && <Login setShowLogin={setShowLogin} />}
        {showLogout && <Logout setShowLogout={setShowLogout} />}
        <AppContent setShowLogin={setShowLogin} setShowLogout={setShowLogout} />
      </UserProvider>
    </Router>
  );
};

const AppContent = ({ setShowLogin, setShowLogout }) => {
  return (
    <>
      <Navbar setShowLogin={setShowLogin} setShowLogout={setShowLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Package />} />
        <Route path="/package" element={<Overall />} />
        <Route path="/benefit" element={<About />} />
        <Route path="/blog" element={<Review />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
      <FloatingButton setShowLogin={setShowLogin} />
    </>
  );
};

export default App;
