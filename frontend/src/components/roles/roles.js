import React, { Component } from 'react';
import Sidebar from '../common/sidebar';
import RoleCard from './RoleCard';
import './roles.css';
import { Button, Card, Col, Container } from 'react-bootstrap';
import axios from 'axios';
export default class Roles extends Component {
    state = { rolesData: [] };

    fetchAllJobs = () => {
        try {
            const allJobsArray = [
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
            this.setState({ rolesData: allJobsArray });
            console.log(this.state.rolesData);
        } catch (err) {
            console.error(err);
        }

        // try {
        //     const response = await axios.get('http://localhost:3001/projects/viewAllProjects');

        //     console.log(response);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    componentDidMount() {
        this.fetchAllJobs();
    }

    render() {
        return (
            <div className='roles-wrapper'>
                <Sidebar />
                <br />
                <div className='roles-main-wrapper'>
                    <div className='roles-subheader-wrapper'>
                        <div className='left'>
                            <div>Browse All</div>
                            <div>Applied</div>
                        </div>
                        <div className='right'>
                            <div>Filters</div>
                        </div>
                    </div>
                    <div>
                        <Container>
                            <RoleCard allRoles={this.state.rolesData} />
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}
