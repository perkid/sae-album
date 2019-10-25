import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = ({ userName, name, photo, bio, imgModal, setModal, mypage }) => {
    const profileImg = (photo === '') ? <img src="2.jpg"></img> : <img src={photo}></img>;
    const profileView = 
    <div className="wrapper">
        <div className="infoWrapper">
            <div className="imgWrapper">
                <div className="photoWrapper">
                    {mypage ? <div className="btn" onClick={imgModal}>
                        {profileImg}
                    </div> : <div className="btn">{profileImg}</div>}

                </div>
            </div>
            <div className="info">
                {mypage ?
                    <div className="idBox">
                        <h4>{userName}</h4>

                        <Link to="/accounts/edit" className="edit-profile"><button className="white">프로필 편집</button></Link>
                        <a onClick={setModal} id="setting"><i className="material-icons">settings</i></a>
                    </div> :
                    <div className="idBox">
                        <h4>{userName}</h4>
                    </div>
                }
                <p><b>{name}</b></p>
                <p>{bio}</p>
            </div>
        </div>
        {mypage ?
            <div className="wrapper"> 
                <div className="menu">친구목록 | 저장됨</div>
                <div className="mycontent"></div>
            </div> : 
            <div className="wrapper">
                <div className="menu">함께 참여중인 그룹</div>
                <div className="content"></div>
            </div>
        }
    </div>
    const notFoundUser = <div className="notfound"><p>죄송합니다 해당 페이지를 찾을 수 없습니다.</p></div>
    return (
        <div className='Profile'>
            {userName===''? notFoundUser: profileView}
        </div>
    );
};

export default Profile;