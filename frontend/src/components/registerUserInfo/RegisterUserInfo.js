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
            'a/b testing',
            'ab testing',
            'Active listening',
            'Adaptability',
            'airflow',
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
        ];

        const lowerCaseSkills = skills.map((element) => {
            return element.toLowerCase();
        });

        const searchSkills = lowerCaseSkills.filter((val, id, skillsArray) => skillsArray.indexOf(val) === id).sort();
        // console.log(searchSkills);

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
