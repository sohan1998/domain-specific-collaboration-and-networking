import React, { Component } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import Button from '@mui/material/Button';
import './../common/button.css';
import './../common/font.css';
// import './login.css';
import { Navigate } from 'react-router-dom';
import { backendIP, backendPort } from './../common/constants';
// import Background from './Desktop.svg';

export default class LandingPage extends Component {
    // handleEmailChange = (e) => {
    //     console.log(e.target.value);
    //     this.setState({ email: e.target.value });
    // };

    // handlePasswordChange = (e) => {
    //     console.log(e.target.value);
    //     this.setState({ password: e.target.value });
    // };
    state = { redirect: '' };

    // componentDidMount() {

    //         if (!localStorage.getItem('userID')) {
    //             this.setState({ redirect: <Navigate to='/login' replace={true} /> });
    //         }
    //     }

    buttonOnClick = (e) => {
        this.setState({ redirect: <Navigate to='/login' replace={true} /> });
    };

    render() {
        return (
            <div className='landing'>
                {this.state.redirect}
                {/* <Row>
                    <br />
                </Row>
                <Row>
                    <br />
                </Row>
                <Row>
                    <br />
                </Row> */}
                {/* <Row> */}
                <Button
                    variant='contained'
                    sx={{
                        width: '100px',
                        position: 'absolute',
                        top: '70px',
                        right: '50px',
                        backgroundColor: '#7BFB9F',
                        borderRadius: '20px',
                        borderColor: '#7BFB9F',
                        color: 'black',
                    }}
                    onClick={(e) => this.buttonOnClick(e)}
                >
                    Login
                </Button>
                {/* </Row> */}
            </div>
        );
    }
}
