import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './../common/button.css';

export default class Register extends Component {
    render() {
        return (
            <div>
                <Container className='mt-3'>
                    <Form>
                        <Form.Group className='mb-3' controlId='formFirstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='firstName' placeholder='Enter First Name' />
                            {/* <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text> */}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formLastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='lastName' placeholder='Enter Last Name' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' />
                            {/* <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text> */}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' />
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        <Button variant='success' type='submit' className='green-primary-btn'>
                            Sign Up
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}
