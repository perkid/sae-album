import React from 'react';
import './AddFriend.css';

const ProfileList = ({ pPhoto, pUsername, pName, visit, request, currentUser }) => {
    const pImg = (pPhoto === '') ? '2.jpg' : pPhoto;
    return (
        <li>
            <div className="ProfileList">
                <div className="box"><img src={pImg}></img></div>
                <div className="namebox"><div>{pUsername}</div><div>{pName}</div></div>
                <div className='send'>{(pUsername === currentUser) ? undefined : <a onClick={request} id={pUsername}>친구요청</a>}<a onClick={visit} id={pUsername}>방문하기</a></div>
            </div>
            <div className='divider'></div>
        </li>
    );
};


const AddFriend = ({ handleAddFriend, search, username, users, visit, addFriend, currentUser }) => {

    const profiles = users.map(user => (
        <ProfileList
            key={user.username}
            pPhoto={user.photo}
            pUsername={user.username}
            pName={user.name}
            visit={visit}
            request={addFriend}
            currentUser={currentUser}
        />
    ));
    
    return (
        <div className='AddFriend'>
            <a onClick={handleAddFriend} id='close'><i className="material-icons">close</i></a>
            <p>친구 요청</p>
            <div className="input-field">
                <label>Username</label>
                <input type="text" onChange={search} value={username}></input>
            </div>
            <div className="search-box">
                <ul>
                    {(users.length <= 0 && username !== '') ? <li id="noresult">검색 결과가 없습니다.</li> : profiles}
                </ul>
            </div>
        </div>
    );
};

export default AddFriend;