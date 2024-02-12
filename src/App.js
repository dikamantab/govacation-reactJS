import React from 'react';
import './app.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Package from './Components/Package/Package';
// import Offer from './Components/Offer/Offer';
import Overall from './Components/Overall/Overall';
import About from './Components/About/About';
import Review from './Components/Review/Review';
import Footer from './Components/Footer/Footer';
import Register from './Components/Register/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Package />} />
          <Route path="/package" element={<Overall />} />
          <Route path="/benefit" element={<About />} />
          <Route path="/blog" element={<Review />} />
        </Routes>
        <Footer />
    </Router>
    
  );
}

export default App;
