import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { ADMIN_ROUTE, CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';

const NavBar = () => {

  const {user} = useContext(Context)
  const history = useNavigate()
  const logOut = () => {
    localStorage.setItem('token', '')
    user.setUser({})
    user.setIsAuth(false)
    history(HOME_ROUTE)
}
    return (
        <Navbar bg="success" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">LTE-logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              {user.isAuth?
                    <Nav className="me-auto">
                      <NavLink to={CART_ROUTE}>Cart</NavLink>
                        <Button 
                            className="mr-3" 
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}
                        >
                            Admin Panel                            
                        </Button>
                        <Button 
                            className="mr-3" 
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE +'/adding_page')}
                        >
                            Adding Page                            
                        </Button>
                        <Button 
                            variant={"outline-light"}
                            onClick={() => logOut()}
                        >
                            Logout
                        </Button>
                    </Nav>
                    :
                    <Nav className="me-auto">
                        <Button onClick={() => history(LOGIN_ROUTE)} variant={"outline-light"}>Login</Button>
                    </Nav>
                } 
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
};

export default NavBar;