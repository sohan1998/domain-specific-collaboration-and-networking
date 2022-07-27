// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

// const AccountMenu = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = () => {
//         localStorage.clear();
//         // navigate('/login');
//     };
//     return (
//         <React.Fragment>
//             <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//                 <Typography sx={{ minWidth: 120 }}>
//                     <NavLink href='/projects'>Projects</NavLink>
//                 </Typography>
//                 <Typography sx={{ minWidth: 120 }}>
//                     <NavLink href='/roles'>Roles</NavLink>
//                 </Typography>
//                 <Tooltip title='Account Settings'>
//                     <IconButton
//                         onClick={handleClick}
//                         size='small'
//                         sx={{ ml: 2 }}
//                         aria-controls={open ? 'account-menu' : undefined}
//                         aria-haspopup='true'
//                         aria-expanded={open ? 'true' : undefined}
//                     >
//                         <Avatar sx={{ width: 45, height: 45 }} style={{ backgroundColor: '#6053f1' }}>
//                             {userFirstName ? userFirstName[0] : 'X'}
//                         </Avatar>
//                     </IconButton>
//                 </Tooltip>
//             </Box>
//             <Menu
//                 anchorEl={anchorEl}
//                 id='account-menu'
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                     elevation: 0,
//                     sx: {
//                         overflow: 'visible',
//                         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                         mt: 1.5,
//                         '& .MuiAvatar-root': {
//                             width: 32,
//                             height: 32,
//                             ml: -0.5,
//                             mr: 1,
//                         },
//                         '&:before': {
//                             content: '""',
//                             display: 'block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 14,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             >
//                 <MenuItem>
//                     <Avatar /> <NavLink href='/editUserProfile'>Profile</NavLink>
//                 </MenuItem>
//                 {/* <MenuItem>
//                         <Avatar /> My account
//                     </MenuItem> */}
//                 <Divider />
//                 {/* <MenuItem>
//                         <ListItemIcon>
//                             <PersonAdd fontSize='small' />
//                         </ListItemIcon>
//                         Add another account
//                     </MenuItem>
//                     <MenuItem>
//                         <ListItemIcon>
//                             <Settings fontSize='small' />
//                         </ListItemIcon>
//                         Settings
//                     </MenuItem> */}
//                 <MenuItem onClick={handleLogout}>
//                     <NavLink href='/login'>
//                         <ListItemIcon>
//                             <Logout />
//                         </ListItemIcon>
//                         Logout
//                     </NavLink>
//                 </MenuItem>
//             </Menu>
//         </React.Fragment>
//     );
// };

// export default AccountMenu;
