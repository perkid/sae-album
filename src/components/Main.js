import React from 'react';
import './Main.css';

const GroupBox = ({ viewGroup }) => {
    return (
        <div className="Group">
            <p>&nbsp;</p>
            <div className="btn group-box" onClick={viewGroup}>
                <img src="c2.jpg" />
            </div>
            <div className="name">그룹명</div>
        </div>
    );;
}

const Main = ({ addGroup }) => {
    return (
        <div className='card MainView'>
            <div className="groups">
                <div className="add-group">
                    <p><b>그룹 추가</b></p>
                    <div className="btn group-box" onClick={addGroup}>
                        <i className='material-icons' id="add">add</i>
                    </div>
                </div>
                    <GroupBox /><GroupBox /><GroupBox /><GroupBox /><GroupBox /><GroupBox />
            </div>
        </div>
    );
};

export default Main;