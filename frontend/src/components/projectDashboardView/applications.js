import React, { Component } from 'react';
import Sidebar from '../common/Sidebar';
// import RolesList from './RoleCard';
// import './roles.css';
import { Card, Row, Col, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from '../common/constants';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllProjects from '../projects/projects';
import About from '../projectDashboardView/about';
import Button from '@mui/material/Button';
import ApplicationCard from './ApplicationCard';

export default class Applications extends Component {
    state = {
        applicationsData: [],
        newRole: {},
        showw: false,
        title: '',
        jobId: '',
        projectId: '',
        applicationUserId: '',
        messageApplication: '',
        firstName: '',
        lastName: '',
        applicationsToRender: '',
    };

    fetchAllApplications = async () => {
        // try {
        //     const allJobsArray = [
        //         {
        //             title: 'Machine Learning Engineer',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Google',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Salesforce',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Circles',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Google',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Salesforce',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //     ];
        //     this.setState({ rolesData: allJobsArray });
        //     console.log(this.state.rolesData);
        // } catch (err) {
        //     console.error(err);
        // }

        try {
            const projectId = this.props.projectId;
            const response = await axios.get(`http://${backendIP}:${backendPort}/projects/viewAllApplicationsForParticularProject?_id=${projectId}`);
            this.setState({ applicationsData: response.data });
            // console.log('aaplication data', this.state.applicationsData);
            // console.log('res', response.data.length);
            if (response.data.length === 0) {
                // console.log('hello');
                this.setState({ applicationsToRender: "You don't have any applications yet. Check after sometime." });
            } else {
                this.setState({ applicationsToRender: '' });
            }

            console.log('res', response.data);
        } catch (err) {
            console.log(err);
        }
        // console.log(this.state);
    };

    acceptOrRejectMember = async (applicationStatus) => {
        try {
            const projectId = this.state.projectId;
            const jobId = this.state.jobId;
            const payload = {
                userId: this.state.applicationUserId,
                message: applicationStatus,
            };
            console.log(payload);
            console.log(`projectid: ${projectId}, jobId: ${jobId}`);
            const response = await axios.post(
                `http://${backendIP}:${backendPort}/projects/acceptOrRejectMemberForProject?projectId=${projectId}&jobId=${jobId}`,
                payload
            );
            this.fetchAllApplications();
            this.props.onClickUpdate();
            this.setState({ showw: false });
            console.log(response);

            // console.log('res', response);
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        this.fetchAllApplications();
    }

    handleOnHide = () => this.setState({ showw: false });

    handleOnShow = (title, jobId, projectId, userId, firstName, lastName, message) => {
        this.setState({
            showw: true,
            title: title,
            jobId: jobId,
            projectId: projectId,
            applicationUserId: userId,
            firstName: firstName,
            lastName: lastName,
            messageApplication: message,
        });
    };

    // handleOnShowCreateRoleModal = () => {
    //     this.setState({ showCreateRoleModal: true });
    // };

    // handleOnHideCreateRoleModal = () => {
    //     this.setState({ showCreateRoleModal: false });
    // };

    // handleChange = (e, newValue) => {
    //     this.setState({ value: newValue });
    // };

    render() {
        // let rolesToDisplay, createRoleButton, displaySideBar;
        // if (this.props.userType) {
        //     if (this.props.userType === 'Owner') {
        //         rolesToDisplay = <RolesList allRoles={this.state.projectRolesData} onShow={this.handleOnShow} deleteRole={this.deleteRole} />;
        //         createRoleButton = (
        //             <Row className='m-4'>
        //                 <Col sm={10}></Col>
        //                 <Col sm={2}>
        //                     <Button type='submit' className='green-primary-btn' size='sm' onClick={this.handleOnShowCreateRoleModal}>
        //                         + Create Role
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         );
        //     } else {
        //         rolesToDisplay = <RolesList allRoles={this.state.projectRolesData} onShow={this.handleOnShow} dashboardRole={true} />;
        //     }
        // } else {
        //     // displaySideBar = <Sidebar />;
        //     rolesToDisplay = (
        //         <TabContext value={this.state.value}>
        //             <Box>
        //                 <TabList onChange={this.handleChange} aria-label='lab API tabs example'>
        //                     <Tab label='Browse All' value='1' />
        //                     <Tab label='Applied' value='2' onClick={this.fetchAppliedJobs} />
        //                 </TabList>
        //             </Box>
        //             <TabPanel value='1'>
        //                 <RolesList allRoles={this.state.rolesData} onShow={this.handleOnShow} />
        //             </TabPanel>
        //             <TabPanel value='2'>
        //                 <RolesList allRoles={this.state.appliedRolesData} onShow={this.handleOnShow} appliedTab={true} />
        //             </TabPanel>
        //         </TabContext>
        //     );
        // }
        // let applicationsToRender;
        // if (this.state.applicationsData === []) {
        //     applicationsToRender = "You don't have any applications yet. Check after sometime.";
        //     console.log('no');
        // } else {
        //     applicationsToRender = <ApplicationCard allApplications={this.state.applicationsData} onShow={this.handleOnShow} />;
        // }
        let applications;
        if (this.state.applicationsToRender) {
            applications = this.state.applicationsToRender;
            // console.log('appli', applications);
        } else {
            applications = <ApplicationCard allApplications={this.state.applicationsData} onShow={this.handleOnShow} />;
        }
        return (
            <div className='roles-wrapper'>
                {/* {displaySideBar} */}
                {/* <Sidebar /> */}
                <br />
                <div className='roles-main-wrapper'>
                    {applications}
                    {/* <ApplicationCard allApplications={this.state.applicationsData} onShow={this.handleOnShow} /> */}
                    <div>
                        <Container>
                            <Modal show={this.state.showw} onHide={this.handleOnHide}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5>Candidate Name:</h5>
                                    {`${this.state.firstName} ${this.state.lastName}`}
                                    <br />
                                    <h5>Message for you:</h5>
                                    <p>{this.state.messageApplication}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant='outlined'
                                        sx={{ color: '#FF3D00', borderColor: '#FF3D00' }}
                                        onClick={(e) => this.acceptOrRejectMember('Reject')}
                                    >
                                        Reject
                                    </Button>
                                    <h1></h1>
                                    <Button
                                        variant='contained'
                                        sx={{ backgroundColor: '#7BFB9F', color: 'black' }}
                                        onClick={(e) => this.acceptOrRejectMember('Accept')}
                                    >
                                        Accept
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            {/* <Modal show={this.state.showCreateRoleModal} onHide={this.handleOnHideCreateRoleModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create a Role</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                            <Form.Label>Role Title</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Title'
                                                autoFocus
                                                onChange={(e) => {
                                                    this.setState({ newRole: { ...this.state.newRole, title: e.target.value } });
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                            <Form.Label>Role Description</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                onChange={(e) => {
                                                    this.setState({ newRole: { ...this.state.newRole, description: e.target.value } });
                                                }}
                                            />
                                        </Form.Group>
                                        {/* <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                        <Form.Check
                                            inline
                                            name='group1'
                                            type='radio'
                                            id='default-radio'
                                            label='Active'
                                            defaultChecked
                                            onChange={(e) => {
                                                this.setState({ newProject: { ...this.state.newProject, status: 'Active' } });
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            name='group1'
                                            type='radio'
                                            id='default-radio'
                                            label='Inactive'
                                            onChange={(e) => {
                                                this.setState({ newProject: { ...this.state.newProject, status: 'Inactive' } });
                                            }}
                                        />
                                    </Form.Group> */}
                            {/* </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={this.handleOnHideCreateRoleModal}>
                                        Close
                                    </Button>
                                    <Button variant='primary' onClick={this.createRole}>
                                        Create
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}
