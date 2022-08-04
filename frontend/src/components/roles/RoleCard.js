import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
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
        let buttonHolder, title, description, textColor, id;
        if (props.appliedTab) {
            // console.log(props.allRoles);
            buttonHolder = role.applicationStatus;
            textColor = role.applicationStatus === 'Applied' ? 'blue' : role.applicationStatus === 'Accepted' ? 'green' : 'red';
            // console.log(Object.values(role)[3].title);
            title = Object.values(role)[3].title;
            description = Object.values(role)[3].description;
            id = Object.values(role)[3]._id;
        } else if (props.deleteRole) {
            buttonHolder = (
                <Button variant='contained' sx={{ backgroundColor: '#6053F1' }} onClick={(e) => deleteRoleOnClick(role._doc._id, e)}>
                    {' '}
                    Delete{' '}
                </Button>
            );
            title = role._doc.title;
            description = role._doc.description;
            id = role._doc._id;
        } else if (props.dashboardRole) {
            if (role.isApplied !== 'NOT_APPLIED') {
                buttonHolder = role.isApplied;
                textColor = role.isApplied === 'Applied' ? 'blue' : role.isApplied === 'Accepted' ? 'green' : 'red';
            } else {
                buttonHolder = (
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: '#6053F1' }}
                        onClick={(e) => clickApply(role._doc.title, role._doc.description, role._doc._id, role._doc.projectId, e)}
                    >
                        {' '}
                        Apply{' '}
                    </Button>
                );
            }
            id = role._doc._id;
            title = role._doc.title;
            description = role._doc.description;
        } else {
            buttonHolder = (
                <Button
                    variant='contained'
                    sx={{ backgroundColor: '#6053F1' }}
                    onClick={(e) => clickApply(role.title, role.description, role.job_id, role.project_id, e)}
                >
                    {' '}
                    Apply{' '}
                </Button>
            );
            title = role.title;
            description = role.description;
            id = role.job_id;
        }
        return (
            <Card className='mb-3' key={id}>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <div className='rolecard-content-wrapper'>
                        <div className='align-about'>{description.length > 250 ? description.substring(0, 250) + '...' : description}</div>
                        <div style={{ color: textColor }}>{buttonHolder}</div>
                    </div>
                </Card.Body>
            </Card>
        );
    });

    return <div>{roles}</div>;
};

export default RolesList;
