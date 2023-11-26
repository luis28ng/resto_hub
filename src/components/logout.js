import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Spinner from './common/Spinner';

const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        setIsLoading(true);

        try {
            // Simulating asynchronous logout logic
            await new Promise(resolve => setTimeout(resolve, 500));

            // Remove local storage items
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userRestId');



            // Redirect the user to the login page
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);

            toast.success('Logged out successfully', {
                position: toast.POSITION.TOP_RIGHT,

            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Nav>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
            {isLoading && (
                <div className="overlay">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default LogoutButton;
