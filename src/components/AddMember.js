import React from 'react';
import './AddMember.css';

const AddMember = ({addMember}) => {
    return (
        <div className='AddMember'>
            <div className="input-field">
            <input></input>
            </div>
            <a onClick = {addMember}>닫기</a>
        </div>
    );
};

export default AddMember;