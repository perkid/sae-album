import React from 'react';
import './AddMember.css';

const AddMember = ({}) => {
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
            </div>
        </div>
    );
};

export default AddMember;