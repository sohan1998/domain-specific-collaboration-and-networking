import React, { Component } from 'react';
import Sidebar from '../common/sidebar';
import RolesList from './RoleCard';
import './roles.css';
import { Button, Card, Col, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from '../common/constants';

export default class Roles extends Component {
    state = { rolesData: [], showw: false, title: '', description: '', jobId: '', projectId: '', messageApplication: '' };

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

    render() {
        return (
            <div className='roles-wrapper'>
                <Sidebar />
                <br />
                <div className='roles-main-wrapper'>
                    <div className='roles-subheader-wrapper'>
                        <div className='left'>
                            <div>Browse All</div>
                            <div>Applied</div>
                        </div>
                        <div className='right'>
                            <div>Filters</div>
                        </div>
                    </div>
                    <div>
                        <Container>
                            <RolesList allRoles={this.state.rolesData} onShow={this.handleOnShow} />
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
