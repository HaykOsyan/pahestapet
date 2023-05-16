import React, { useContext, useState } from 'react';
import {Form, Container, FormControl, Button, Row, NavLink} from 'react-bootstrap'
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer ( () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data)  
            user.setIsAuth(true)
            navigate(ADMIN_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    return (
        <Container className='d-flex justify-content-center mt-3'>
            <Form className='w-50'>
                <FormControl
                     type="email"
                     placeholder="Enter email"
                     className='my-3'
                     value = {email}
                     onChange = {e => setEmail(e.target.value)}
                />
                <FormControl
                     type="password"
                     placeholder="Password"
                     className='my-3'
                     value = {password}
                     onChange = {e => setPassword(e.target.value)}
                />
                <Row className='d-flex justify-content-around'>
                    {isLogin?
                        <div className='d-flex'>
                            No Account? <NavLink href={REGISTRATION_ROUTE}>Register</NavLink>
                        </div>
                        :
                        <div className='d-flex'>
                            Have an Account? <NavLink href={LOGIN_ROUTE}>Login</NavLink>
                        </div>
                    }
                    
                     <Button
                        variant='outline-primary'
                        onClick={click}
                     >
                        {isLogin? 'Login' : 'Register'}
                    </Button>
                </Row>
               
            </Form>
        </Container>
    );
});

export default Auth;