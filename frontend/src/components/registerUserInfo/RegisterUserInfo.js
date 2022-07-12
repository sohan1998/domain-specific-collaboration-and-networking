import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import '../common/CirclesButton';
import { Navigate } from 'react-router-dom';
import './registerUserInfo.css';
import { Autocomplete, TextField } from '@mui/material';
// import SelectSearch from 'react-select-search';

export class RegisterUserInfo extends Component {
    constructor(props) {
        // Call the constructor of Super class i.e The Component
        super(props);
        // Maintain the state required for this component
        this.state = {
            school_name: '',
            degree_name: '',
            major: '',

            employer_name: '',
            position_name: '',

            about_me: '',

            search_skills: [],

            redirect: '',
        };

        // Bind the handlers to this class
        this.schoolNameChangeHandler = this.schoolNameChangeHandler.bind(this);
        this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
        this.majorChangeHandler = this.majorChangeHandler.bind(this);
        this.employerNameChangeHandler = this.employerNameChangeHandler.bind(this);
        this.positionChangeHandler = this.positionChangeHandler.bind(this);
        this.aboutMeChangeHandler = this.aboutMeChangeHandler.bind(this);
        this.skillsChangeHandler = this.skillsChangeHandler.bind(this);
    }

    componentDidMount() {
        const { history } = this.props;
    }

    schoolNameChangeHandler = (e) => {
        this.setState({
            school_name: e.target.value,
        });
    };

    degreeChangeHandler = (e) => {
        this.setState({
            degree_name: e.target.value,
        });
    };

    majorChangeHandler = (e) => {
        this.setState({
            major_name: e.target.value,
        });
    };

    employerNameChangeHandler = (e) => {
        this.setState({
            employer_name: e.target.value,
        });
    };

    positionChangeHandler = (e) => {
        this.setState({
            position_name: e.target.value,
        });
    };

    aboutMeChangeHandler = (e) => {
        this.setState({
            about_me: e.target.value,
        });
    };

    skillsChangeHandler = (e, values) => {
        // console.log(e.target.value);
        this.setState(
            {
                search_skills: values,
                // search_skills: values,
            },
            () => {
                console.log(this.state.search_skills);
            }
        );
    };

    submit = (e) => {
        console.log('SUBMITTING');
        // store state variables in local storage
        localStorage.setItem('schoolName', this.state.school_name);
        localStorage.setItem('degree', this.state.degree_name);
        localStorage.setItem('major', this.state.major_name);
        localStorage.setItem('employerName', this.state.employer_name);
        localStorage.setItem('position', this.state.position_name);
        localStorage.setItem('aboutMe', this.state.about_me);
        localStorage.setItem('searchSkills', JSON.stringify(this.state.search_skills));

        // logic to go to next page
        this.setState({
            redirect: <Navigate to='/registerUserInterests' replace={true} />,
        });
    };

