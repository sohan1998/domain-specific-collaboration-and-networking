import React, { Component } from 'react';
import Sidebar from '../common/Sidebar';
// import RolesList from './RoleCard';
// import './roles.css';
// import { Col, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from '../common/constants';
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Row, Col, Container, Modal, Form } from 'react-bootstrap';

export default class DashboardRoles extends Component {
    state = { rolesData: [], newRole: {}, showStatus: false, title: '', description: '', jobId: '', projectId: '', messageApplication: '' };

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
            this.setState({ showStatus: false });
            this.fetchAllJobs();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    // createRole = async () => {
    //     const payload = { ...this.state.newProject, ownerId: '627a3162fbc0fd1fe102c8a8' };
    //     try {
    //         const response = await axios.post(`http://${backendIP}:${backendPort}/projects/createProject`, payload);
    //         this.setState({ showw: false });
    //         this.fetchAllProjects();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    handleOnHide = () => this.setState({ showStaus: false });

    handleOnShow = (title, description, jobId, projectId) => {
        this.setState({ showStatus: true, title: title, description: description, jobId: jobId, projectId: projectId });
    };

    render() {
        let createRoleButton;
        if (this.props.userType === 'Owner') {
            createRoleButton = (
                <Row className='m-4'>
                    <Col sm={10}></Col>
                    <Col sm={2}>
                        <Button type='submit' className='green-primary-btn' size='sm' onClick={this.handleOnShow}>
                            + Create Role
                        </Button>
                    </Col>
                </Row>
            );
        }
        return (
            <div className='roles-wrapper'>
                {this.props.userTypehghge}
                {/* <br />
                <div className='roles-main-wrapper'>
                    <div>
                        <Container>
                            {createRoleButton}
                            <RolesList allRoles={this.state.rolesData} onShow={this.handleOnShow} />
                            <Modal show={this.state.showStatus} onHide={this.handleOnHide}>
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
                            </Modal> */}
                {/* <Modal show={this.state.showw} onHide={this.handleOnHide}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a Project</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                        <Form.Label>Project Title</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Title'
                                            autoFocus
                                            onChange={(e) => {
                                                this.setState({ newProject: { ...this.state.newProject, title: e.target.value } });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                        <Form.Label>Project Description</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            rows={3}
                                            onChange={(e) => {
                                                this.setState({ newProject: { ...this.state.newProject, description: e.target.value } });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
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
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='secondary' onClick={this.handleOnHide}>
                                    Close
                                </Button>
                                <Button variant='primary' onClick={this.createProject}>
                                    Create
                                </Button>
                            </Modal.Footer>
                        </Modal> */}
                {/* </Container>  */}
                {/* </div> */}
                {/* </div> */}
            </div>
        );
    }
}
