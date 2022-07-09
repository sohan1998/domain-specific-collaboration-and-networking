import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import './../common/button.css';
import './../common/font.css';
import './login.css';
import { Navigate } from 'react-router-dom';
import { backendIP, backendPort } from './../common/constants';

export default class Login extends Component {
    state = { email: null, password: null };

    constructor(props) {
        // Call the constructor of Super class i.e. the Component
        super(props);
        // Maintain the state required for this component
        this.state = {
            email: '',
            password: '',
            // authFlag: false,
            // loginStatus: ""
            redirect: '',
        };
        // Bind the handlers to this class
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    login = async (e) => {
        e.preventDefault();

        const payload = { email: this.state.email, password: this.state.password };
        try {
            const res = await axios.post(`http://${backendIP}:${backendPort}/user/loginUser`, payload);
            console.log(res.data);
            // localStorage.setItem("user_id", res.data._id)
            // localStorage.setItem("user_email", res.data.email)
            this.setState({
                redirect: <Navigate to='/projects' replace={true} />,
            });
        } catch (error) {
            console.log('error occured');
        }
    };

    handleEmailChange = (e) => {
        console.log(e.target.value);
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        console.log(e.target.value);
        this.setState({ password: e.target.value });
    };

    render() {
        return (
            <div className='login-wrapper'>
                {this.state.redirect}
                <div className='login-wrapper-item '>
                    <h1 style={{ fontSize: '50px' }}>
                        <div>
                            Your <span className='change-to-purple'> Circle </span> is
                        </div>
                        <div> waiting for</div>
                        <div> you! </div>
                    </h1>
                </div>
                <div className='login-wrapper-item'>
                    <Container>
                        <Form>
                            <Form.Group className='mb-3' controlId='formEmail'>
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type='email' placeholder='Enter Email' onChange={this.handleEmailChange} />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formPassword'>
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control type='password' placeholder='Enter Password' onChange={this.handlePasswordChange} />
                            </Form.Group>
                            {/* <Form.Group className='mb-3' controlId='formCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                            <Button type='submit' className='green-primary-btn' onClick={this.login}>
                                Login
                            </Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}
