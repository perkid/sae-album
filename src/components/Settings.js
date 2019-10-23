import React from 'react';
import './Settings.css';
import { Link } from 'react-router-dom';

const Settings = ({modalToggle, onLogout}) => {
    return (
        <div>
            <ul className='modal-content z-depth-1'>
                <Link to ="/accounts/password/change" id="close"><li>비밀번호 변경</li></Link>
                <li className="divider" tabIndex="-1"></li>
                <li><a id="close" onClick={onLogout}>로그아웃</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a id="close" onClick={modalToggle}>닫기</a></li>
                <li></li>
            </ul>
        </div>
    );
};

export default Settings;