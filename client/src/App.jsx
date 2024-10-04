import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Navbar from './components/navigation/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
