import React from 'react';
import './AddGroup.css';

const AddGroup = ({addGroup, addMember, currentUser, change, create, groupName}) => {
    const pImg = (currentUser.profile.photo === '') ? '2.jpg' : currentUser.profile.photo;
    return (
        <div className='AddGroup'>
            <a onClick={addGroup} id='close'><i className="material-icons">close</i></a>
            <h4>그룹명</h4>
            <div className="input-field">
            <label>그룹명</label>
            <input type="text" onChange={change} value={groupName}>
            </input>
            </div>
            <h4>참여하는 사람</h4>
            <div className="btn add"><img src={pImg}/></div>
            <div className="btn add" onClick={addMember}><a><i className="material-icons">add</i></a></div>
            <a className="btn" id="create" onClick={create}>생성</a>
        </div>
    );
};

export default AddGroup;