    // 3rd page:
    // submit = async (e) => {
    //     // create payload dictionary
    //     // populate payload dictionary: eg: payload['firstName'] = localStorage.getItem("firstName")
    //     // send to backend: const response = await axios.post("URL", payload)
    //     // take further action: redirect to next page
    // }
    render() {
        console.log('RENDERING');

        const skills = [
            'python',
            'pytorch',
            'sql',
            'mxnet',
            'mlflow',
            'einstein',
            'theano',
            'pyspark',
            'solr',
            'mahout',
            //     'cassandra',
            //     'aws',
            //     'powerpoint',
            //     'spark',
            //     'pig',
            //     'sas',
            //     'java',
            //     'nosql',
            //     'docker',
            //     'salesforce',
            //     'scala',
            //     'r',
            //     'c',
            //     'c++',
            //     'net',
            //     'tableau',
            //     'pandas',
            //     'scikitlearn',
            //     'sklearn',
            //     'matlab',
            //     'scala',
            //     'keras',
            //     'tensorflow',
            //     'clojure',
            //     'caffe',
            //     'scipy',
            //     'numpy',
            //     'matplotlib',
            //     'vba',
            //     'spss',
            //     'linux',
            //     'azure',
            //     'cloud',
            //     'gcp',
            //     'mongodb',
            //     'mysql',
            //     'oracle',
            //     'redshift',
            //     'snowflake',
            //     'kafka',
            //     'javascript',
            //     'qlik',
            //     'jupyter',
            //     'perl',
            //     'bigquery',
            //     'unix',
            //     'react',
            //     'scikit',
            //     'powerbi',
            //     's3',
            //     'ec2',
            //     'lambda',
            //     'ssrs',
            //     'kubernetes',
            //     'hana',
            //     'spacy',
            //     'tf',
            //     'django',
            //     'sagemaker',
            //     'seaborn',
            //     'mllib',
            //     'github',
            //     'git',
            //     'elasticsearch',
            //     'splunk',
            //     'airflow',
            //     'looker',
            //     'rapidminer',
            //     'birt',
            //     'pentaho',
            //     'jquery',
            //     'nodejs',
            //     'd3',
            //     'plotly',
            //     'bokeh',
            //     'xgboost',
            //     'rstudio',
            //     'shiny',
            //     'dash',
            //     'h20',
            //     'h2o',
            //     'hadoop',
            //     'mapreduce',
            //     'hive',
            //     'cognos',
            //     'angular',
            //     'nltk',
            //     'flask',
            //     'node',
            //     'firebase',
            //     'bigtable',
            //     'rust',
            //     'php',
            //     'cntk',
            //     'lightgbm',
            //     'kubeflow',
            //     'rpython',
            //     'unixlinux',
            //     'postgressql',
            //     'postgresql',
            //     'postgres',
            //     'hbase',
            //     'dask',
            //     'ruby',
            //     'julia',
            //     'tensor',
            //     'dplyr',
            //     'ggplot2',
            //     'esquisse',
            //     'bioconductor',
            //     'shiny',
            //     'lubridate',
            //     'knitr',
            //     'mlr',
            //     'quanteda',
            //     'dt',
            //     'rcrawler',
            //     'caret',
            //     'rmarkdown',
            //     'leaflet',
            //     'janitor',
            //     'ggvis',
            //     'plotly',
            //     'rcharts',
            //     'rbokeh',
            //     'broom',
            //     'stringr',
            //     'magrittr',
            //     'slidify',
            //     'rvest',
            //     'rmysql',
            //     'rsqlite',
            //     'prophet',
            //     'glmnet',
            //     'text2vec',
            //     'snowballc',
            //     'quantmod',
            //     'rstan',
            //     'swirl',
            //     'datascience',
            //     'amazon web services',
            //     'google cloud',
            //     'sql server',
            //     'statistics',
            //     'cleansing',
            //     'chatbot',
            //     'cleaning',
            //     'blockchain',
            //     'causality',
            //     'correlation',
            //     'bandit',
            //     'anomaly',
            //     'kpi',
            //     'dashboard',
            //     'geospatial',
            //     'ocr',
            //     'econometrics',
            //     'pca',
            //     'gis',
            //     'svm',
            //     'svd',
            //     'tuning',
            //     'hyperparameter',
            //     'hypothesis',
            //     'salesforcecom',
            //     'segmentation',
            //     'biostatistics',
            //     'unsupervised',
            //     'supervised',
            //     'exploratory',
            //     'recommender',
            //     'recommendations',
            //     'research',
            //     'sequencing',
            //     'probability',
            //     'reinforcement',
            //     'graph',
            //     'bioinformatics',
            //     'chi',
            //     'knn',
            //     'outlier',
            //     'etl',
            //     'normalization',
            //     'classification',
            //     'optimizing',
            //     'prediction',
            //     'forecasting',
            //     'clustering',
            //     'cluster',
            //     'optimization',
            //     'visualization',
            //     'nlp',
            //     'c#',
            //     'regression',
            //     'logistic',
            //     'nn',
            //     'cnn',
            //     'glm',
            //     'rnn',
            //     'lstm',
            //     'gbm',
            //     'boosting',
            //     'recurrent',
            //     'convolutional',
            //     'bayesian',
            //     'bayes',
            //     'random forest',
            //     'natural language processing',
            //     'machine learning',
            //     'decision tree',
            //     'deep learning',
            //     'experimental design',
            //     'time series',
            //     'nearest neighbors',
            //     'neural network',
            //     'support vector machine',
            //     'computer vision',
            //     'machine vision',
            //     'dimensionality reduction',
            //     'text analytics',
            //     'power bi',
            //     'a/b testing',
            //     'ab testing',
            //     'chat bot',
            //     'data mining',
            //     'AWS',
            //     'Terraform',
            //     'Packer',
            //     'Puppet',
            //     'Ansible',
            //     'Docker',
            //     'Consul',
            //     'Vault',
            //     'Git',
            //     'Gitlab',
            //     'Bitbucket',
            //     'Jenkins',
            //     'Confluence',
            //     'Jira',
            //     'Datadog',
            //     'Nagios',
            //     'Splunk',
            //     'New Relic',
            //     'LogicMonitor',
            //     'Kong API',
            //     'Apache Solr',
            //     'Varnish',
            //     'Nginx',
            //     'Hadoop',
            //     'Hive',
            //     'HDFS',
            //     'Xen Virtualization',
            //     'Bash scripting',
            //     'python scripting',
            //     'Mysql',
            //     'Postgress',
            //     'Outstanding Communication Skills',
            //     'Basic Technical Expertise',
            //     'Deep Business Skills',
            //     'Research Abilities',
            //     'Analytical Skills',
            //     'Interpersonal Abilities',
            //     'Marketing and Sales Abilities',
            //     'Delegation Skills',
            //     'Strategic Thinking',
            //     'Prioritization skills',
            //     'Communication',
            //     'Leadership',
            //     'Organization',
            //     'Negotiation',
            //     'Team management',
            //     'Time management',
            //     'Risk management',
            //     'Problem-solving',
            //     'Budget management',
            //     'Motivation',
            //     'Technical writing',
            //     'Adaptability',
            //     'Technical skills',
            //     'Reporting skills',
            //     'Active listening',
            //     'Research skills',
            //     'Interpersonal skills',
            //     'Project management methodologies',
            //     'Policy knowledge',
            //     'Conflict management',
        ].sort();
        const searchSkills = skills.map((element) => {
            return element.toLowerCase();
        });

        return (
            <div className='container registerUserInfo-wrapper'>
                {this.state.redirect}
                <div className='registerUserInfo-wrapper-item '>
                    <h1 style={{ fontSize: '50px' }}>
                        {/* <div> Let's find a </div> */}
                        <div>
                            Let's build your <span className='change-to-purple'> Profile </span>
                        </div>
                    </h1>
                    <div>
                        <h5>It helps us find a perfect circle for you</h5>
                    </div>
                </div>

                <div className='registerUserInfo-wrapper-item'>
                    <h3>Education</h3>
                    <Container className='mt-3'>
                        {/* <Form> */}
                        <Form.Group className='mb-3' controlId='formSchoolName'>
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control type='string' placeholder='Enter School Name' onChange={this.schoolNameChangeHandler} />
                            {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formDegree'>
                            {/* <Form.Label>Last Name</Form.Label> */}
                            <Form.Control type='string' placeholder='Enter Degree' onChange={this.degreeChangeHandler} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formMajor'>
                            {/* <Form.Label>major address</Form.Label> */}
                            <Form.Control type='string' placeholder='Enter Major' onChange={this.majorChangeHandler} />
                            {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='formPassword'> */}
                        {/* <Form.Label>Password</Form.Label> */}
                        {/* <Form.Control type='password' placeholder='Enter Password' onChange={this.passwordChangeHandler} /> */}
                        {/* </Form.Group> */}
                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        {/* <Button variant='success' type='submit' className='green-primary-btn' onClick={this.submit}>
                            Next
                        </Button> */}
                        {/* </Form> */}
                    </Container>
                </div>
                <div className='registerUserInfo-wrapper-item'>
                    <h3>Professional Experience</h3>
                    <Container className='mt-3'>
                        {/* <Form> */}
                        <Form.Group className='mb-3' controlId='formEmployerName'>
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control type='string' placeholder='Enter Employer Name' onChange={this.employerNameChangeHandler} />
                            {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formPosition'>
                            {/* <Form.Label>Last Name</Form.Label> */}
                            <Form.Control type='string' placeholder='Enter Position' onChange={this.positionChangeHandler} />
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='formMajor'> */}
                        {/* <Form.Label>major address</Form.Label> */}
                        {/* <Form.Control type='string' placeholder='Enter Major' onChange={this.majorChangeHandler} /> */}
                        {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                        {/* </Form.Group> */}
                        {/* <Form.Group className='mb-3' controlId='formPassword'> */}
                        {/* <Form.Label>Password</Form.Label> */}
                        {/* <Form.Control type='password' placeholder='Enter Password' onChange={this.passwordChangeHandler} /> */}
                        {/* </Form.Group> */}
                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        {/* </Form> */}
                    </Container>
                </div>
                <div className='registerUserInfo-wrapper-item'>
                    <h3>About Me</h3>
                    <Container className='mt-3'>
                        {/* <Form> */}
                        <Form.Group className='mb-3' controlId='formAboutMe'>
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control as='textarea' placeholder='About Me' rows={5} onChange={this.aboutMeChangeHandler} />
                            {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                        </Form.Group>
                        {/* <Form.Group className='mb-3' controlId='formSearch'> */}
                        {/* <Form.Label>major address</Form.Label> */}
                        {/* <Form.Control type='string' placeholder='Search Interests' onChange={this.onChangeSearchHandler} /> */}
                        {/* <Form.Text className='text-muted'>We'll never share your major with anyone else.</Form.Text> */}
                        {/* </Form.Group> */}
                        {/* <Form.Group className='mb-3' controlId='formPassword'> */}
                        {/* <Form.Label>Password</Form.Label> */}
                        {/* <Form.Control type='password' placeholder='Enter Password' onChange={this.passwordChangeHandler} /> */}
                        {/* </Form.Group> */}
                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            multiple
                            options={searchSkills}
                            sx={{ width: '100%' }}
                            onChange={this.skillsChangeHandler}
                            renderInput={(params) => <TextField {...params} label='Choose your Skills' />}
                        />
                        <br />
                        <br />
                        <Button variant='success' type='submit' className='green-primary-btn' onClick={this.submit}>
                            Next
                        </Button>
                        {/* </Form> */}
                    </Container>
                </div>
            </div>
        );
    }
}
