import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';
import { getUserId, getUserRole, redirectToUserDashboard, getUsername } from '../utils/utils';
import LogoutButton from './logout';
import { ToastContainer } from 'react-toastify';
import Logo from '../img/logo-1701283916975.png'

function NavbarComponent() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');


  useEffect(() => {
    setUsername(getUsername)
    setUserId(getUserId)
    setUserRole(getUserRole)
  }, [])

  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top">
        <Container>
          <ToastContainer />
          <Navbar.Brand href="/">
            <Image src={Logo} alt="Logo" width="125em" />
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* removed redundant Home link */}
          </Nav>
          <Nav>
          {
            !userId && !userRole && !username &&
              (
                <Container>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Container>
              ) 
            }
            {
              userId && userRole === 'RESTAURANT_MANAGER' &&
                 (
                    <Container>
                      <div className="d-flex align-items-center">
                        <NavDropdown title={username} id="basic-nav-dropdown"> 
                          <NavDropdown.Item onClick={redirectToUserDashboard}>
                            Your Dashboard
                          </NavDropdown.Item>
                          <NavDropdown.Item href='/menuDashboard'>
                            Food menu dashboard
                          </NavDropdown.Item>
                          <NavDropdown.Item href='/staffDashboard'>
                            Check-in
                          </NavDropdown.Item>
                          <NavDropdown.Item href='/customerOrder'>
                            Customer order
                          </NavDropdown.Item>
                        </NavDropdown>
                        <LogoutButton />
                      </div>
                    </Container>
                  ) 
            }
            {
              userId && userRole === 'RESTAURANT_STAFF' &&
                (
                  <Container>
                  <div className="d-flex align-items-center">
                    <NavDropdown title={username} id="basic-nav-dropdown"> 
                      <NavDropdown.Item onClick={redirectToUserDashboard}>
                        Your Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item href='/staffDashboard'>
                        Check-in
                      </NavDropdown.Item>
                      <NavDropdown.Item href='/customerOrder'>
                        Customer order
                      </NavDropdown.Item>
                    </NavDropdown>
                    <LogoutButton />
                  </div>
                </Container>
                    
                ) 
            }
            {
              userId && userRole === 'RESTAURANT_WAITER' &&
                (
                    <Container>
                      <div className="d-flex align-items-center">
                        <NavDropdown title={username} id="basic-nav-dropdown"> 
                          <NavDropdown.Item onClick={redirectToUserDashboard}>
                            Your Dashboard
                          </NavDropdown.Item>
                          <NavDropdown.Item href='/staffDashboard'>
                            Check-in
                          </NavDropdown.Item>
                          <NavDropdown.Item href='/customerOrder'>
                            Customer order
                          </NavDropdown.Item>
                        </NavDropdown>
                        <LogoutButton />
                      </div>
                    </Container>
                ) 
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
