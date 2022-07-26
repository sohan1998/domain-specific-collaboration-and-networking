import React, { useEffect, useState } from 'react';
import { Form, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from './../common/constants';
import { Button, FormControl, Input } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import './../common/button.css';

export const UserProfile = (props) => {
    const [profile, setProfile] = useState({});
    const [showModal, setShowModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const userProfile = await axios.get(`http://${backendIP}:${backendPort}/profile/getUserProfile?_id=${userID}`);
            // console.log(userProfile.data);
            setProfile(userProfile.data);
            // console.log(profile);
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

    const handleInputFirstName = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, firstName: e.target.value });
        // console.log("PROFILE: ", profile);
    };

    const handleInputLastName = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, lastName: e.target.value });
    };

    const handleInputSchoolName = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, education: { ...profile.education, schoolName: e.target.value } });
    };

    const handleInputDegree = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, education: { ...profile.education, degree: e.target.value } });
    };

    const handleInputMajor = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, education: { ...profile.education, major: e.target.value } });
    };

    const handleInputEmployerName = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, professionalExperience: { ...profile.professionalExperience, employerName: e.target.value } });
    };

    const handleInputPosition = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, professionalExperience: { ...profile.professionalExperience, position: e.target.value } });
    };

    const handleInputAboutMe = (e) => {
        // console.log(e.target.firstName, ' : ', e.target.value);
        setProfile({ ...profile, about_me: e.target.value });
    };

    // const handleInput = (e) => {
    //     // console.log(e.target.firstName, ' : ', e.target.value);
    //     setProfile({ ...profile, [e.target.firstName]: e.target.value });
    // };

    const submitEditedForm = async (e) => {
        e.preventDefault();
        try {
            // console.log('Data for update: ', profile);
            const response = await axios.put(`http://${backendIP}:${backendPort}/profile/editUserDetails`, profile);
            setShowModal(false);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    let renderInfo;
    if (profile.education) {
        renderInfo = (
            <Container className='mt-3'>
                <Modal show={showModal} onHide={handleModalOnHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>EDIT FORM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div align='right'>
                    <br />
                    {EditButton()}
                    <br />
                </div> */}
                        {/* <Form onSubmit={handleEditForm}>  */}
                        <div>
                            <h3>Personal Information</h3>
                            <br />
                            <Form.Group className='mb-3' controlId='updateFirstName'>
                                <Form.Control type='text' defaultValue={profile.firstName} placeholder='First Name' onChange={handleInputFirstName} />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='updateLastName'>
                                <Form.Control type='text' defaultValue={profile.lastName} placeholder='Last Name' />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='updateEmail'>
                                <Form.Control type='email' defaultValue={profile.email} placeholder='Email' disabled />
                            </Form.Group>
                            <br />
                        </div>
                        <div>
                            <br />
                            <h3>Education</h3>
                            <br />
                            <Form.Group className='mb-3' controlId='updateSchoolName'>
                                <Form.Control
                                    type='text'
                                    defaultValue={profile.education.schoolName}
                                    placeholder='School Name'
                                    onChange={handleInputSchoolName}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='updateDegree'>
                                <Form.Control type='text' defaultValue={profile.education.degree} placeholder='Degree' onChange={handleInputDegree} />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='updateMajor'>
                                <Form.Control type='text' defaultValue={profile.education.major} placeholder='Major' onChange={handleInputMajor} />
                            </Form.Group>
                            <br />
                        </div>
                        <div>
                            <br />
                            <h3>Professional Experience</h3>
                            <br />
                            <Form.Group className='mb-3' controlId='updateEmployerName'>
                                <Form.Control
                                    type='text'
                                    defaultValue={profile.professionalExperience.employerName}
                                    placeholder='Employer Name'
                                    onChange={handleInputEmployerName}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='updatePosition'>
                                <Form.Control
                                    type='text'
                                    defaultValue={profile.professionalExperience.position}
                                    placeholder='Position'
                                    onChange={handleInputPosition}
                                />
                            </Form.Group>
                            <br />
                        </div>
                        <div>
                            <br />
                            <h3>About Me</h3>
                            <br />
                            <Form.Group className='mb-3' controlId='updateAboutMe'>
                                <Form.Control
                                    as='textarea'
                                    rows={7}
                                    defaultValue={profile.about_me}
                                    placeholder='About Me'
                                    onChange={handleInputAboutMe}
                                />
                            </Form.Group>
                            {/* <Form.Group className='mb-3' controlId='updatePosition'>
                <Form.Control type='text' defaultValue={profile.professionalExperience.position} placeholder='Position' onChange={handleInputPosition} />
            </Form.Group> */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <br />
                        <br />
                        <Button variant='secondary' className='grey-close-btn' onClick={handleModalOnHide}>
                            Close
                        </Button>
                        <Button variant='success' type='submit' className='green-primary-btn' onClick={submitEditedForm}>
                            Save Changes
                        </Button>
                        <br />
                        <br />
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    } else {
        if (loading === false) {
            // getUserProfile();
            setLoading(true);
        }
    }

    return (
        <div>
            <Container className='mt-3'>
                <div align='right'>
                    <br />
                    {EditButton()}
                    {console.log('ABCD')}
                    <br />
                </div>
            </Container>

            {/* {!profile.education ? getUserProfile() : console.log('GO AHEAD')} */}
            {renderInfo}
        </div>
    );
};
