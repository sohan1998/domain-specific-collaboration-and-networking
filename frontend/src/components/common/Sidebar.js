import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import './../common/header.css';

export default class Sidebar extends Component {
    render() {
        return (
            <div className='roles-sidebar-wrapper'>
                <div>Project 1</div>
                <div>Project 2</div>
                <div>Project 3</div>
                <div>Project 4</div>
            </div>
        );
    }
}
