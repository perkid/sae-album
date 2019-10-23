import React from 'react';
import './Main.css';

const Main = ({click}) => {
    return (
        <div className='card MainView'>
            <p><b>그룹 추가</b></p>
            <div className="btn addbox" onClick={click}>
            <i className='material-icons' id="add">add</i>
            </div>
        </div>
    );
};

export default Main;