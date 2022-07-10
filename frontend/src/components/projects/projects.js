import React, { Component } from 'react';
// import { Container } from 'react-bootstrap';
// import { Card } from 'react-bootstrap';
import { Row, Col, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './../common/header.css';
import './../common/button.css';
import { backendIP, backendPort } from './../common/constants';

export default class AllProjects extends Component {
    state = { projects: [], showw: false, newProject: { status: 'Active' } };

    fetchAllProjects = async () => {
        // try {
        //     const allProjectsArray = [
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
        //     this.setState({ projects: allProjectsArray });
        //     console.log(this.state.projects);
        //     console.log(this.state.newProject);
        // } catch (err) {
        //     console.error(err);
        // }

        try {
            const response = await axios.get(`http://${backendIP}:${backendPort}/projects/viewAllProjects`);
            // console.log(JSON.stringify(res.data))
            this.setState({
                projects: response.data,
            });
        } catch {
            console.error('Some issue in fetching all projects');
        }
    };

    componentDidMount() {
        this.fetchAllProjects();
    }

    renderRow = (row) => {
        return (
            // <Row xs={1} md={3}>
            <Col>
                <Card style={{ width: '18rem', height: '18rem' }} className='mb-2'>
                    <Card.Body>
                        <Card.Title> {row.title} </Card.Title>
                        <Card.Text>{row.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            // </Row>
        );
    };

    handleOnHide = () => this.setState({ showw: false });

    handleOnShow = () => this.setState({ showw: true });

    createProject = async () => {
        const payload = { ...this.state.newProject, ownerId: '627a3162fbc0fd1fe102c8a8' };
        try {
            const response = await axios.post(`http://${backendIP}:${backendPort}/projects/createProject`, payload);
            this.setState({ showw: false });
            this.fetchAllProjects();
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <div>
                <Container>
                    <Row className='m-4'>
                        <Col sm={10}></Col>
                        <Col sm={2}>
                            <Button type='submit' className='green-primary-btn' size='sm' onClick={this.handleOnShow}>
                                + Create Project
                            </Button>
                        </Col>
                    </Row>
                    <Modal show={this.state.showw} onHide={this.handleOnHide}>
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
                                    {console.log(this.state.newProject.status)}
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
                    </Modal>
                    <Row xs={1} md={4}>
                        {this.state.projects.map(this.renderRow)}
                    </Row>
                </Container>
            </div>
        );
    }
}
