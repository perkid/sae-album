import React from 'react';
import './EditProfile.css';
import { Link } from 'react-router-dom';

const EditProfile = ({ on, children }) => {
    const className = on ? 'card pf' : 'card pw';
    return (
            <div className='EditProfile'>
                <div className={className}>
                    <div className="card nav z-depth-0.1">
                        <ul>
                            <Link to="/accounts/edit" className="edit"><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="material-icons">mode_edit</i>&nbsp;&nbsp;프로필 수정</li></Link>
                            <Link to="/accounts/password/change" className="change"><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="material-icons">lock</i>&nbsp;&nbsp;비밀번호 변경</li></Link>
                        </ul>
                    </div>
                    <div className="section">
                        {children}
                    </div>
                </div>
        </div>
    );
};

export default EditProfile;