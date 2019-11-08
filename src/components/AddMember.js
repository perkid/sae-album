import React from 'react';
import './AddMember.css';

const FriendList = ({ pPhoto, pUsername, pName }) => {
    const pImg = (pPhoto === '') ? '2.jpg' : pPhoto;
    return (
        <li>
            <div className="ProfileList">
                <div className="box"><img src={pImg}></img></div>
                <div className="namebox"><div>{pUsername}</div><div>{pName}</div></div>
            </div>
            <div className='divider'></div>
        </li>
    );
};

const AddMember = ({friendsList }) => {
    const friends = (friendsList === undefined) ? <li></li> :friendsList.map(friend => (
        <FriendList
            key={friend.username}
            pPhoto={friend.photo}
            pUsername={friend.username}
            pName={friend.name}
        ></FriendList>
    ))
    return (
        <div className='AddMember'>
            <div className="member-box">

            </div>
            <div className="input-field">
                <label>Username</label>
                <input type="text"></input>
            </div>
            <div className="button-box"><b>친구목록 | 유저검색</b></div>
            <div className="search-box">
                <ul>
                    {friends}
                </ul>
            </div>
        </div>
    );
};

export default AddMember;