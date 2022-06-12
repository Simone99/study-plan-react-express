import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import { logout } from '../API';
import UserContext from '../Context/UserContext';

function CourseNavBar(props){
    const userState = useContext(UserContext);
    const navigate = useNavigate();
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Study Plan</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                    <Button variant = "link" className='nav-link' onClick={() => {
                        if(userState.loggedUser){
                            const handleLogoutAsync = async() => {
                                await logout();
                                props.setToastData({show:true, title:`Goodbye ${userState.loggedUser.name}!`, message:'I hope to see you soon!'});
                                userState.setLoggedUser('');
                                navigate('/');
                            };
                            handleLogoutAsync();
                        }else{
                            navigate('/login');
                        }
                    }}>{userState.loggedUser? 'Logout' : 'Login'}</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export{CourseNavBar};