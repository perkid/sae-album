import React from 'react';
import './Notifications.css';
import Profile from './Profile';
const NoticeList = ({ pPhoto, pUsername }) => {
    const pImg = (pPhoto === '') ? '2.jpg' : pPhoto;
    return (
        <li>
            <a>
            <div className="NoticeList">
            <div className="box"><img src={pImg}></img></div>
            <div className="namebox">{pUsername} 님이</div>
            </div></a>
            <div className='divider'></div>
        </li>
    );
}

const Notifications = ({profile, notice, noticeCnt}) => {
    console.log(noticeCnt);
    const noticeList = (noticeCnt>0) ? <NoticeList 
                                            pPhoto={profile.photo}
                                            pUsername={profile.username}
                                        /> : <li>&nbsp;&nbsp;&nbsp;알람이 없습니다.</li> ;
    console.log(profile)
    console.log(notice)
    return (
        <div className='Notifications'>
            <ul id='notifications' className='notice z-depth-1'>
                {noticeList}
            </ul>
        </div>
    );
};

export default Notifications;