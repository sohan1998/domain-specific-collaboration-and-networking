import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './../common/button.css';
import './../common/font.css';
import './login.css';

export default class Login extends Component {
    render() {
        return (
            <div className='login-wrapper'>
                <div className='login-wrapper-item '>
                    <h1 style={{ fontSize: '50px' }}>
                        <div>
                            Your <span className='change-to-purple'> Circle </span> is
                        </div>
                        <div> waiting for</div>
                        <div> you!</div>
                    </h1>
                </div>
                <div className='login-wrapper-item'>
                    <Container>
                        <Form>
                            <Form.Group className='mb-3' controlId='formEmail'>
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type='email' placeholder='Enter Email' />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formPassword'>
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control type='password' placeholder='Enter Password' />
                            </Form.Group>
                            {/* <Form.Group className='mb-3' controlId='formCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                            <Button type='submit' className='green-primary-btn'>
                                Login
                            </Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}
