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

export default class ProjectDashboard extends Component {
    state = { key: 'about', projectData: [], projectId: '' };

    fetchProjectData = async () => {
        try {
            const projectArray = {
                title: 'Circles',
                description: 'This is our project',
                members: [
                    {
                        userId: 'shagshaghs',
                        firstName: 'Tejas a.k.a Kab Sudhrega?',
                        lastName: 'Mahajan',
                        professionalExperience: { position: 'Software Engineer', employerName: 'Amazon' },
                    },
                    {
                        userId: 'shags78hs',
                        firstName: 'Tanay a.k.a CRAZY',
                        lastName: 'Ganeriwal',
                        professionalExperience: { position: 'Software Engineer', employerName: 'Amazon' },
                    },
                    {
                        userId: 'shkjkjghs',
                        firstName: 'Dhruvin a.k.a JETHIYA',
                        lastName: 'Shah',
                        professionalExperience: { position: 'Data Scinist', employerName: 'Walmart' },
                    },
                    {
                        userId: 'sh1212ghs',
                        firstName: 'Sohan a.k.a Prem Bhai',
                        lastName: 'Shirodkar',
                        professionalExperience: { position: 'Software Engineer', employerName: 'Amazon' },
                    },
                ],
            };

            this.setState({ projectData: projectArray });
        } catch (err) {
            console.error(err);
        }

        // try {
        //     const response = await axios.get(`http://${backendIP}:${backendPort}/projects/viewAllProjects`);
        //     // console.log(JSON.stringify(res.data))
        //     this.setState({
        //         projectData: response.data,
        //     });
        // } catch {
        //     console.error('Some issue in fetching all projects');
        // }
    };

    componentDidMount() {
        this.fetchProjectData();
    }

    render() {
        // let tt;
        // if (false) {
        //     tt = <Tab eventKey='members' title='Members'></Tab>;
        // }
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
                                    Circles
                                </Col>
                                <Col xs={8}></Col>
                                <Col style={{ fontSize: '50px' }}>
                                    <Button variant='outlined' sx={{ color: '#6053F1', borderColor: '#6053F1' }}>
                                        Edit
                                    </Button>
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
                            <Member memberInfo={this.state.projectData.members} />
                        </Tab>
                        <Tab eventKey='roles' title='Roles'>
                            <Roles />
                        </Tab>
                        <Tab eventKey='applications' title='Applications'></Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }
}
