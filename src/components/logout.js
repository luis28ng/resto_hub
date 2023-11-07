import React from 'react';
import { Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const logout = () => {
    console.log('Logout function called');

    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userRestId')

    toast.success('Logged out successfully', {
      position: toast.POSITION.TOP_RIGHT,
      onClose: () => {
        console.log('Toast closed'); // Add this line
      }
    });
    
    // Redirect the user to the login page
    setTimeout(() => {
      window.location.href = '/';
  }, 2000);

  
  };
  
  return (
    <Nav>
        <Nav.Link on onClick={logout}>Logout</Nav.Link>
    </Nav>
  );
};

export default LogoutButton;