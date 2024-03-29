import { getUser, logout } from "@/services/localstorage";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    logout()
    window.location.reload();
  };

  useEffect(() => {
    const data = getUser();
    setUser(data)
  }, []);

  return (
    <Navbar className="bg-dark mb-3">
        <Container>
          <Navbar.Brand href="/" className='text-light'>Book Store</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            {user && (
              <Nav className="me-auto">
                <Nav.Link href="#home" className='text-light'>My Order</Nav.Link>
                <Nav.Link className='text-light' onClick={onLogout}>Logout</Nav.Link>
              </Nav>
            )}
            
            {user === null && (
              <Navbar.Text className='text-light'>
                <Nav.Link href="/login" className='text-light'>Login</Nav.Link>
              </Navbar.Text>
            )}
            {user && (
              <Navbar.Text className='text-light'>
                <a href="#login" className='text-light'>{user.email} (Point: {user.point})</a>
              </Navbar.Text>
            )}
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};