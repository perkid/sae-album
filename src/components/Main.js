import React from 'react';
import './Main.css';

const Main = ({addGroup}) => {
    return (
        <div className='card MainView'>
            <p><b>그룹 추가</b></p>
            <div className="btn addbox" onClick={addGroup}>
            <i className='material-icons' id="add">add</i>
            </div>
        </div>
    );
};

export default Main;