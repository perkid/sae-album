import React from 'react';
import './AddGroup.css';

const AddGroup = ({click}) => {
    return (
        <div className='AddGroup'>
            <a onClick={click} id='close'><i className="material-icons">close</i></a>
            <h4>그룹명</h4>
            <div className="input-field">
            <label>그룹명</label>
            <input type="text">
            </input>
            </div>
            <h4>참여하는 사람</h4>
            <div className="btn add"></div>
            <div className="btn add"><a><i className="material-icons">add</i></a></div>
            <a className="btn" id="create">생성</a>
        </div>
    );
};

export default AddGroup;