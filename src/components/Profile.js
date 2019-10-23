import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = ({userName, name, photo, bio , imgModal, setModal}) => {
    return (
        <div className='Profile'>
            <div className="wrapper">
                <div className="infoWrapper">
                    <div className="imgWrapper">
                        <div className="photoWrapper">
                            <div className="btn" onClick={imgModal}>
                                {photo ===''? <img src="2.jpg"></img> : <img src={photo}></img>}
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <div className="idBox">
                            <h4>{userName}</h4>
                            <Link to="/accounts/edit" className="edit-profile"><button className="white">프로필 편집</button></Link>
                            <a onClick={setModal} id="setting"><i className="material-icons">settings</i></a>
                        </div>
                            <p><b>{name}</b></p>
                            <p>{bio}</p>
                    </div>
                </div>
                <div className="menu">친구목록 | 저장됨</div>
                <div className="content"></div>
            </div>
        </div>
    );
};

export default Profile;