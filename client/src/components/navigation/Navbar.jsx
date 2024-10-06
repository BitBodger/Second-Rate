import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if a token exists in localStorage to determine if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to home page after logout
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-links">
          <Link to="/">✪SECOND-RATE✪</Link>
          <Link to="/users">Users</Link>
        </div>  
      </div>
      
      <div className="navbar-right">
        {/* Conditionally render the Login or Logout link based on login status */}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
