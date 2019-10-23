import React from 'react';
import { Link } from 'react-router-dom';
import './Authentication.css';

const Authentication = ({ onChangeEmail, onChangePassword, onLogin }) => {
    return (
        <div className='Authentication'>
            <div className="imgwrapper">
                <img src="/logo512.png"></img>
            </div>
            <div className="container auth">
                <div className="logo">SAE Album</div>
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <label>Email</label>
                                <input
                                    name="Email"
                                    type="text"
                                    className="validate"
                                    onChange={onChangeEmail}
                                />
                            </div>
                            <div className="input-field col s12">
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="validate"
                                    onChange={onChangePassword}
                                />
                            </div>
                            <a id="submit" className="waves-effect waves-light btn"
                                onClick={onLogin}>SUBMIT</a>
                        </div>
                    </div>

                    <div className="footer">
                        <div className="card-content">
                            <div className="right" >
                                New Here? <Link to="/accounts/signup">Create an account</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Authentication;