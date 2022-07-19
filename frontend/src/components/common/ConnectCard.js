import React, { useState, useEffect } from 'react';
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
import { Button } from 'react-bootstrap';
import '../common/button.css';
import axios from 'axios';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

const ConnectCard = () => {
    // const [expanded, setExpanded] = React.useState(false);
    const [cardData, setCardData] = useState({});

    useEffect(() => {
        console.log('Rendering');
        GetRecommendations();

        return () => {
            // clean up previously assigned
        };
    }, []);

    const GetRecommendations = async () => {
        try {
            const userID = localStorage.getItem('userID');
            const response = await axios.get(`http://127.0.0.1:5000/recommend/?_id=${userID}`);
            // console.log(response);
            // console.log('-------------');
            // console.log(response.data);
            setCardData(response.data);
            // console.log(cardData);
        } catch (error) {
            console.error(error);
        }
        return (
            <div>
                <div></div>
            </div>
        );
    };

    console.log(JSON.parse(cardData));

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    // const temp = cardData.map((cardDataVar) => {
    //     console.log(cardDataVar);
    //     return <div>{cardDataVar.firstName}</div>;
    // });

    return (
        <div>
            {/* {temp} */}
            <Card sx={{ maxWidth: 500, borderRadius: '20px', boxShadow: '1px 2px 9px' }}>
                <CardHeader
                    avatar={
                        <Avatar src='https://pbs.twimg.com/profile_images/638771889339404289/h64dZ4wh_400x400.png' sx={{ bgcolor: red[500] }}>
                            S
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label='settings'>
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }

                    titleTypographyProps={{ variant: 'h5' }}
                    title='Michael Thompson' // '{firstName} {lastName}'
                    subheader='Product Manager at Microsoft' // '{position} at {employerName}'
                />
                {/* <CardMedia component='img' height='194' image='/static/images/cards/paella.jpg' alt='Paella dish' /> */}
                <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label='share'>
                    <ShareIcon />
                </IconButton>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and
                        cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often
                        until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the
                        liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the
                        rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any
                        mussels that don&apos;t open.)
                    </Typography>
                    <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                </CardContent>
            </Collapse> */}
                <CardContent align='right'>
                    <Button className='purple-primary-btn' size='md'>
                        Connect
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConnectCard;
