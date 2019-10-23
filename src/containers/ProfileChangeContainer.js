import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditProfile, ProfileChange, Footer, Modal, ProfileImgChange } from '../components/index';
import { changeProfileRequest, deleteProfileImgRequest, changeProfileImgRequest } from '../modules/authentication';
import { HeaderContainer } from './index';
import axios, { post } from 'axios';

const ProfileChangeContainer = () => {
    const profile = useSelector(state => state.authentication.status, []);
    const profileChg = useSelector(state => state.authentication.profileChg, []);

    const [modalImgState, setModalImgState] = useState(false);
    const [username, setUsername] = useState(profile.username);
    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.profile.bio);
    const [imgPath, setImgPath] = useState('');

    const handleImgChange = e => {
        setImgPath(e.target.value);
        handleSubmit();
    }
    const handleUpload = () => {
        document.getElementById('upload').click();
    }
    const handleSubmit = e => {
        fileUpload(document.forms[0].upload.files[0]);
    }

    const fileUpload = (file) => {
        const $ = window.$;
        const Materialize = window.Materialize;

        let email = profile.currentUser;
        const url = `http://localhost:4000/api/upload/photo/${email}`;
        const formData = new FormData();
        formData.append('photo', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return post(url, formData, config).then(
            (res) => {
                return dispatch(changeProfileImgRequest(email, res.data.path)).then(
                    () => {
                        if (profileChg.status === "SUCCESS") {
                            Materialize.toast('Success!', 2000);
                            return true;
                        } else {
                            let $toastContent = $('<span style="color: #FFB4BA">Error!</span>');
                            Materialize.toast($toastContent, 2000);
                            return false;
                        }
                    }
                )

            }).catch((err) => {
                console.log(err);
            });
    }


    const onChangeUsername = e => {
        setUsername(e.target.value);
    }
    const onChangeName = e => {
        setName(e.target.value);
    }
    const onChangeBio = e => {
        setBio(e.target.value);
    }

    const dispatch = useDispatch();

    const handleImgModal = () => {
        setModalImgState(!modalImgState);
    }

    const handleChange = () => {
        const $ = window.$;
        const Materialize = window.Materialize;

        return dispatch(changeProfileRequest(profile.currentUser, name, username, bio, profile.profile.photo)).then(
            () => {
                if (profileChg.status === "SUCCESS") {
                    Materialize.toast('Success!', 2000);
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Error!</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    const handleImgDelete = () => {
        const $ = window.$;
        const Materialize = window.Materialize;

        return dispatch(deleteProfileImgRequest(profile.currentUser)).then(
            () => {
                if (profileChg.status === "SUCCESS") {
                    Materialize.toast('Success!', 2000);
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Error!</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    const modalOFF = e => {
        let a = e.target;
        if (a.className === 'modal display-block') {
            setModalImgState(false);
        }
    }

    const profileImg =
        <ProfileImgChange
            modalToggle={handleImgModal}
            imgDelete={handleImgDelete}
            uploadFile={handleImgChange}
            upload={handleUpload}
            submit={handleSubmit}
        ></ProfileImgChange>;

    return (
        <HeaderContainer>
            <EditProfile on={true}>
                <ProfileChange
                    username={username}
                    chgUsername={onChangeUsername}
                    name={name}
                    chgName={onChangeName}
                    photo={profile.profile.photo}
                    bio={bio}
                    chgBio={onChangeBio}
                    modal={handleImgModal}
                    chgProfile={handleChange}
                ></ProfileChange>
            </EditProfile>
            <div onClick={modalOFF}>
                <Modal
                    show={modalImgState}
                >
                    {profileImg}
                </Modal>
            </div>
            <Footer />
        </HeaderContainer>
    );
};

export default ProfileChangeContainer;