import React, { Component } from 'react';
import Sidebar from '../common/Sidebar';
import RolesList from './RoleCard';
import './roles.css';
import { Card, Col, Container, Form, Modal } from 'react-bootstrap';
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

export default class Roles extends Component {
    state = {
        rolesData: [],
        appliedRolesData: [],
        value: '1',
        showw: false,
        title: '',
        description: '',
        jobId: '',
        projectId: '',
        messageApplication: '',
    };

    fetchAllJobs = async () => {
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
            const response = await axios.get(`http://${backendIP}:${backendPort}/roles/viewAllJobs`);
            this.setState({ rolesData: response.data });

            // console.log('res', response);
        } catch (err) {
            console.log(err);
        }
        // console.log(this.state);
    };

    fetchAppliedJobs = async () => {
        try {
            const appliedJobsArray = [
                {
                    title: 'Machine Learning Engineer',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                    status: 'Applied',
                },
                {
                    title: 'Google',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                    status: 'Applied',
                },
            ];
            this.setState({ appliedRolesData: appliedJobsArray });
            console.log(this.state.appliedRolesData);
        } catch (err) {
            console.error(err);
        }

        // const userId= ""
        // try {
        //     const response = await axios.get(`http://${backendIP}:${backendPort}/roles/appliedJob?userId=${userId}`);
        //     this.setState({ appliedRolesData: response.data });
        // } catch (error) {
        //     console.log(err);
        // }
    };

    componentDidMount() {
        this.fetchAllJobs();
    }

    applyJob = async () => {
        const payload = {
            projectId: this.state.projectId,
            userId: '62bbaa969f3d5875ca3468e3',
            jobId: this.state.jobId,
            messageApplication: this.state.messageApplication,
        };
        try {
            const response = await axios.post(`http://${backendIP}:${backendPort}/roles/applyParticularJob`, payload);
            this.setState({ showw: false });
            this.fetchAllJobs();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    handleOnHide = () => this.setState({ showw: false });

    handleOnShow = (title, description, jobId, projectId) => {
        this.setState({ showw: true, title: title, description: description, jobId: jobId, projectId: projectId });
    };

    handleChange = (e, newValue) => {
        this.setState({ value: newValue });
    };

    render() {
        return (
            <div className='roles-wrapper'>
                <Sidebar />
                <br />
                <div className='roles-main-wrapper'>
                    <TabContext value={this.state.value}>
                        <Box>
                            <TabList onChange={this.handleChange} aria-label='lab API tabs example'>
                                <Tab label='Browse All' value='1' />
                                <Tab label='Applied' value='2' onClick={this.fetchAppliedJobs} />
                            </TabList>
                        </Box>
                        <TabPanel value='1'>
                            <RolesList allRoles={this.state.rolesData} onShow={this.handleOnShow} />
                        </TabPanel>
                        <TabPanel value='2'>
                            <RolesList allRoles={this.state.appliedRolesData} onShow={this.handleOnShow} appliedTab={true} />
                        </TabPanel>
                    </TabContext>
                    <div>
                        <Container>
                            <Modal show={this.state.showw} onHide={this.handleOnHide}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5>Job Description:</h5>
                                    <p>{this.state.description}</p>
                                    <Form>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                            <Form.Label>
                                                <h5>Message for Project Owner:</h5>
                                            </Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                placeholder='Message'
                                                autoFocus
                                                onChange={(e) => {
                                                    this.setState({ messageApplication: e.target.value });
                                                }}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={this.handleOnHide}>
                                        Close
                                    </Button>
                                    <Button variant='primary' onClick={this.applyJob}>
                                        Apply
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}
