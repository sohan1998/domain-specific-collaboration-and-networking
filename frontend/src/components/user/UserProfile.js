import React, { useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from './../common/constants';
import { Button, FormControl, Input } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export const UserProfile = (props) => {
    const [profile, setProfile] = useState({});
    const [showModal, setShowModal] = useState(false);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const userProfile = await axios.get(`http://${backendIP}:${backendPort}/profile/getUserProfile?_id=${userID}`);
            // console.log(userProfile.data);
            setProfile(userProfile.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleModalOnHide = () => {
        setShowModal(false);
    };

    const handleModalOnShow = () => {
        setShowModal(true);
    };

    const EditButton = () => {
        return (
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Button variant='contained' sx={{ backgroundColor: '#6053F1' }} aria-label='edit'>
                    EDIT
                </Button>
            </Box>
        );
    };

    const handleInput = (e) => {
        console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, [e.target.firstName]: e.target.value });
    };

    const handleEditForm = async (e) => {
        e.preventDefault();
        try {
            console.log('Data for update: ', profile);
            const response = await axios.put(`http://${backendIP}:${backendPort}/profile/editUserDetails`, profile);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Container className='mt-3'>
                <div align='right'>
                    <br />
                    {EditButton()}
                    <br />
                </div>
                {/* <Form onSubmit={handleEditForm}>  */}
                <div>
                    <h3>Personal Information</h3>
                    <br />
                    <Form.Group className='mb-3' controlId='updateFirstName'>
                        <Form.Control type='text' value={profile.firstName} placeholder='First Name' onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='updateLastName'>
                        <Form.Control type='text' value={profile.lastName} placeholder='Last Name' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='updateEmail'>
                        <Form.Control type='email' value={profile.email} placeholder='Email' disabled />
                    </Form.Group>
                </div>
                <div>
                    <br />
                    <h3>Education</h3>
                    <br />
                    <Form.Group className='mb-3' controlId='updateSchoolName'>
                        <Form.Control type='text' placeholder='School Name' onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='updateLastName'>
                        <Form.Control type='text' placeholder='Last Name' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='updateEmail'>
                        <Form.Control type='email' placeholder='Email' disabled />
                    </Form.Group>
                </div>
            </Container>
        </div>
    );
};
