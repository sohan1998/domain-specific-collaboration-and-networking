import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import '../common/CirclesButton';
import { Link, Navigate, NavLink } from 'react-router-dom';
import './register.css';
import { backendIP, backendPort } from './../common/constants';
import axios from 'axios';
import { CircularBackdrop } from './../common/CircularBackdrop';
import { Backdrop } from '@mui/material';
import ReactS3 from 'react-s3';

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
            // profile_picture: '',
            // profile_picture_file: '',
            redirect: '',
        };
        // Bind the handlers to this class
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        // this.profilePictureChangeHandler = this.profilePictureChangeHandler.bind(this);
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

    // profilePictureChangeHandler = (e) => {
    //     const file = e.target.files[0];
    //     console.log(file);

    //     this.setState({
    //         profile_picture_file: file,
    //     });
    // };

    // uploadImageToS3 = async () => {
    //     if (this.state.profile_picture_file) {
    //         try {
    //             const data = await ReactS3.uploadFile(this.state.profile_picture_file, s3_config);
    //             this.setState({
    //                 profile_picture: data.location,
    //             });
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    submit = async (e) => {
        console.log('SUBMITTING');
        <CircularBackdrop />;

        // if API -- success
        // then store in localStorage
        // else alert "Email already exists"
        let response;
        try {
            response = await axios.get(`http://${backendIP}:${backendPort}/user/validateRegisteredUser?email=${this.state.email}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        if (response.data.message !== 'User Already Exist') {
            // store state variables in local storage
            localStorage.setItem('firstName', this.state.first_name);
            localStorage.setItem('lastName', this.state.last_name);
            localStorage.setItem('email', this.state.email);
            localStorage.setItem('password', this.state.password);
        } else {
            alert('Email ID already exists');
            return;
        }
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
                            <Form.Control type='password' placeholder='Enter Password' onChange={this.passwordChangeHandler} />
                        </Form.Group>
                        {/* <br />
                        <br /> */}
                        {/* <Form.Group className='mb-3' controlId='formProfilePicture'> */}
                        {/* <Form.Label> */}
                        {/* <b>Please upload your profile picture </b> */}
                        {/* </Form.Label> */}
                        {/* <Form.Control type='file' onChange={this.profilePictureChangeHandler} /> */}
                        {/* <Form.Check type='checkbox' label='Check me out' /> */}
                        {/* </Form.Group> */}
                        <br />
                        {/* <span>
                            Already have an account?
                            <Link>Click here</Link>
                        </span> */}
                        <Button variant='success' type='submit' className='green-primary-btn' onClick={this.submit}>
                            Next
                        </Button>
                        {/* </Form> */}
                        <br />
                        <br />
                        <span>
                            Already have an account? <Link to='/login'>Click here</Link>
                        </span>
                    </Container>
                </div>
            </div>
        );
    }
}
