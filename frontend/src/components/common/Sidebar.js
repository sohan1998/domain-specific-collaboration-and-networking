import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Redirect, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import axios from 'axios';
import { backendIP, backendPort } from './constants';
import './sidebar.css';
import { Tooltip } from '@mui/material';

// import './../common/header.css';

// export default class Sidebar extends Component {
//     render() {
//         return (
//             <div className='sidebar-wrapper'>
//                 <div>Project 1</div>
//                 <div>Project 2</div>
//                 <div>Project 3</div>
//                 <div>Project 4</div>
//             </div>
//         );
//     }
// }

const Sidebar = () => {
    const [existingProjects, setExistingProjects] = useState([]);
    const [projectCount, setProjectCount] = useState(1);
    const [displayBadges, setDisplayBadges] = useState(false);
    const navigate = useNavigate();
    const userID = localStorage.getItem('userID');
    const lengthOfExistingProjects = existingProjects.length;
    // console.log('Number of projects: ', lengthOfExistingProjects);
    // console.log('User ID: ', userID);

    useEffect(() => {
        // console.log('Rendering');
        GetExistingProjectsOfUser();
        // const returnedProjectCount = incrementCount();

        return () => {
            // second;
        };
    }, [lengthOfExistingProjects]);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));

    const GetExistingProjectsOfUser = async () => {
        try {
            // console.log('TRY');
            if (!userID) {
                return <div></div>;
            }
            const response = await axios.get(`http://${backendIP}:${backendPort}/user/existingProjectsOfUser?_id=${userID}`);
            // console.log('Project IDs: ', response.data);
            if (response.data.projectIdArrayMember) {
                setExistingProjects(response.data.projectIdArrayMember);
            }
            setDisplayBadges(true);
        } catch (error) {
            // console.log('CATCH');
            console.log(error);
            setDisplayBadges(false);
        }
        return <div></div>;
    };

    const incrementCount = () => {
        setProjectCount((prevCount) => prevCount + 1);
        console.log('Count: ', projectCount);
        return projectCount;
    };

    const projectBadges = existingProjects.map((badge, i) => {
        // console.log(badge);
        // lengthOfExistingProjects ? setProjectCount((prevCount) => prevCount + 1) : console.log('GO');

        const selectProjectOnClick = () => {
            return (
                <div>
                    {/* {console.log(badge)} */}
                    {localStorage.setItem('projectID', badge._id)}
                    {navigate('/projectDashboardView')}
                    {window.location.reload()}
                </div>
            );
        };

        function BadgeAvatars() {
            return (
                <div>
                    <Stack direction='row' spacing={2}>
                        <StyledBadge
                            overlap='circular'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            // variant={{ badge } ? 'dot' : 'none'}
                            style={{ alignContent: 'auto', cursor: 'pointer' }}
                            onClick={selectProjectOnClick}
                        >
                            {/* <Avatar alt='1' src='/static/images/avatar/1.jpg' style={{ alignCenter: 'center' }} /> */}
                            <Tooltip title={badge.title} placement='right'>
                                <Avatar style={{ backgroundColor: '#6053f1', alignCenter: 'center' }}>
                                    <h7>{badge.title ? badge.title[0] : ''}</h7>
                                </Avatar>
                            </Tooltip>
                        </StyledBadge>
                        {/* <Badge
                        overlap='circular'
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={<SmallAvatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />}
                    >
                        <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                    </Badge> */}
                    </Stack>
                    <br />
                </div>
            );
        }
        return (
            <Row key={badge}>
                {BadgeAvatars(badge)} <br />
            </Row>
        );
    });

    return (
        // <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Row>
            <Col xs={1} style={{ width: '5%' }}>
                {/* <br /> */}
                {/* <Col> */}
                <div className='sidebar-wrapper'>
                    <br />
                    <br />
                    <div className='container mt-3'>
                        {/* {BadgeAvatars()} */}
                        {displayBadges ? projectBadges : ''}
                        <br />
                    </div>
                    <br />
                    {/* <div>Project 2</div>
                <div>Project 3</div>
                <div>Project 4</div> */}
                </div>
                {/* </Col> */}
            </Col>
            {/* <Col xs={11} style={{ backgroundColor: 'yellow' }}></Col> */}

            {/* <Row xs={1}></Row> */}
        </Row>
        // </div>
    );
};

export default Sidebar;
