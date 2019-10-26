import React from 'react';
import './AddFriend.css';

const AddFriend = ({ addFriend }) => {
    return (
        <div className='AddFriend'>
            <a onClick={addFriend} id='close'><i className="material-icons">close</i></a>
            <p>친구 요청</p>
            <div className="input-field">
                <label>Username</label>
                <input type="text"></input>
            </div>
            <div className="search-box">
            </div>
        </div>
    );
};

export default AddFriend;