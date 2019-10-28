import React from 'react';
import './Notifications.css';

const Notifications = () => {
    return (
        <div className='Notifications'>
            <ul id='notifications' className='notice z-depth-1'>
                <li><a>&nbsp;&nbsp;&nbsp;one</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a>&nbsp;&nbsp;&nbsp;two</a></li>
            </ul>
        </div>
    );
};

export default Notifications;