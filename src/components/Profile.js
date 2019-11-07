import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

const RequestList = ({ pPhoto, pUsername, movePofilePage, handleRefuse, handleAllow }) => {
    const pImg = (pPhoto === '') ? '2.jpg' : pPhoto;
    return (
        <li>
            <div className="RequestList">
                <div className="box"><img src={pImg}></img></div>
                <div className="namebox"><a id={pUsername} onClick={movePofilePage}>{pUsername}</a></div>
                <div className='send'><a id={pUsername} onClick={handleAllow}>확인</a> <a id={pUsername} onClick={handleRefuse}>요청 삭제</a></div>
            </div>
            <div className='divider'></div>
        </li>
    );
};

const Profile = ({ userName, name, photo, bio, imgModal, setModal, mypage, requestList, movePofilePage, handleRefuse, handleAllow }) => {
    const profileImg = (photo === '') ? <img src="2.jpg"></img> : <img src={photo}></img>;

    const requests = (requestList === undefined) ? <li></li> :
    requestList.map(request => (
        <RequestList
            key={request.username}
            pPhoto={request.photo}
            pUsername={request.username}
            movePofilePage={movePofilePage}
            handleRefuse={handleRefuse}
            handleAllow={handleAllow}
        />
    ))

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
                        <button className="white">친구신청</button>
                    </div>
                }
                <p><b>{name}</b></p>
                <p>{bio}</p>
            </div>
        </div>
        {mypage ?
            <div className="wrapper"> 
            <div className='divider'></div>
                <div className="menu">친구목록</div>
                <div className='divider'></div>
                <div className="mycontent">
                    {requestList===undefined ? undefined : <p id="p">{requests.length}개의 친구 요청</p> }
                    <ul>
                        {requests}
                    </ul>
                </div>
            </div> : 
            <div className="wrapper">
                <div className='divider'></div>
                <div className="menu">함께 참여중인 그룹</div>
                <div className='divider'></div>
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