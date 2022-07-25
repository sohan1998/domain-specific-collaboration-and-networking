import React, { Component } from 'react';
// import { Container } from 'react-bootstrap';
// import { Card } from 'react-bootstrap';
import { Row, Col, Card, Container, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './../common/header.css';
import './../common/button.css';
import { backendIP, backendPort } from './../common/constants';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllProjects from '../projects/projects';
import Roles from '../roles/Roles';
import './about.css';
import About from '../projectDashboardView/about';
import Member from './members';
import Button from '@mui/material/Button';
import DashboardRoles from './dashboardRoles';
import Applications from './applications';

export default class ProjectDashboard extends Component {
    state = {
        key: 'about',
        projectData: {},
        projectId: '62cf4bc7a70584858cc28524',
        showw: false,
        title: '',
        description: '',
        status: '',
        currentUserId: '62cf4b63a70584858cc28521',
    };

    fetchProjectData = async () => {
        // try {
        //     const projectArray = {
        //         title: 'Circles',
        //         description: 'This is our project',
        //         ownerId: 'shagshaghs',
        //         members: [
        //             {
        //                 userId: 'shagshaghs',
        //                 firstName: 'Tejas a.k.a Kab Sudhrega?',
        //                 lastName: 'Mahajan',
        //                 professionalExperience: { position: 'Software Engineer', employerName: 'Amazon' },
        //             },
        //             {
        //                 userId: 'shags78hs',
        //                 firstName: 'Tanay a.k.a CRAZY',
        //                 lastName: 'Ganeriwal',
        //                 professionalExperience: { position: 'Software Engineer', employerName: 'Amazon' },
        //             },
        //             {
        //                 userId: 'shkjkjghs',
        //                 firstName: 'Dhruvin a.k.a JETHIYA',
        //                 lastName: 'Shah',
        //                 professionalExperience: { position: 'Data Scinist', employerName: 'Walmart' },
        //             },
        //             {
        //                 userId: 'sh1212ghs',
        //                 firstName: 'Sohan a.k.a Prem Bhai',
        //                 lastName: 'Shirodkar',
        //                 professionalExperience: { position: 'Software Engineer', employerName: 'Amazon' },
        //             },
        //         ],
        //     };

        //     this.setState({ projectData: projectArray });
        // } catch (err) {
        //     console.error(err);
        // }

        try {
            // this.setState({ projectId: localStorage.getItem('projectID') });
            // this.setState({currentUserId: localStorage.getItem('userID')})
            const projectId = this.state.projectId;
            const response = await axios.get(`http://${backendIP}:${backendPort}/projects/viewParticularProject?_id=${projectId}`);
            // console.log(JSON.stringify(res.data))
            console.log(response.data);
            this.setState({
                projectData: response.data,
            });
            this.setState({
                title: response.data.title,
            });
            this.setState({ description: response.data.description });
            this.setState({ status: response.data.status });
            console.log(`here:${this.state.title},${this.state.description},${this.state.status}`);
        } catch {
            console.error('Some issue in fetching all projects');
        }
    };

    componentDidMount() {
        this.fetchProjectData();
    }

    connectWithMember = async (userId2) => {
        console.log(userId2);
        const currentUserId = this.state.currentUserId;
        const payload = {
            userId2: userId2,
        };
        try {
            const response = await axios.post(`http://${backendIP}:${backendPort}/user/userConnections?_id=${currentUserId}`, payload);
            this.fetchProjectData();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    removeMember = async (memberId) => {
        const projectId = this.state.projectId;
        const payload = {
            projectId: projectId,
            userId: memberId,
        };
        console.log(payload);
        try {
            const response = await axios.put(`http://${backendIP}:${backendPort}/projects/removeMemberFromProject`, payload);
            this.fetchProjectData();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    editProject = async () => {
        const payload = {
            projectId: this.state.projectId,
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,
        };
        console.log(payload);
        try {
            const response = await axios.put(`http://${backendIP}:${backendPort}/projects/editProjectDetails`, payload);
            this.setState({ showw: false });
            this.fetchProjectData();
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    handleOnHide = () => this.setState({ showw: false });

    handleOnShow = () => this.setState({ showw: true });

    render() {
        let membersButton, membersButtonFunction, editButton, applicationsTab, userType;
        if (this.state.projectData.ownerId === this.state.currentUserId) {
            applicationsTab = (
                <Tab eventKey='applications' title='Applications'>
                    <Applications projectId={this.state.projectId} />{' '}
                </Tab>
            );
            editButton = (
                <Button variant='outlined' sx={{ color: '#6053F1', borderColor: '#6053F1' }} onClick={this.handleOnShow}>
                    Edit
                </Button>
            );
            membersButton = 'Remove';
            membersButtonFunction = this.removeMember;
            userType = 'Owner';
        } else {
            membersButton = 'Connect';
            membersButtonFunction = this.connectWithMember;
            userType = 'Member';
        }
        let checkButtons;
        if (this.state.projectData.status) {
            checkButtons = (
                <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                    <Form.Check
                        inline
                        name='group1'
                        type='radio'
                        id='default-radio'
                        label='Active'
                        defaultChecked
                        onChange={(e) => {
                            this.setState({ status: 'Active' });
                        }}
                    />
                    <Form.Check
                        inline
                        name='group1'
                        type='radio'
                        id='default-radio'
                        label='Inactive'
                        onChange={(e) => {
                            this.setState({ status: 'Inactive' });
                        }}
                    />
                </Form.Group>
            );
        } else {
            checkButtons = (
                <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                    <Form.Check
                        inline
                        name='group1'
                        type='radio'
                        id='default-radio'
                        label='Active'
                        onChange={(e) => {
                            this.setState({ status: 'Active' });
                        }}
                    />
                    <Form.Check
                        inline
                        name='group1'
                        type='radio'
                        id='default-radio'
                        label='Inactive'
                        defaultChecked
                        onChange={(e) => {
                            this.setState({ status: 'Inactive' });
                        }}
                    />
                </Form.Group>
            );
        }
        return (
            <div>
                <Container>
                    <Row style={{ height: '200px' }} className='m-4'>
                        <Col xs={2}>
                            {' '}
                            <img className='rounded-circle' alt='200x200' src='https://picsum.photos/id/3/200/200' data-holder-rendered='true'></img>
                        </Col>
                        <Col>
                            <Row>
                                <br />
                            </Row>
                            <Row>
                                <br />
                            </Row>
                            <Row className='m-3'>
                                <Col xs={2} style={{ fontSize: '50px' }}>
                                    {this.state.projectData.title}
                                </Col>
                                <Col xs={8}></Col>
                                <Col style={{ fontSize: '50px' }}>
                                    {/* <Button variant='outlined' sx={{ color: '#6053F1', borderColor: '#6053F1' }}>
                                        Edit
                                    </Button> */}
                                    {editButton}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br></br>
                    <Tabs id='controlled-tab-example' activeKey={this.state.key} onSelect={(k) => this.setState({ key: k })} className='mb-3'>
                        <Tab eventKey='about' title='About'>
                            <div className='align-about'>{this.state.projectData.description}</div>
                        </Tab>
                        <Tab eventKey='members' title='Members'>
                            <Member
                                memberInfo={this.state.projectData.members}
                                memberButton={membersButton}
                                membersButtonFunction={membersButtonFunction}
                            />
                        </Tab>
                        <Tab eventKey='roles' title='Roles'>
                            {/* <DashboardRoles userType={userType} /> */}
                            <Roles userType={userType} projectId={this.state.projectId} />
                        </Tab>
                        {/* <Tab eventKey='applications' title='Applications'></Tab> */}
                        {applicationsTab}
                    </Tabs>
                    <Modal show={this.state.showw} onHide={this.handleOnHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                    <Form.Label>Project Title</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Title'
                                        value={this.state.title}
                                        autoFocus
                                        onChange={(e) => {
                                            this.setState({ title: e.target.value });
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        value={this.state.description}
                                        onChange={(e) => {
                                            this.setState({
                                                description: e.target.value,
                                            });
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
                                        {abc}
                                        // defaultChecked
                                        onChange={(e) => {
                                            this.setState({ updatedProjectDetails: { ...this.state.updatedProjectDetails, status: 'Active' } });
                                        }}
                                    />
                                    <Form.Check
                                        inline
                                        name='group1'
                                        type='radio'
                                        id='default-radio'
                                        label='Inactive'
                                        defaultChecked={this.state.projectData.status ? defaultChecked : abc}
                                        onChange={(e) => {
                                            this.setState({ updatedProjectDetails: { ...this.state.updatedProjectDetails, status: 'Inactive' } });
                                        }}
                                    />
                                </Form.Group> */}
                                {checkButtons}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={this.handleOnHide}>
                                Close
                            </Button>
                            <Button variant='primary' onClick={this.editProject}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        );
    }
}
