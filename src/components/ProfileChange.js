import React from 'react';
import './ProfileChange.css';

const ProfileChange = ({ username, chgUsername, name, chgName, photo, bio, chgBio, modal, chgProfile }) => {
    const img = '../'+photo;
    return (
        <div className='ProfileChg'>
            <h4>프로필 수정</h4>
            <br></br>
            <div className="divider"></div>
            {photo === '' ? <img src='../2.jpg' onClick={modal}></img> : <img src={img} onClick={modal}></img>}
            <h5>{username}</h5>
            <br></br>
            <a className="imgChange" onClick={modal}>프로필 사진 변경</a>
            <div className="input-wrapper">
            <div className="side">이름 :</div><div className="input-field">
                 <input className="name-input" type="text" value={name} onChange={chgName}></input>
            </div>
            </div>
            <div className="input-wrapper">
                <div className="side">
            사용자 이름 :</div><div className="input-field">
                 <input className="name-input" type="text" value={username} onChange={chgUsername}></input>
            </div>
            </div>
            <div className="input-wrapper">
            <div className="side" id="bio">소개 :</div>
                 <textarea className="name-input" type="text" value={bio} onChange={chgBio}></textarea>
            </div>
            <a className="chg btn" onClick={chgProfile}
                        >제출</a>
        </div>
    );
};

export default ProfileChange;