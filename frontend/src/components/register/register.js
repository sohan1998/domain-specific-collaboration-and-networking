import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import '../common/CirclesButton';
import { Navigate } from 'react-router-dom';
import './register.css';
import { backendIP, backendPort } from './../common/constants';

export default class Register extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            redirect: '',
        };
        // Bind the handlers to this class
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    }

    // API call for the final registration page
    // register = async (e) => {
    //     e.preventDefault();

    //     const payload = {
    //         first_name: this.state.first_name,
    //         last_name: this.state.last_name,
    //         email: this.state.email,
    //         password: this.state.password,
    //     };
    //     try {
    //         // const res = await axios.post(`http://${backendIP}:${backendPort}/user/registerUser`, payload);
    //         // console.log(res.data);
    //         // localStorage.setItem("user_id", res.data._id)
    //         // localStorage.setItem("user_email", res.data.email)

    //         console.log('SUBMITTING');
    //         // store state variables in local storage
    //         localStorage.setItem('firstName', this.state.first_name);
    //         localStorage.setItem('lastName', this.state.last_name);
    //         localStorage.setItem('email', this.state.email);
    //         localStorage.setItem('password', this.state.password);

    //         this.setState({
    //             redirect: <Navigate to='/registerUserInfo' replace={true} />,
    //         });
    //     } catch (error) {
    //         console.log('error occured');
    //     }
    // };

    componentDidMount() {
        const { history } = this.props;
    }
    firstNameChangeHandler = (e) => {
        this.setState({
            first_name: e.target.value,
        });
    };
    lastNameChangeHandler = (e) => {
        this.setState({
            last_name: e.target.value,
        });
    };
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    submit = (e) => {
        console.log('SUBMITTING');
        // store state variables in local storage
        localStorage.setItem('firstName', this.state.first_name);
        localStorage.setItem('lastName', this.state.last_name);
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('password', this.state.password);
        // logic to go to next page
        this.setState({
            redirect: <Navigate to='/registerUserInfo' replace={true} />,
        });
    };

    // 3rd page:
    // submit = async (e) => {
    //     // create payload dictionary
    //     // populate payload dictionary: eg: payload['firstName'] = localStorage.getItem("firstName")
    //     // send to backend: const response = await axios.post("URL", payload)
    //     // take further action: redirect to next page
    // }

    render() {
        console.log('RENDERING');
        return (
            <div className='register-wrapper'>
                {this.state.redirect}
                <div className='register-wrapper-item '>
                    <h1 style={{ fontSize: '50px' }}>
                        <div> Let's find a </div>
                        <div>
                            <span className='change-to-purple'> Circle </span> for you!
                        </div>
                    </h1>
                </div>
                <div className='register-wrapper-item'>
                    <Container className='mt-3'>
                        {/* <Form> */}
                        <Form.Group className='mb-3' controlId='formFirstName'>
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control type='firstName' placeholder='Enter First Name' onChange={this.firstNameChangeHandler} />
                            {/* <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text> */}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formLastName'>
                            {/* <Form.Label>Last Name</Form.Label> */}
                            <Form.Control type='lastName' placeholder='Enter Last Name' onChange={this.lastNameChangeHandler} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formEmail'>
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control type='email' placeholder='Enter Email' onChange={this.emailChangeHandler} />
                            {/* <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text> */}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formPassword'>
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type='password' placeholder='Enter Password' onChange={this.passwordChangeHandler} />
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        <Button variant='success' type='submit' className='green-primary-btn' onClick={this.submit}>
                            Next
                        </Button>
                        {/* </Form> */}
                    </Container>
                </div>
            </div>
        );
    }
}
