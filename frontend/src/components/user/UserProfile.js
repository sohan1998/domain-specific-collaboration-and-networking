import React, { useEffect, useMemo, useState } from 'react';
import { Form, Container, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from './../common/constants';
import { Button, FormControl, Input, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import './../common/button.css';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Member from '../projectDashboardView/members';
import { useNavigate } from 'react-router-dom';

export const UserProfile = (props) => {
    const [profile, setProfile] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const userID = localStorage.getItem('userID');
    const [value, setValue] = useState('1');
    const navigate = useNavigate();
    // const [userConnections, setUserConnections] = useState();
    // const profileMemo = useMemo(() => setProfile(), [profile]);

    useEffect(() => {
        if (!userID) {
            navigate('/login');
        } else {
            getUserProfile();
        }
    }, []);

    const getUserProfile = async () => {
        let userIdToCheck;
        try {
            if (props.otherUserId) {
                userIdToCheck = props.otherUserId;
            } else {
                userIdToCheck = userID;
            }
            const userProfile = await axios.get(`http://${backendIP}:${backendPort}/profile/getUserProfile?_id=${userIdToCheck}`);
            // console.log(userProfile.data);
            if (userProfile.status === 200) {
                setProfile(userProfile.data);
                // console.log('Profile ID: ', profile._id);
            }
        } catch (error) {
            console.error(error);
        }
        console.log('Connections: ', profile.connections);
    };

    const handleModalOnHide = () => {
        setShowModal(false);
    };

    const handleModalOnShow = () => {
        setShowModal(true);
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

    const handleTabChange = (e, newValue) => {
        setValue(newValue);
    };

    // const EditButton = () => {
    //     return (
    //         <Box sx={{ '& > :not(style)': { m: 1 } }}>
    //             <Button variant='contained' sx={{ backgroundColor: '#6053F1' }} aria-label='edit' onClick={handleModalOnShow}>
    //                 EDIT
    //             </Button>
    //         </Box>
    //     );
    // };

    const submitEditedForm = async (e) => {
        e.preventDefault();
        try {
            console.log('Data for update: ', profile);
            const response = await axios.put(`http://${backendIP}:${backendPort}/profile/editUserDetails`, profile);
            // console.log(response.data);
            if (response === 200) {
                console.log(response.data);
                getUserProfile();
            }
            handleModalOnHide();
            // window.location.reload(false);
        } catch (error) {
            console.error(error);
        }
        setLoading(true);
    };

    const connectWithMember = async (userId2) => {
        // console.log(userId2);

        const payload = {
            userId2: userId2,
        };

        try {
            const response = await axios.post(`http://${backendIP}:${backendPort}/user/userConnections?_id=${userID}`, payload);
            getUserProfile();
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    let connectionsToDisplay, editButton;
    // if (profile) {
    if (profile._id === userID) {
        // connectionsToDisplay = <RolesList allRoles={projectRolesData} onShow={handleOnShow} deleteRole={deleteRole} />;
        editButton = (
            // <Row className='m-4'>
            //     <Col sm={10}></Col>
            //     <Col sm={2}>
            //         <Button type='submit' className='green-primary-btn' size='sm' onClick={EditButton}>
            //             Edit
            //         </Button>
            //     </Col>
            // </Row>
            <div align='right'>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Button variant='contained' sx={{ backgroundColor: '#6053F1' }} aria-label='edit' onClick={handleModalOnShow}>
                        EDIT
                    </Button>
                </Box>
            </div>
        );
    }
    // } else {

    let renderInfo;
    if (profile.education) {
        renderInfo = (
            <Container className='mt-3'>
                {editButton}
                <Container className='mt-3'>
                    <br />
                    {/* <br /> */}
                    <div>
                        <h3>Personal Information</h3>
                        <br />
                        <Form.Group className='mb-3' controlId='updateFirstName'>
                            <Form.Control type='text' defaultValue={profile.firstName} placeholder='First Name' disabled />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='updateLastName'>
                            <Form.Control type='text' defaultValue={profile.lastName} placeholder='Last Name' disabled />
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
                            <Form.Control type='text' defaultValue={profile.education.schoolName} placeholder='School Name' disabled />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='updateDegree'>
                            <Form.Control type='text' defaultValue={profile.education.degree} placeholder='Degree' disabled />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='updateMajor'>
                            <Form.Control type='text' defaultValue={profile.education.major} placeholder='Major' disabled />
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
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='updatePosition'>
                            <Form.Control type='text' defaultValue={profile.professionalExperience.position} placeholder='Position' disabled />
                        </Form.Group>
                        <br />
                    </div>
                    <div>
                        <br />
                        <h3>About Me</h3>
                        <br />
                        <Form.Group className='mb-3' controlId='updateAboutMe'>
                            <Form.Control as='textarea' rows={7} defaultValue={profile.about_me} placeholder='About Me' disabled />
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='updatePosition'>
                    <Form.Control type='text' defaultValue={profile.professionalExperience.position} placeholder='Position' onChange={handleInputPosition} />
                </Form.Group> */}
                    </div>
                </Container>

                {/* ------------------------------------------------- */}
                {/* --------------- MODAL begins here --------------- */}

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
                                <Form.Control type='text' defaultValue={profile.lastName} placeholder='Last Name' onChange={handleInputLastName} />
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
                            <br />
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

    {
        /* ------------------------------------------------- */
        /* --------------- MODAL ends here --------------- */
    }

    connectionsToDisplay = (
        <TabContext value={value}>
            <Box>
                <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
                    <Tab label='Profile' value='1' />
                    <Tab label='Connections' value='2'></Tab>
                </TabList>
            </Box>
            <TabPanel value='1'>{renderInfo}</TabPanel>
            <TabPanel value='2'>
                <Member memberInfo={profile.connections} memberButton='CONNECT' membersButtonFunction={connectWithMember} />
            </TabPanel>
        </TabContext>
    );
    // }

    return (
        <div>
            <Container className='mt-3'>
                <div>
                    {/* <br /> */}
                    {connectionsToDisplay}
                    {/* {editButton} */}
                    {/* {console.log(profile.connections)} */}
                    <br />
                    {/* {console.log('Check')} */}
                    <br />
                </div>
            </Container>
            {/* {renderInfo} */}

            {/* {!profile.education ? getUserProfile() : console.log('GO AHEAD')} */}
        </div>
    );
};
