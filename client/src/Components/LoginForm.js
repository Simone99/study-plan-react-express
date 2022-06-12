import { useState, useContext } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {logIn} from '../API';
import UserContext from "../Context/UserContext";

function LoginForm(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userState = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        const handleLoginAsync = async() => {
            try {
                const user = await logIn({username:email, password});
                userState.setLoggedUser(user);
                props.setToastData({show : true, title : `Welcome ${user.name}!`, message : `Now you're ready to edit your study plan!`});
                navigate('/');
            }catch(err) {
                console.log(err);
                props.setToastData({show : true, title : `Error!`, message : `Incorrect username and/or password.`});
            }    
        };
        event.preventDefault();
        handleLoginAsync();
    };

    return(
        <Row /*bg = 'dark' text = 'white' */className="justify-content-md-center">
            {/*<Card.Title>Login Form</Card.Title>*/}
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = 'email' required = {true} value = {email} onChange = {(event) => setEmail(event.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type = 'password' required = {true} value = {password} onChange = {(event) => setPassword(event.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Button variant='success' type='submit'>Login</Button>
                </Form.Group>
            </Form>
        </Row>
    );
}

export{LoginForm};