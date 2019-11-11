import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Authentication, Footer } from '../components/index';
import { loginRequest } from '../modules/authentication';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
     };
     const onChangePassword = e => {
       setPassword(e.target.value);
     };

    const login = useSelector(state => state.authentication.login, []);
    const dispatch = useDispatch();
    const handleLogin = () => {
        const $ = window.$;
        const Materialize = window.M;

        return dispatch(loginRequest(email, password)).then(
            () => {
                
                if(login.status === "SUCCESS") {
                    Materialize.toast({html: `Welcome ${email}!`});
                    props.props.history.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast({html:$toastContent});
                    return false;
                }
            }
        );
    }
        
    return (
    <div className = "loginView">
        <Authentication 
            onChangeEmail = {onChangeEmail}
            onChangePassword = {onChangePassword}
            onLogin={handleLogin}
        />
        <Footer/>
    </div>
    );
};

export default Login;