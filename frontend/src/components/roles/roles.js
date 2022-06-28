import React, { Component } from 'react';
import Sidebar from '../common/sidebar';
import Rolecard from './rolecard';
import './roles.css';
import axios from 'axios';
export default class Roles extends Component {
    state = { rolesData: [] };

    fetchAllJobs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/projects/viewAllProjects');

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        this.fetchAllJobs();
    }

    render() {
        return (
            <div class='roles-wrapper'>
                <Sidebar />
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
                        <Rolecard projectName='project' roleName='dev' />
                    </div>
                </div>
            </div>
        );
    }
}
