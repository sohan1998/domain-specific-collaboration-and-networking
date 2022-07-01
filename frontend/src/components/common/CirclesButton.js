import React from 'react';
import { Button } from 'react-bootstrap';
import './button.css';

const CirclesButton = ({ text, onClick, style, type }) => {
    return (
        <div className='green-primary-btn'>
            <Button style={style} onClick={onClick} type={type}>
                {'HELLO'}
            </Button>
        </div>
    );
};

export default CirclesButton;
