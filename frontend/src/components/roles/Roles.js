import React, { Component } from 'react';
import Sidebar from '../common/Sidebar';
import RolesList from './RoleCard';
import './roles.css';
import { Card, Row, Col, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { backendIP, backendPort } from '../common/constants';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllProjects from '../projects/projects';
import About from '../projectDashboardView/about';
import Button from '@mui/material/Button';
import { Autocomplete, TextField } from '@mui/material';

export default class Roles extends Component {
    state = {
        rolesData: [],
        appliedRolesData: [],
        projectRolesData: [],
        newRole: {},
        value: '1',
        showw: false,
        showCreateRoleModal: false,
        title: '',
        description: '',
        jobId: '',
        projectId: '',
        messageApplication: '',
        interests: [],
        currentUserId: localStorage.getItem('userID'),
    };

    fetchAllJobs = async () => {
        // try {
        //     const allJobsArray = [
        //         {
        //             title: 'Machine Learning Engineer',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Google',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Salesforce',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Circles',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Google',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //         {
        //             title: 'Salesforce',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //         },
        //     ];
        //     this.setState({ rolesData: allJobsArray });
        //     console.log(this.state.rolesData);
        // } catch (err) {
        //     console.error(err);
        // }
        // this.setState({ currentUserId: localStorage.getItem('userID') });
        const userId = this.state.currentUserId;
        try {
            console.log(userId);
            const response = await axios.get(`http://127.0.0.1:5000/recommendRoles/?_id=${userId}`);
            this.setState({ rolesData: response.data });

            console.log('res', response.data);
        } catch (err) {
            console.log(err);
        }
        // console.log(this.state);
    };

    fetchAppliedJobs = async () => {
        // try {
        //     const appliedJobsArray = [
        //         {
        //             title: 'Machine Learning Engineer',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //             status: 'Applied',
        //         },
        //         {
        //             title: 'Google',
        //             description:
        //                 'Circle is an application which helps people build projects, connect with people having similar interests. Circle is anapplication which helps people build projects, connect with people having similar interests. Circle is an application which',
        //             status: 'Applied',
        //         },
        //     ];
        //     this.setState({ appliedRolesData: appliedJobsArray });
        //     console.log(this.state.appliedRolesData);
        // } catch (err) {
        //     console.error(err);
        // }

        const userId = this.state.currentUserId;
        try {
            const response = await axios.get(`http://${backendIP}:${backendPort}/roles/appliedJob?userId=${userId}`);
            this.setState({ appliedRolesData: response.data });
            // console.log(response.data);
            // console.log(this.state.appliedRolesData);
        } catch (error) {
            console.log(error);
        }
    };

    fetchRolesOfParticularProject = async () => {
        // this.setState({ currentUserId: localStorage.getItem('userID') });
        const userId = this.state.currentUserId;
        const projectId = this.props.projectId;
        try {
            const response = await axios.get(
                `http://${backendIP}:${backendPort}/projects/viewRolesOfParticularProject?projectId=${projectId}&userId=${userId}`
            );
            console.log(response.data);
            this.setState({ projectRolesData: response.data });
            // console.log(this.state.projectRolesData);
        } catch (error) {
            console.log(error);
        }
    };

    deleteRole = async (jobId) => {
        const jobIdToDelete = jobId;
        try {
            const response = await axios.delete(`http://${backendIP}:${backendPort}/roles/deleteJob?_id=${jobIdToDelete}`);
            this.fetchRolesOfParticularProject();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        if (this.props.userType) {
            console.log('Rendering particula project jobs.');
            this.fetchRolesOfParticularProject();
        } else {
            this.fetchAllJobs();
        }
    }

    applyJob = async () => {
        const payload = {
            projectId: this.state.projectId,
            userId: this.state.currentUserId,
            jobId: this.state.jobId,
            messageApplication: this.state.messageApplication,
        };
        console.log(payload);
        try {
            const response = await axios.post(`http://${backendIP}:${backendPort}/roles/applyParticularJob`, payload);
            this.setState({ showw: false });
            if (this.props.userType === 'Member') {
                this.fetchRolesOfParticularProject();
            } else {
                this.fetchAllJobs();
            }
            // this.fetchAllJobs();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    createRole = async () => {
        const userId = this.state.currentUserId;
        const payload = {
            projectId: this.props.projectId,
            ownerId: userId,
            tags: this.state.interests,
            ...this.state.newRole,
        };
        try {
            const response = await axios.post(`http://${backendIP}:${backendPort}/roles/createJob`, payload);
            this.setState({ showCreateRoleModal: false });
            this.fetchRolesOfParticularProject();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    handleOnHide = () => this.setState({ showw: false });

    handleOnShow = (title, description, jobId, projectId) => {
        this.setState({ showw: true, title: title, description: description, jobId: jobId, projectId: projectId });
    };

    handleOnShowCreateRoleModal = () => {
        this.setState({ showCreateRoleModal: true });
    };

    handleOnHideCreateRoleModal = () => {
        this.setState({ showCreateRoleModal: false });
    };

    handleChange = (e, newValue) => {
        this.setState({ value: newValue });
    };

    interestsChangeHandler = (e, values) => {
        // console.log(e.target.value);
        this.setState({
            interests: values,
            // search_skills: values,
        });
        console.log(this.state.interests);
    };

    render() {
        const interests = [
            'Full-Stack Development',
            'Machine Learning',
            'Deep Learning',
            'Data Science',
            'Software Testing',
            'Product Management',
            'Project Management',
            'Cloud Computing',
            'Backend Development',
            'UIUX Design',
            'DevOps Domain',
            'a/b testing',
            'ab testing',
            'Active listening',
            'Adaptability',
            'airflow',
            'Network Security',
            'Application Security',
            'Security',
            'Owasp',
            'SSO',
            'LDAP',
            'cyber security',
            'Kotlin',
            'Android',
            'Android NDK',
            'MVP',
            'MVVM',
            'Bluetooth Protocols',
            'Android SDK',
            'Java RX',
            'Flutter',
            'amazon web services',
            'Analytical Skills',
            'angular',
            'anomaly',
            'Ansible',
            'Apache Solr',
            'aws',
            'AWS',
            'azure',
            'bandit',
            'Bash scripting',
            'Basic Technical Expertise',
            'bayes',
            'bayesian',
            'bigquery',
            'bigtable',
            'bioconductor',
            'bioinformatics',
            'biostatistics',
            'birt',
            'Bitbucket',
            'blockchain',
            'bokeh',
            'boosting',
            'broom',
            'Budget management',
            'c',
            'c#',
            'c++',
            'caffe',
            'caret',
            'cassandra',
            'causality',
            'chat bot',
            'chatbot',
            'chi',
            'classification',
            'cleaning',
            'cleansing',
            'clojure',
            'cloud',
            'cluster',
            'clustering',
            'cnn',
            'cntk',
            'cognos',
            'Communication',
            'computer vision',
            'Conflict management',
            'Confluence',
            'Consul',
            'convolutional',
            'correlation',
            'd3',
            'dash',
            'dashboard',
            'dask',
            'data mining',
            'Datadog',
            'datascience',
            'decision tree',
            'Deep Business Skills',
            'deep learning',
            'Delegation Skills',
            'dimensionality reduction',
            'django',
            'docker',
            'Docker',
            'dplyr',
            'dt',
            'ec2',
            'econometrics',
            'einstein',
            'elasticsearch',
            'esquisse',
            'etl',
            'experimental design',
            'exploratory',
            'firebase',
            'flask',
            'forecasting',
            'gbm',
            'gcp',
            'geospatial',
            'ggplot2',
            'ggvis',
            'gis',
            'git',
            'Git',
            'github',
            'Gitlab',
            'glm',
            'glmnet',
            'google cloud',
            'graph',
            'h20',
            'h2o',
            'Hadoop',
            'hadoop',
            'hana',
            'hbase',
            'HDFS',
            'Hive',
            'hive',
            'hyperparameter',
            'hypothesis',
            'Interpersonal Abilities',
            'Interpersonal skills',
            'janitor',
            'java',
            'javascript',
            'Jenkins',
            'Jira',
            'jquery',
            'julia',
            'jupyter',
            'kafka',
            'keras',
            'knitr',
            'knn',
            'Kong API',
            'kpi',
            'kubeflow',
            'kubernetes',
            'lambda',
            'Leadership',
            'leaflet',
            'lightgbm',
            'linux',
            'LogicMonitor',
            'logistic',
            'looker',
            'lstm',
            'lubridate',
            'machine learning',
            'machine vision',
            'magrittr',
            'mahout',
            'mapreduce',
            'Marketing and Sales Abilities',
            'matlab',
            'matplotlib',
            'mlflow',
            'mllib',
            'mlr',
            'mongodb',
            'Motivation',
            'mxnet',
            'mysql',
            'Mysql',
            'Nagios',
            'natural language processing',
            'nearest neighbors',
            'Negotiation',
            'net',
            'neural network',
            'New Relic',
            'Nginx',
            'nlp',
            'nltk',
            'nn',
            'node',
            'nodejs',
            'normalization',
            'nosql',
            'numpy',
            'ocr',
            'optimization',
            'optimizing',
            'oracle',
            'Organization',
            'outlier',
            'Outstanding Communication Skills',
            'Packer',
            'pandas',
            'pca',
            'pentaho',
            'perl',
            'php',
            'pig',
            'plotly',
            'Policy knowledge',
            'postgres',
            'postgresql',
            'Postgress',
            'postgressql',
            'power bi',
            'powerbi',
            'powerpoint',
            'prediction',
            'Prioritization skills',
            'probability',
            'Problem-solving',
            'Project management methodologies',
            'prophet',
            'Puppet',
            'pyspark',
            'python',
            'python scripting',
            'pytorch',
            'qlik',
            'quanteda',
            'quantmod',
            'r',
            'random forest',
            'rapidminer',
            'rbokeh',
            'rcharts',
            'rcrawler',
            'react',
            'recommendations',
            'recommender',
            'recurrent',
            'redshift',
            'regression',
            'reinforcement',
            'Reporting skills',
            'research',
            'Research Abilities',
            'Research skills',
            'Risk management',
            'rmarkdown',
            'rmysql',
            'rnn',
            'rpython',
            'rsqlite',
            'rstan',
            'rstudio',
            'ruby',
            'rust',
            'rvest',
            's3',
            'sagemaker',
            'salesforce',
            'salesforcecom',
            'sas',
            'scala',
            'scikit',
            'scikitlearn',
            'scipy',
            'seaborn',
            'segmentation',
            'sequencing',
            'shiny',
            'sklearn',
            'slidify',
            'snowballc',
            'snowflake',
            'solr',
            'spacy',
            'spark',
            'splunk',
            'Splunk',
            'spss',
            'sql',
            'sql server',
            'ssrs',
            'statistics',
            'Strategic Thinking',
            'stringr',
            'supervised',
            'support vector machine',
            'svd',
            'svm',
            'swirl',
            'tableau',
            'Team management',
            'Technical skills',
            'Technical writing',
            'tensor',
            'tensorflow',
            'Terraform',
            'text analytics',
            'text2vec',
            'tf',
            'theano',
            'Time management',
            'time series',
            'tuning',
            'unix',
            'unixlinux',
            'unsupervised',
            'Varnish',
            'Vault',
            'vba',
            'visualization',
            'Xen Virtualization',
            'xgboost',
            'Continuous Integration and Continuous Delivery (CI/CD)',
            'PyTest',
            'Test Driven Development',
            'Google Cloud Platform',
            'Selenium',
            'Postman',
            'Presto db',
            'qTest',
            'Bootstrap',
            'PyCharm',
            'HTML',
            'CSS',
            'ABAP',
            'Groovy',
            'Racket',
            'MVC Architecture',
            'HTML5',
            'CSS3',
            'Bootstrap',
            'Servlets',
            'Ember',
            'BackboneJs',
            'Grails',
            'AccuRev',
            'SVN',
            'Redis',
            'Cloud Firestore',
            'Spring Boot',
            'Spring MVC',
            'REST',
            'GraphQL',
            'Redux',
            'JMeter',
            'Mocha.js',
            'OpenShift',
            'Manual testing',
            'MS Excel',
            'MS Visio',
            'Trello',
            'NetSuite',
            'Agile',
            'Go',
            'GoLang',
            'Shell scripting',
            'Micro service architecture',
            'Heroku',
            'Android SDK',
            'XML',
            'JSON',
            'JSP',
            'Eclipse',
            'Prototyping',
            'Wireframing',
            'Figma',
            'Collaboration',
            'Sketch',
            'UI/UX  Rapid Prototyping',
            'User Acceptance Testing',
            'Storyboarding',
            'UI/UX Adobe Illustrator',
            'RMI',
            'Socket Programming',
            'MVC',
            'Google App Engine',
            'IBM Bluemix',
            'Apache Tomcat',
            'Putty',
            'MS Office Suite',
        ];

        const lowerCaseSkills = interests.map((element) => {
            return element.toLowerCase();
        });

        const searchSkills = lowerCaseSkills.filter((val, id, skillsArray) => skillsArray.indexOf(val) === id).sort();
        // console.log(searchSkills);

        let rolesToDisplay, createRoleButton, displaySideBar;
        if (this.props.userType) {
            if (this.props.userType === 'Owner') {
                rolesToDisplay = <RolesList allRoles={this.state.projectRolesData} onShow={this.handleOnShow} deleteRole={this.deleteRole} />;
                createRoleButton = (
                    <Row className='m-4'>
                        <Col sm={10}></Col>
                        <Col sm={2}>
                            <Button type='submit' className='green-primary-btn' size='sm' onClick={this.handleOnShowCreateRoleModal}>
                                + Create Role
                            </Button>
                        </Col>
                    </Row>
                );
            } else {
                rolesToDisplay = <RolesList allRoles={this.state.projectRolesData} onShow={this.handleOnShow} dashboardRole={true} />;
            }
        } else {
            // displaySideBar = <Sidebar />;
            rolesToDisplay = (
                <TabContext value={this.state.value}>
                    <Box>
                        <TabList onChange={this.handleChange} aria-label='lab API tabs example'>
                            <Tab label='Browse All' value='1' />
                            <Tab label='Applied' value='2' onClick={this.fetchAppliedJobs} />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <RolesList allRoles={this.state.rolesData} onShow={this.handleOnShow} />
                    </TabPanel>
                    <TabPanel value='2'>
                        <RolesList allRoles={this.state.appliedRolesData} onShow={this.handleOnShow} appliedTab={true} />
                    </TabPanel>
                </TabContext>
            );
        }
        return (
            <div className='roles-wrapper'>
                {displaySideBar}
                {/* <Sidebar /> */}
                <br />
                <div className='roles-main-wrapper'>
                    {/* <TabContext value={this.state.value}>
                        <Box>
                            <TabList onChange={this.handleChange} aria-label='lab API tabs example'>
                                <Tab label='Browse All' value='1' />
                                <Tab label='Applied' value='2' onClick={this.fetchAppliedJobs} />
                            </TabList>
                        </Box>
                        <TabPanel value='1'>
                            <RolesList allRoles={this.state.rolesData} onShow={this.handleOnShow} />
                        </TabPanel>
                        <TabPanel value='2'>
                            <RolesList allRoles={this.state.appliedRolesData} onShow={this.handleOnShow} appliedTab={true} />
                        </TabPanel>
                    </TabContext> */}
                    {createRoleButton}
                    {rolesToDisplay}
                    {/* <Row className='m-4'>
                        <Col sm={10}></Col>
                        <Col sm={2}>
                            <Button type='submit' className='green-primary-btn' size='sm' onClick={this.handleOnShow}>
                                + Create Project
                            </Button>
                        </Col>
                    </Row> */}
                    <div>
                        <Container>
                            <Modal show={this.state.showw} onHide={this.handleOnHide}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5>Job Description:</h5>
                                    <p>{this.state.description}</p>
                                    <Form>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                            <Form.Label>
                                                <h5>Message for Project Owner:</h5>
                                            </Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                placeholder='Message'
                                                autoFocus
                                                onChange={(e) => {
                                                    this.setState({ messageApplication: e.target.value });
                                                }}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={this.handleOnHide}>
                                        Close
                                    </Button>
                                    <Button variant='primary' onClick={this.applyJob}>
                                        Apply
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.showCreateRoleModal} onHide={this.handleOnHideCreateRoleModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create a Role</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                            <Form.Label>Role Title</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Title'
                                                autoFocus
                                                onChange={(e) => {
                                                    this.setState({ newRole: { ...this.state.newRole, title: e.target.value } });
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                            <Form.Label>Role Description</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                onChange={(e) => {
                                                    this.setState({ newRole: { ...this.state.newRole, description: e.target.value } });
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Label>Select Tags</Form.Label>
                                        <Autocomplete
                                            disablePortal
                                            id='combo-box-demo'
                                            multiple
                                            options={searchSkills}
                                            sx={{ width: '100%' }}
                                            onChange={this.interestsChangeHandler}
                                            renderInput={(params) => <TextField {...params} label='Select Tags' />}
                                        />
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='secondary' onClick={this.handleOnHideCreateRoleModal}>
                                        Close
                                    </Button>
                                    <Button variant='primary' onClick={this.createRole}>
                                        Create
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}
