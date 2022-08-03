import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import './../common/button.css';
import './../common/font.css';
// import './login.css';
import { Navigate } from 'react-router-dom';
import { backendIP, backendPort } from './../common/constants';
import Background from './Desktop.svg';

export default class LandingPage extends Component {
    // handleEmailChange = (e) => {
    //     console.log(e.target.value);
    //     this.setState({ email: e.target.value });
    // };

    // handlePasswordChange = (e) => {
    //     console.log(e.target.value);
    //     this.setState({ password: e.target.value });
    // };

    render() {
        return <div className='login-wrapper' style={{ backgroundImage: `url(${Background})`, width: '100%' }}></div>;
    }
}
