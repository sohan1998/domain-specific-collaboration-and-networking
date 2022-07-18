import React, { Component } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import './roles.css';

const RolesList = (props) => {
    // console.log(props.onShow);
    const clickApply = (title, description, jobId, projectId, e) => {
        e.preventDefault();
        props.onShow(title, description, jobId, projectId);
    };

    const roles = props.allRoles.map((role) => {
        // console.log(role);
        return (
            <Card className='mb-3'>
                <Card.Header>{role.title}</Card.Header>
                <Card.Body>
                    <div className='rolecard-content-wrapper'>
                        <div>{role.description}</div>
                        <div>
                            <Button className='primary' onClick={(e) => clickApply(role.title, role.description, role._id, role.projectId, e)}>
                                {' '}
                                Apply{' '}
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    });

    return <div>{roles}</div>;
};

export default RolesList;
