import React, { Component } from 'react';
import Sidebar from '../common/sidebar';
import RolesList from './rolecard';
import './roles.css';
import { Button, Card, Col, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

export default class Roles extends Component {
    state = { rolesData: [], showw: false, title: '', description: '' };

    fetchAllJobs = async () => {
        try {
            const allJobsArray = [
                {
                    title: 'Machine Learning Engineer',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                },
                {
                    title: 'Google',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                },
                {
                    title: 'Salesforce',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                },
                {
                    title: 'Circles',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                },
                {
                    title: 'Google',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                },
                {
                    title: 'Salesforce',
                    description:
                        'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
                },
            ];
            this.setState({ rolesData: allJobsArray });
            console.log(this.state.rolesData);
        } catch (err) {
            console.error(err);
        }

        // try {
        //     const response = await axios.get(`http://${backendIP}:${backendPort}/projects/viewAllJobs`);
        //     this.setState = {rolesData: response.data}

        //     // console.log(response);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    componentDidMount() {
        this.fetchAllJobs();
    }

    handleOnHide = () => this.setState({ showw: false });

    handleOnShow = (title, description) => {
        this.setState({ showw: true, title: title, description: description });
    };

    render() {
        return (
            <div className='roles-wrapper'>
                <Sidebar />
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

                                                // onChange={(e) => {
                                                //     this.setState({ newProject: { ...this.state.newProject, title: e.target.value } });
                                                // }}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={this.handleOnHide}>
                                        Close
                                    </Button>
                                    <Button variant='primary' onClick={this.handleOnHide}>
                                        Create
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
