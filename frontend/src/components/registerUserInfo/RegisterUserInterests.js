import React from 'react';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import './registerUserInfo.css';
import './../common/button.css';
import './../common/font.css';

export const RegisterUserInterests = () => {
    const IOSSlider = styled(Slider)(({ theme }) => ({
        color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
        height: 2,
        padding: '15px 0',
        '& .MuiSlider-thumb': {
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &.Mui-active': {
                boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    boxShadow: iOSBoxShadow,
                },
            },
        },
        '& .MuiSlider-valueLabel': {
            fontSize: 12,
            fontWeight: 'normal',
            top: -6,
            backgroundColor: 'unset',
            color: theme.palette.text.primary,
            '&:before': {
                display: 'none',
            },
            '& *': {
                background: 'transparent',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            },
        },
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#bfbfbf',
        },
        '& .MuiSlider-mark': {
            backgroundColor: '#bfbfbf',
            height: 8,
            width: 1,
            '&.MuiSlider-markActive': {
                opacity: 1,
                backgroundColor: 'currentColor',
            },
        },
    }));

    const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

    const marks = [
        {
            value: 0,
        },
        {
            value: 1,
        },
        {
            value: 2,
        },
        {
            value: 3,
        },
        {
            value: 4,
        },
        {
            value: 5,
        },
    ];

    const interests = ['Machine Learning', 'Full Stack Development', 'Cloud Computing', 'Product Management', 'Software Testing'];

    return (
        <div className='container'>
            <div>
                <h1>
                    What are your <span className='change-to-purple'> Interests </span> ?
                </h1>
            </div>
            <div>
                <h5>It helps us find a perfect circle for you</h5>
            </div>
            <br></br>
            <br></br>

            {interests.map((interest) => {
                return (
                    <div className='interest-wrapper'>
                        <div>
                            <h5>{interest}</h5>
                        </div>
                        <div className='slider-wrapper'>
                            <IOSSlider aria-label='ios slider' min={0} max={5} step={1} defaultValue={0} marks={marks} valueLabelDisplay='on' />
                        </div>
                    </div>
                );
            })}

            <div></div>
        </div>
    );
};
