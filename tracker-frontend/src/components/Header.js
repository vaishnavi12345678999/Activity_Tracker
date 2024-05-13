import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  // Check if there is a token in the localStorage
  const token = localStorage.getItem('authToken');
  
  // Logout function to clear token and redirect
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    if (location.pathname === '/') {
        window.location.reload();  // Force a refresh if already at the home page
      }
      else{
        navigate('/');
      }
  };

  useEffect(() => {
    console.log("authToken", token);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 text-lg flex justify-between items-center">
      <a href="/" className="flex items-center">
        <img src="icon.png" alt="Activity Tracker Logo" className="h-12 w-12 mr-2" />
        <div className='ml-2 text-2xl'>Activity Tracker</div>
      </a>
      {token && (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
