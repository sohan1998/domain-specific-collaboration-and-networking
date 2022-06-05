import React, { Component } from 'react';
// import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import './../common/header.css';

export default class AllProjects extends Component {
    render() {
        return (
            <div>
                {/* <Navbar collapseOnSelect expand='lg' bg='light'>
                    <Container>
                        <Navbar.Brand href='/' className='title'>
                            Circles
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='me-auto'></Nav>
                            <Nav>
                                <Nav.Link href=''>Home</Nav.Link>
                                <Nav.Link href=''>Projects</Nav.Link>
                                <Nav.Link href=''>Roles</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
                <Card style={{ width: '18rem' }} className='mb-2'>
                    {/* <Card.Header>Header</Card.Header> */}
                    <Card.Body>
                        <Card.Title> Circles </Card.Title>
                        <Card.Text>
                            Circle is an application which helps people build projects, connect with people having similar interests. Circle is an
                            application which helps people build projects, connect with people having similar interests. Circle is an application
                            which . . . . . .{' '}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
