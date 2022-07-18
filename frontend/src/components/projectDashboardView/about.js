import React, { Component } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import './about.css';

const About = (props) => {
    console.log(props.about);
    // const clickApply = (title, description, jobId, projectId, e) => {
    //     e.preventDefault();
    //     props.onShow(title, description, jobId, projectId);
    // };

    return <div className='align-about'>{props.about}</div>;
};

export default About;
