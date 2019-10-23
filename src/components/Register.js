import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = ({ onChangeEmail, onChangeUsername, onChangeName, onChangePassword, handleRegister }) => {
    return (
        <div className="container register">
            <Link className="logo" to="/">SAE Album</Link>
            <div className="card">
                <div className="header blue white-text center"></div>
                <div className="card-content">
                    <div className="row"></div>
                    <div className="input-field col s12 email">
                        <label>Email</label>
                        <input
                            name="email"
                            type="text"
                            className="validate"
                            //value={email}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className="input-field col s12 username">
                        <label>Username</label>
                        <input
                            name="username"
                            type="text"
                            className="validate"
                            //value={username}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className="input-field col s12 name">
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            className="validate"
                            //value={name}
                            onChange={onChangeName}
                        />
                    </div>
                    <div className="input-field col s12 password">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="validate"
                            //value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                </div>
                <a className="SignUP btn" onClick={handleRegister}
                >Sign UP</a>
            </div>
        </div>
    );
};

export default Register;