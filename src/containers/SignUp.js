import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerRequest } from '../modules/authentication';
import { Footer, Register } from '../components/index';

const SignUp = (props) => {
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const onChangeEmail = e => {
       setEmail(e.target.value);
    };
    const onChangeUsername = e => {
      setUsername(e.target.value);
    };
    const onChangeName = e => {
      setName(e.target.value);
    };
    const onChangePassword = e => {
      setPassword(e.target.value);
    };

    const register = useSelector(state => state.authentication.register, []);
    const dispatch = useDispatch();
    const handleRegister = () => {
        const $ = window.$;
        const Materialize = window.M;

        Materialize.toast('Success! Please log in.', 2000);
        

        return dispatch(registerRequest(email, username, name, password)).then(
            () => {
                if (register.status === "SUCCESS") {
                    props.history.push('/');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[register.errorCode - 1] + '</span>');
                    Materialize.toast({html: $toastContent});
                    return false;
                }
            });
    }
        

    return (
        <div className="signup">
        <Register
            onChangeEmail = {onChangeEmail}
            onChangeUsername = {onChangeUsername}
            onChangeName = {onChangeName}
            onChangePassword = {onChangePassword}
            handleRegister = {handleRegister}
        >
        </Register>
        <Footer/>
        </div>
    );
};

export default SignUp;