import React from 'react';
import './ProfileImgChange.css';

const ProfileImgChange = ({modalToggle, imgDelete, uploadFile, upload, submit}) => {
    return (
        <div className='ProfileImgChange'>
            <ul className='modal-content z-depth-1'>
                <p>프로필 사진 바꾸기</p>
                <li className="divider" tabIndex="-1"></li>
                <li><a onClick={upload} >사진 업로드</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a id="red" onClick={imgDelete}>현재 사진 삭제</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a id="close" onClick={modalToggle}>닫기</a></li>
                <li></li>
            </ul>
            <form method="POST" encType="multipart/form-data" onSubmit={submit}>
                <input type="file" name="photo" id="upload" onChange={uploadFile}/>
            </form>


        </div>
    );
};

export default ProfileImgChange;