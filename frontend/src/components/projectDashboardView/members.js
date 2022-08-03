import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { Row, Col, Container, Modal, Form } from 'react-bootstrap';

const Member = (props) => {
    // console.log(props.memberInfo);
    const handleOnClick = (memberId, e) => {
        e.preventDefault();
        props.membersButtonFunction(memberId);
    };

    const projectMembers = props.memberInfo?.map((member) => {
        let actions;
        if (props.memberButton === 'Remove') {
            actions = (
                <Button variant='contained' sx={{ backgroundColor: '#6053F1' }} onClick={(e) => handleOnClick(member._id, e)}>
                    {props.memberButton}
                </Button>
            );
        } else if (member._id !== localStorage.getItem('userID')) {
            actions = member.connections.includes(localStorage.getItem('userID')) ? (
                <p style={{ color: '#6053F1' }}>
                    <br />
                    Connected
                </p>
            ) : (
                <Button variant='contained' sx={{ backgroundColor: '#6053F1' }} onClick={(e) => handleOnClick(member._id, e)}>
                    {props.memberButton}
                </Button>
            );
        }
        return (
            <Row className='m-4'>
                <Card sx={{ borderRadius: '10px', boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, 0.15)' }}>
                    <CardHeader
                        avatar={
                            <Avatar src='https://picsum.photos/seed/picsum/200/300' sx={{ bgcolor: red[500] }}>
                                S
                            </Avatar>
                        }
                        action={actions}
                        // action={actions}
                        // action={props.memberButton}
                        style={{ textAlign: 'left' }}
                        titleTypographyProps={{ variant: 'h5' }}
                        title={`${member.firstName} ${member.lastName}`}
                        subheader={`${member.professionalExperience.position} at ${member.professionalExperience.employerName}`} // '{position} at {employerName}'
                    />
                </Card>
            </Row>
            // <Card className='mb-3'>
            //     <Card.Header>{role.title}</Card.Header>
            //     <Card.Body>
            //         <div className='rolecard-content-wrapper'>
            //             <div>{role.description}</div>
            //             <div>
            //                 <Button className='primary' onClick={(e) => clickApply(role.title, role.description, role._id, role.projectId, e)}>
            //                     {' '}
            //                     Apply{' '}
            //                 </Button>
            //             </div>
            //         </div>
            //     </Card.Body>
            // </Card>
        );
    });

    return <div>{projectMembers}</div>;
};

export default Member;
