import React, { Component } from 'react';
import { Button, Form, Container, NavLink } from 'react-bootstrap';
import axios from 'axios';
import './../common/button.css';
import './../common/font.css';
import './login.css';
import { Link, Navigate } from 'react-router-dom';
import { backendIP, backendPort } from './../common/constants';

export default class Login extends Component {
    // state = { email: null, password: null };

    state = {
        email: '',
        password: '',
        // authFlag: false,
        // loginStatus: ""
        redirect: null,
        message: '',
    };
    // constructor(props) {
    //     // Call the constructor of Super class i.e. the Component
    //     super(props);
    //     // Maintain the state required for this component
    //     // Bind the handlers to this class
    //     this.handleEmailChange = this.handleEmailChange.bind(this);
    //     this.handlePasswordChange = this.handlePasswordChange.bind(this);
    //     this.login = this.login.bind(this);
    // }

    login = async (e) => {
        e.preventDefault();

        const payload = { email: this.state.email, password: this.state.password };
        try {
            const res = await axios.post(`http://${backendIP}:${backendPort}/user/loginUser`, payload);
            console.log('Response: ', res.data.user);
            // Store in local storage
            localStorage.setItem('userID', res.data.user._id);
            localStorage.setItem('firstName', res.data.user.firstName);
            localStorage.setItem('lastName', res.data.user.lastName);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('schoolName', res.data.user.education.schoolName);
            localStorage.setItem('degree', res.data.user.education.degree);
            localStorage.setItem('major', res.data.user.education.major);
            localStorage.setItem('employerName', res.data.user.professionalExperience.employerName);
            localStorage.setItem('position', res.data.user.professionalExperience.position);
            localStorage.setItem('aboutMe', res.data.user.about_me);
            localStorage.setItem('skills', res.data.user.skills);

            this.setState({
                redirect: <Navigate to='/projects' replace={true} />,
            });
            // console.log('Redirecting to projects');
        } catch (error) {
            console.error(error);
        }
    };

    handleEmailChange = (e) => {
        // console.log(e.target.value);
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        // console.log(e.target.value);
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
                            <br />
                            <Button type='submit' className='green-primary-btn' onClick={this.login}>
                                Login
                            </Button>
                        </Form>
                        <br />
                        <span>
                            Don't have an account? <Link to='/register'>Register Here</Link>
                        </span>
                        {this.state.message}
                    </Container>
                </div>
            </div>
        );
    }
}
