import React from 'react';
import './PasswordChange.css';

const PasswordChange = ({username, photo, onChangePassword, onChangeNewPassword1, onChangeNewPassword2, change, enabled}) => {
    const img = '/'+photo;
    const btnName= enabled ? 'chg btn' : 'btn disabled'
    return (
        <div className='PasswordChange'>
            <h4>비밀번호 변경</h4>
            <br></br>
            <div className="divider"></div>
            {photo === '' ? <img src='/2.jpg'></img> : <img src={img}></img>}
            <h5>{username}</h5>
                        <div className="box">
                        <div className="card-content">
                            <div className="row"></div>
                            <div className="input-field col s12 password">
                                <label>현재 비밀번호</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="validate"
                                    onChange={onChangePassword}
                                     />
                            </div>
                            <div className="input-field col s12 password">
                                <label>새 비밀번호</label>
                                <input
                                    name="newPassword1"
                                    type="password"
                                    className="validate"
                                    onChange={onChangeNewPassword1}
                                    />
                            </div>
                            <div className="input-field col s12 password">
                                <label>비밀번호 확인</label>
                                <input
                                    name="newPassword2"
                                    type="password"
                                    className="validate"
                                    onChange={onChangeNewPassword2}
                                    />
                            </div>
                        </div>
                        <a className={btnName} onClick={change}
                        >비밀번호 변경</a>
                        </div>
        </div>
    );
};

export default PasswordChange;