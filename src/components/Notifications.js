import React from 'react';
import './Notifications.css';

const NoticeList = ({ pPhoto, pUsername, type, myPage }) => {
    const pImg = (pPhoto === '') ? '2.jpg' : pPhoto;
    const message = (type === 0) ? <div onClick={myPage}>{pUsername}님이 친구 요청을 보냈습니다.</div> : `${pUsername}님이 그룹을 추가하였습니다.`;

    return (
        <li>
            <a>
            <div className="NoticeList">
            <div className="box"><img src={pImg}></img></div>
            <div className="namebox">{message}</div>
            </div></a>
            <div className='divider'></div>
        </li>
    );
}

const Notifications = ({notice, myPage}) => {
    const noticeList = notice.map( (n, index) => (
        <NoticeList
            key={index}
            pPhoto={n.photo}
            pUsername={n.username}
            type={n.type}
            myPage={myPage}
        />
    ));
    const list = (notice.length>0) ? noticeList : <li id="empty">알림이 없습니다.</li> ;
    return (
        <div className='Notifications'>
            <ul id='notifications' className='notice z-depth-1'>
                {list}
            </ul>
        </div>
    );
};

export default Notifications;