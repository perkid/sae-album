import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from '../components/Profile';
import HeaderContainer from './HeaderContainer';
import { logoutRequest, deleteProfileImgRequest, changeProfileImgRequest, getProfileRequest } from '../modules/authentication';
import { Modal, ProfileImgChange, Settings } from '../components/index';
import axios, { post } from 'axios';

const ProfileContainer = (props) => {
    
    const currentPage = props.match.params.id;
    
    const status = useSelector(state => state.authentication.status, []);
    const profile = useSelector(state => state.authentication.getProfile, []);

    const [modalImgState, setModalImgState] = useState(false);
    const [modalSetState, setModalSetState] = useState(false);
    const [imgPath, setImgPath] = useState('');

    const handleImgChange = e => {
        setImgPath(e.target.value);
        handleSubmit();
    }
    const handleUpload = () => {
        document.getElementById('upload').click();
    }


    const profileChg = useSelector(state => state.authentication.profileChg, []);

    const dispatch = useDispatch();
    const onLogout = () => dispatch(logoutRequest());

    const handleImgModal = () => {
        setModalImgState(!modalImgState);
    }
    
    const handleSetModal = () => {
        setModalSetState(!modalSetState);
    }
    
    const handleLogout = () => {
        const Materialize = window.Materialize;
        onLogout().then(
            () => {
                Materialize.toast('Good Bye!', 2000);
                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };
                window.location.href = '/';
                // this.props.history.push('/');
                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
            );
        }
        const getProfile = () => {
            return dispatch(getProfileRequest(currentPage));
        }

        useEffect(()=>{
            getProfile()
        },[currentPage]);
        
        const handleImgDelete = () => {
            const $ = window.$;
            const Materialize = window.Materialize;
            
            return dispatch(deleteProfileImgRequest(status.currentUser)).then(
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
    const handleSubmit = e => {
        fileUpload(document.forms[0].upload.files[0]);
    }

    const fileUpload = (file) => {
        const $ = window.$;
        const Materialize = window.Materialize;

        let email = status.currentUser;
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

    const modalOFF = e => {
        let a = e.target;
        if (a.className === 'modal display-block') {
            setModalImgState(false);
            setModalSetState(false);
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

    const settings =
        <Settings
            modalToggle={handleSetModal}
            onLogout={handleLogout}
        ></Settings>;



    if(currentPage===status.username){
    return (
        <HeaderContainer
            props={props}
        >
            <Profile
                imgModal={handleImgModal}
                setModal={handleSetModal}
                userName={status.username}
                name={status.name}
                photo={status.profile.photo}
                bio={status.profile.bio}
                onLogout={onLogout}
                mypage={true}
            />
            <div onClick={modalOFF}>
                <Modal
                    show={modalImgState}
                >
                    {profileImg}
                </Modal>
                <Modal
                    show={modalSetState}
                >
                    {settings}
                </Modal>
            </div>
        </HeaderContainer>
    );
    } else {
        return (
            <HeaderContainer
                props={props}
            >
                <Profile
                    imgModal={handleImgModal}
                    setModal={handleSetModal}
                    userName={profile.username}
                    name={profile.name}
                    photo={profile.photo}
                    bio={profile.bio}
                    onLogout={onLogout}
                    mypage={false}                   
                />
            </HeaderContainer>
        )
    }
};

export default ProfileContainer;