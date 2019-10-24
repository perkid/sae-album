import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PasswordChange, EditProfile, Footer } from '../components/index';
import { changePassRequest } from '../modules/authentication';
import { HeaderContainer } from './index';

const PasswordChangeContainer = (props) => {
    const profile = useSelector(state => state.authentication.status, []);
    const passChg = useSelector(state => state.authentication.passChg, []);

    const [password, setPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    const onChangeNewPassword1 = e => {
        setNewPassword1(e.target.value);
    }
    const onChangeNewPassword2 = e => {
        setNewPassword2(e.target.value);
    }

    const enabled = password.length>0 && newPassword1.length>0 && newPassword2.length>0;

    const dispatch = useDispatch();

    const handleChange = () => {
        const $ = window.$;
        const Materialize = window.Materialize;

        return dispatch(changePassRequest(profile.currentUser, password,newPassword1, newPassword2)).then(
            () => {
                if(passChg.status === "SUCCESS") {
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
    return (
        <HeaderContainer
            props={props}
        >
            <EditProfile>
                <PasswordChange
                    username={profile.username}
                    photo={profile.profile.photo}
                    onChangePassword={onChangePassword}
                    onChangeNewPassword1={onChangeNewPassword1}
                    onChangeNewPassword2={onChangeNewPassword2}
                    change={handleChange}
                    enabled={enabled}
                />
            </EditProfile>
            <Footer/>
        </HeaderContainer>
    );
};

export default PasswordChangeContainer;