import React, { Component } from 'react';
// import { Container } from 'react-bootstrap';
// import { Card } from 'react-bootstrap';
import { Row, Col, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import './../common/header.css';
import './../common/button.css';

export default class AllProjects extends Component {
    state = { projects: [], showw: false };

    fetchAllProjects = () => {
        try {
            const allProjectsArray = [
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
            this.setState({ projects: allProjectsArray });
            console.log(this.state.projects);
        } catch (err) {
            console.error(err);
        }

        // try {
        //         const res = axios.get("url");
        //         console.log(JSON.stringify(res.data))
        //         this.setState({
        //             projects: res.data
        //         })
        //     } catch {
        //         console.error("Some issue in fetching all projects")
        //     }
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
                                    <Form.Control type='text' placeholder='Title' autoFocus />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control as='textarea' rows={3} />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                    <Form.Check inline name='group1' type='radio' id='default-radio' label='Active' defaultChecked />
                                    <Form.Check inline name='group1' type='radio' id='default-radio' label='Inactive' />
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
                    <Row xs={1} md={4}>
                        {this.state.projects.map(this.renderRow)}
                    </Row>
                </Container>
            </div>
        );
    }
}
