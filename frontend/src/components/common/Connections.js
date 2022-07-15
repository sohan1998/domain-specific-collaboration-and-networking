import React from 'react';
import ConnectCard from './ConnectCard';
import './../common/font.css';

export const Connections = () => {
    return (
        <div className='container'>
            <div className='container'>
                <br />
                <h1 style={{ fontSize: '50px' }}>
                    <div>
                        You may want to <span className='change-to-purple'> connect </span> with them
                    </div>
                </h1>
                <br />
                <div className='container' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <ConnectCard />
                </div>
            </div>
        </div>
    );
};
