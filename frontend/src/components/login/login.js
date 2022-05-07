import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './../common/button.css';

export default class Login extends Component {
    render() {
        return (
            <div>
                <Container className='mt-3'>
                    <Form>
                        <Form.Group className='mb-3' controlId='formEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' />
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='formCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        <Button type='submit' className='custom-btn'>
                            Login
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}
