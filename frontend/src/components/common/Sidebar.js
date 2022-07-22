import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import axios from 'axios';
import { backendIP, backendPort } from './constants';
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
    const userID = localStorage.getItem('userID');
    console.log(userID);

    useEffect(() => {
        console.log('Rendering');
        GetExistingProjectsOfUser();

        return () => {
            // second;
        };
    }, [existingProjects]);

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

    function BadgeAvatars() {
        return (
            <div>
                <Stack direction='row' spacing={2} style={{ backgroundColor: 'brown' }}>
                    <StyledBadge
                        overlap='circular'
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant='dot'
                        style={{ backgroundColor: 'green', alignContent: 'auto' }}
                    >
                        <Avatar alt='1' src='/static/images/avatar/1.jpg' style={{ alignCenter: 'center' }} />
                    </StyledBadge>
                    {/* <Badge
                    overlap='circular'
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={<SmallAvatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />}
                >
                    <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
                </Badge> */}
                </Stack>
            </div>
        );
    }

    const GetExistingProjectsOfUser = async () => {
        try {
            // console.log('TRY');
            const response = await axios.get(`http://${backendIP}:${backendPort}/user/existingProjectsOfUser?_id=${userID}`);
            console.log(response.data.projectIdArrayMember);
            // setExistingProjects(response.data.projectIdArrayMember);
        } catch (error) {
            // console.log('CATCH');
            console.log(error);
        }
        return <div></div>;
    };

    // const badges =

    return (
        <Container>
            <div className='sidebar-wrapper' style={{ backgroundColor: 'turquoise' }}>
                <br />
                <br />
                <div>
                    {BadgeAvatars()}
                    <br />
                </div>
                <br />
                {/* <div>Project 2</div>
                <div>Project 3</div>
                <div>Project 4</div> */}
            </div>
        </Container>
    );
};

export default Sidebar;
