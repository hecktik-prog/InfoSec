import React from 'react'
import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Nav} from 'react-bootstrap'
import { logout } from '../redux/features/auth/authSlice'

export const NavBar = () => {
    const {submitted} = useSelector((state) => state.auth)
    const dispatch = useDispatch(logout())
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={'/'}>InfoSec</NavLink>
                {submitted ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logoutHandler()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} 
                        onClick={() => navigate('/login')}
                        >
                            Войти
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
}