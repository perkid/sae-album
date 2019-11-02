import React from 'react';
import './Notifications.css';
const NoticeList = ({ pPhoto, pUsername, pName }) => {
    const pImg = (pPhoto === '') ? '2.jpg' : pPhoto;
    return (
        <li>
            <div className="box"><img src={pImg}></img></div>
            <div className="namebox"><div>{pUsername}</div><div>{pName}</div></div>
            <div className='divider'></div>
        </li>
    );
}

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