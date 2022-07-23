import React from 'react';
import axios from 'axios';
import { backendIP, backendPort } from './../common/constants';

export const UserProfile = () => {
    const getUserProfile = async () => {
        try {
            const userProfile = await axios.get(`http://${backendIP}:${backendPort}/profile/getUserProfile?_id=`);
            console.log(userProfile);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div></div>
        </div>
    );
};
