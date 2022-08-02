import React, { Component } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import './roles.css';
import './../projectDashboardView/about.css';

const RolesList = (props) => {
    // console.log(props.allRoles);
    const clickApply = (title, description, jobId, projectId, e) => {
        e.preventDefault();
        props.onShow(title, description, jobId, projectId);
    };

    const deleteRoleOnClick = (jobId, e) => {
        e.preventDefault();
        props.deleteRole(jobId);
    };

    const roles = props.allRoles.map((role) => {
        let buttonHolder, title, description;
        if (props.appliedTab) {
            // console.log(props.allRoles);
            buttonHolder = role.applicationStatus;
            // console.log(Object.values(role)[3].title);
            title = Object.values(role)[3].title;
            description = Object.values(role)[3].description;
        } else if (props.deleteRole) {
            buttonHolder = (
                <Button className='primary' onClick={(e) => deleteRoleOnClick(role._doc._id, e)}>
                    {' '}
                    Delete{' '}
                </Button>
            );
            title = role._doc.title;
            description = role._doc.description;
        } else if (props.dashboardRole) {
            if (role.isApplied === 'APPLIED') {
                buttonHolder = 'Applied';
            } else {
                buttonHolder = (
                    <Button
                        className='primary'
                        onClick={(e) => clickApply(role._doc.title, role._doc.description, role._doc._id, role._doc.projectId, e)}
                    >
                        {' '}
                        Apply{' '}
                    </Button>
                );
            }

            title = role._doc.title;
            description = role._doc.description;
        } else {
            buttonHolder = (
                <Button className='primary' onClick={(e) => clickApply(role.title, role.description, role.job_id, role.project_id, e)}>
                    {' '}
                    Apply{' '}
                </Button>
            );
            title = role.title;
            description = role.description;
        }
        return (
            <Card className='mb-3'>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <div className='rolecard-content-wrapper'>
                        <div className='align-about'>{description.length > 250 ? description.substring(0, 250) + '...' : description}</div>
                        <div>{buttonHolder}</div>
                    </div>
                </Card.Body>
            </Card>
        );
    });

    return <div>{roles}</div>;
};

export default RolesList;
