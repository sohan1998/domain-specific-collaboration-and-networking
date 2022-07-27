import React, { useState } from 'react';
import { Container, NavLink } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import './../common/header.css';
import { useLocation, useNavigate } from 'react-router';
// import './../common/button.css';

const NavbarComponent = () => {
    const userFirstName = localStorage.getItem('firstName');
    const navigate = useNavigate();
    const location = useLocation();
    // console.log('First Name: ', firstName);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        // navigate('/login');
    };

    function AccountMenu() {
        return (
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography sx={{ minWidth: 120 }}>
                        <NavLink href='/projects'>Projects</NavLink>
                    </Typography>
                    <Typography sx={{ minWidth: 120 }}>
                        <NavLink href='/roles'>Roles</NavLink>
                    </Typography>
                    <Tooltip title='Account Settings'>
                        <IconButton
                            onClick={handleClick}
                            size='small'
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 45, height: 45 }} style={{ backgroundColor: '#6053f1' }}>
                                {userFirstName ? userFirstName[0] : 'X'}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id='account-menu'
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Avatar /> <NavLink href='/editUserProfile'>Profile</NavLink>
                    </MenuItem>
                    {/* <MenuItem>
                        <Avatar /> My account
                    </MenuItem> */}
                    <Divider />
                    {/* <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize='small' />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize='small' />
                        </ListItemIcon>
                        Settings
                    </MenuItem> */}
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <NavLink href='/login'>Logout</NavLink>
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }

    return (
        <div>
            <Navbar collapseOnSelect expand='lg' bg='light'>
                <Container>
                    <Navbar.Brand href='/' className='title'>
                        Circles
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='me-auto'></Nav>
                        {/* <Nav>
                            <Nav.Link href='/projects'>Projects</Nav.Link>
                            <Nav.Link href='/roles'>Roles</Nav.Link>
                        </Nav> */}
                        {location.pathname !== '/login' &&
                            location.pathname !== '/register' &&
                            location.pathname !== '/registerUserInfo' &&
                            location.pathname !== '/registerUserInterests' &&
                            location.pathname !== '/connections' && <Nav>{AccountMenu()}</Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;

// ------------------------------------------------

// export default class NavbarComponent extends Component {
//     render() {
//         return (
//             <div>
//                 <Navbar collapseOnSelect expand='lg' bg='light'>
//                     <Container>
//                         <Navbar.Brand href='/' className='title'>
//                             Circles
//                         </Navbar.Brand>
//                         <Navbar.Toggle aria-controls='responsive-navbar-nav' />
//                         <Navbar.Collapse id='responsive-navbar-nav'>
//                             <Nav className='me-auto'></Nav>
//                             <Nav>
//                                 {/* <Nav.Link href=''>Home</Nav.Link> */}
//                                 <Nav.Link href='/projects'>Projects</Nav.Link>
//                                 <Nav.Link href='/roles'>Roles</Nav.Link>
//                             </Nav>
//                         </Navbar.Collapse>
//                     </Container>
//                 </Navbar>
//             </div>
//         );
//     }
// }

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// // import { logout, getCurrentUser, getJwt } from '../../services/auth';
// // import IndeedLogo from './IndeedLogo';
// // import { FileSaver } from 'file-saver';

// // const indeedLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png";

// const Navbar = () => {
//     const jwt = getJwt();
//     const user = getCurrentUser();

//     let isAuthenticated = 0;
//     let navRight1 = null;

//     if (jwt) {
//         navRight1 = (
//             <div className='div-checker'>
//                 <NavLink activeClassName='active' to='/chat' className='navbar-buttons'>
//                     <svg
//                         xmlns='http://www.w3.org/2000/svg'
//                         width='30'
//                         height='20'
//                         fill='currentColor'
//                         className='bi bi-chat-left-text-fill'
//                         viewBox='0 0 20 20'
//                     >
//                         <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z' />
//                     </svg>
//                 </NavLink>
//                 <NavLink activeClassName='active' to='/notification' className='navbar-buttons'>
//                     <svg
//                         xmlns='http://www.w3.org/2000/svg'
//                         width='30'
//                         height='20'
//                         fill='currentColor'
//                         className='bi bi-bell-fill'
//                         viewBox='0 0 20 20'
//                     >
//                         <path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z' />
//                     </svg>
//                 </NavLink>

//                 {/* <NavLink
//           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
//           activeClassName="active"
//           to="#"
//           id="dropdownMenuButton"
//           className="navbar-buttons"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="20"
//             fill="currentColor"
//             className="bi bi-person-fill"
//             viewBox="0 0 20 20"
//           >
//             <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//           </svg>
//           <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//             <NavLink onClick={(e) => { console.log(e.target.text) }} to="/jobSeekerProfile" className="dropdown-item">Profile</NavLink>
//             <a class="dropdown-item" href="/jobSeeker/myJobs">My Jobs</a>
//             <a class="dropdown-item" href="#">My Reviews</a>
//             <a class="dropdown-item" href="#">Sign Out</a>
//           </div>
//         </NavLink> */}

//                 <span className='navbar-buttons'>
//                     {jwt && user.role === 2 && (
//                         <React.Fragment>
//                             <svg
//                                 xmlns='http://www.w3.org/2000/svg'
//                                 width='30'
//                                 height='20'
//                                 fill='currentColor'
//                                 className='bi bi-person-fill'
//                                 viewBox='0 0 20 20'
//                                 data-toggle='dropdown'
//                                 aria-haspopup='true'
//                                 aria-expanded='false'
//                             >
//                                 <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
//                             </svg>

//                             <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
//                                 <a className='dropdown-item' href='/jobSeekerProfile'>
//                                     Profile
//                                 </a>
//                                 <a className='dropdown-item' href='/jobSeeker/myJobs/savedJobs'>
//                                     My Jobs
//                                 </a>
//                                 <a className='dropdown-item' href='/jobSeeker/myReviews'>
//                                     My Reviews
//                                 </a>
//                                 <a className='dropdown-item' href='/logout'>
//                                     Sign Out
//                                 </a>
//                             </div>
//                         </React.Fragment>
//                     )}
//                 </span>
//             </div>
//         );
//     } else {
//         navRight1 = (
//             <>
//                 <NavLink activeClassName='active' to='/login' className='navbar-buttons'>
//                     Post Your Resume
//                 </NavLink>
//                 <NavLink activeClassName='active' to='/login' className='navbar-buttons'>
//                     Sign In
//                 </NavLink>
//             </>
//         );
//     }

//     const showJobSeekerTabs = !jwt || (jwt && user.role === 2);

//     return (
//         <nav className='navbar'>
//             <div className='nav-left'>
//                 <IndeedLogo />
//                 <div className='nav-left-tabs'>
//                     {showJobSeekerTabs && (
//                         <React.Fragment>
//                             <NavLink exact={true} activeClassName='active' to='/jobSeekerLandingPage' className='navbar-buttons'>
//                                 Find jobs
//                             </NavLink>
//                             <NavLink activeClassName='active' to='/jobSeeker/reviews' className='navbar-buttons'>
//                                 Company reviews
//                             </NavLink>
//                             <NavLink activeClassName='active' to='/jobSeeker/salaries' className='navbar-buttons'>
//                                 Find salaries
//                             </NavLink>
//                         </React.Fragment>
//                     )}
//                     {jwt && user.role === 1 && (
//                         <React.Fragment>
//                             <NavLink exact={true} activeClassName='active' to='/employer' className='navbar-buttons'>
//                                 Home
//                             </NavLink>
//                             <NavLink exact={true} activeClassName='active' to='/employer/reviews' className='navbar-buttons'>
//                                 Reviews
//                             </NavLink>
//                             <NavLink exact={true} activeClassName='active' to='/employer/jobPostings' className='navbar-buttons'>
//                                 Job Postings
//                             </NavLink>
//                             <NavLink exact={true} activeClassName='active' to='/employer/applicants' className='navbar-buttons'>
//                                 Applicants
//                             </NavLink>
//                             <NavLink exact={true} activeClassName='active' to='/employer/reports' className='navbar-buttons'>
//                                 Report
//                             </NavLink>
//                         </React.Fragment>
//                     )}
//                     {jwt && user.role === 0 && (
//                         <React.Fragment>
//                             <NavLink activeClassName='active' to='/admin' className='navbar-buttons'>
//                                 Dashboard
//                             </NavLink>
//                             <NavLink activeClassName='active' to='/companyProfilePage' className='navbar-buttons'>
//                                 Company Profile Page
//                             </NavLink>
//                             <NavLink activeClassName='active' to='/analyticsDashboard' className='navbar-buttons'>
//                                 Analytics
//                             </NavLink>
//                         </React.Fragment>
//                     )}
//                 </div>
//             </div>
//             <div className='nav-right'>
//                 <div className='nav-right-1'>{navRight1}</div>
//                 <div className='nav-right-2'>
//                     {/* <NavLink
//             activeClassName="active"
//             to="/employerPostJob"
//             className="navbar-buttons"
//           >
//             Employers/ Post Job
//           </NavLink> */}
//                     {jwt && user.role === 1 && (
//                         <NavLink className='navbar-buttons' to='/logout'>
//                             Sign Out
//                         </NavLink>
//                     )}
//                     {jwt && user.role === 0 && (
//                         <NavLink className='navbar-buttons' to='/logout'>
//                             Sign Out
//                         </NavLink>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar
