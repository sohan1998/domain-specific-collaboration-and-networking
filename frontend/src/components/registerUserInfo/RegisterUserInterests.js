import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './registerUserInfo.css';
import './../common/button.css';
import './../common/font.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { backendIP, backendPort } from './../common/constants';
import { CircularBackdrop } from '../common/CircularBackdrop';

export const RegisterUserInterests = () => {
    const [interests, setInterests] = useState({});
    const navigate = useNavigate();
    // const [interest1, setInterest1] = useState();

    const handleSliderValueChange = (interest, value) => {
        let newInterest = { ...interests, [interest]: value };
        setInterests(newInterest);
        console.log(interests);
    };

    // const IOSSlider = styled(Slider)(({ theme }) => ({
    //     color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    //     height: 2,
    //     padding: '15px 0',
    //     '& .MuiSlider-thumb': {
    //         height: 28,
    //         width: 28,
    //         backgroundColor: '#fff',
    //         boxShadow: iOSBoxShadow,
    //         '&:focus, &:hover, &.Mui-active': {
    //             boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
    //             // Reset on touch devices, it doesn't add specificity
    //             '@media (hover: none)': {
    //                 boxShadow: iOSBoxShadow,
    //             },
    //         },
    //     },
    //     '& .MuiSlider-valueLabel': {
    //         fontSize: 12,
    //         fontWeight: 'normal',
    //         top: -6,
    //         backgroundColor: 'unset',
    //         color: theme.palette.text.primary,
    //         '&:before': {
    //             display: 'none',
    //         },
    //         '& *': {
    //             background: 'transparent',
    //             color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    //         },
    //     },
    //     '& .MuiSlider-track': {
    //         border: 'none',
    //     },
    //     '& .MuiSlider-rail': {
    //         opacity: 0.5,
    //         backgroundColor: '#bfbfbf',
    //     },
    //     '& .MuiSlider-mark': {
    //         backgroundColor: '#bfbfbf',
    //         height: 8,
    //         width: 1,
    //         '&.MuiSlider-markActive': {
    //             opacity: 1,
    //             backgroundColor: 'currentColor',
    //         },
    //     },
    // }));

    const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

    const marks = [
        {
            value: 0,
            label: 0,
        },
        {
            value: 1,
            label: 1,
        },
        {
            value: 2,
            label: 2,
        },
        {
            value: 3,
            label: 3,
        },
        {
            value: 4,
            label: 4,
        },
        {
            value: 5,
            label: 5,
        },
    ];

    const interestCategories = [
        'Full-Stack Development',
        'Machine Learning',
        'Deep Learning',
        'Data Science',
        'Software Testing',
        'Product Management',
        'Project Management',
        'Cloud Computing',
        'Backend Development',
        'UIUX Design',
        'DevOps Domain',
    ];

    const registerAPI = async (payload) => {
        // console.log(JSON.stringify(payload));
        try {
            // console.log(JSON.stringify(payload));
            const response = await axios.post(`http://${backendIP}:${backendPort}/user/registerUser`, payload);
            // console.log('API call successful');
            // console.log(response.data);
            // console.log(response.data._id);
            localStorage.setItem('userID', response.data._id);
        } catch (error) {
            console.error(error);
        }
    };

    const createAccountHandler = (e) => {
        console.log('SUBMITTING');
        // const db = {
        //     "name": "Slowhan"
        // }
        //
        // get state variables from local storage
        let payload = {};
        let education = {};
        let professionalExperience = {};

        try {
            console.log('ENTERING BACKDROP');
            // <CircularBackdrop transitionDuration={5000} />;
            payload['firstName'] = localStorage.getItem('firstName');
            payload['lastName'] = localStorage.getItem('lastName');
            payload['email'] = localStorage.getItem('email');
            payload['password'] = localStorage.getItem('password');
            education['schoolName'] = localStorage.getItem('schoolName');
            education['degree'] = localStorage.getItem('degree');
            education['major'] = localStorage.getItem('major');
            education['startDate'] = '01/27/2021';
            education['endDate'] = '01/27/2022';
            payload['education'] = education;
            professionalExperience['employerName'] = localStorage.getItem('employerName');
            professionalExperience['position'] = localStorage.getItem('position');
            professionalExperience['startDate'] = '05/15/2021';
            professionalExperience['endDate'] = '07/10/2022';
            payload['professionalExperience'] = professionalExperience;
            payload['about_me'] = localStorage.getItem('aboutMe');
            payload['skills'] = JSON.parse(localStorage.getItem('searchSkills'));
            payload['interests'] = interests;
            // console.log('Calling API');
            registerAPI(payload);
            // console.log('SUCCESS');
            console.log(payload);
            navigate('/connections');
        } catch (error) {
            console.log(error);
        }

        // try {
        //     response = await axios.get(`http://${backendIP}:${backendPort}/user/registerUser`);
        //     console.log(response.data);
        // } catch (error) {
        //     console.log(error);
        // }

        // if (response.data.message !== 'User Already Exists!') {

        // logic to go to next page
        // navigate('/connections');
        // } else {
        //     alert('Email ID already exists');
        //     return;
        // }
        // <Link to='/connections' />;
    };

    return (
        <div className='container'>
            <br></br>
            <div>
                <h1 style={{ fontSize: '50px' }}>
                    What are your <span className='change-to-purple'> Interests </span> ?
                </h1>
            </div>
            <div>
                <h5>It helps us find a perfect circle for you</h5>
            </div>
            <br></br>
            <br></br>
            <div>
                {interestCategories.map((interest) => {
                    return (
                        <div key={interest} className='interest-wrapper'>
                            <div>
                                <h5>{interest}</h5>
                                <br />
                                <br />
                            </div>
                            <div className='slider-wrapper'>
                                <Slider
                                    aria-label='Always visible'
                                    min={0}
                                    max={5}
                                    step={1}
                                    defaultValue={0}
                                    marks={marks}
                                    valueLabelDisplay='auto'
                                    key={interest}
                                    onChange={
                                        (e) => handleSliderValueChange(interest, e.target.value)
                                        // setInterests({ ...interests, [interest]: e.target.value });
                                        // console.log({ ...interests }, interest, e.target.value);
                                    }
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* {console.log(interests)} */}
            <div>
                {/* <div> */}
                {/* <Container className='mt-3'> */}
                <Form>
                    {/* <Form.Group className='mb-3' controlId='formAboutMe'> */}
                    {/* <Form.Label>First Name</Form.Label> */}
                    {/* <Form.Control as='textarea' placeholder='About Me' rows={5} onChange={this.aboutMeChangeHandler} /> */}
                    {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                    {/* </Form.Group> */}
                    {/* <Form.Group className='mb-3' controlId='formSearch'> */}
                    {/* <Form.Label>major address</Form.Label> */}
                    {/* <Form.Control type='string' placeholder='Search Interests' onChange={this.onChangeSearchHandler} /> */}
                    {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                    {/* </Form.Group> */}
                    {/* <Form.Group className='mb-3' controlId='formPassword'> */}
                    {/* <Form.Label>Password</Form.Label> */}
                    {/* <Form.Control type='password' placeholder='Enter Password' onChange={this.passwordChangeHandler} /> */}
                    {/* </Form.Group> */}
                    {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                    {/* <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            options={searchSkills}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label='Search Skills' />}
                        /> */}
                    <Button variant='success' type='submit' className='green-primary-btn' onClick={createAccountHandler}>
                        Register
                    </Button>
                </Form>
                {/* </Container> */}
                {/* </div> */}
            </div>
        </div>
    );
};
