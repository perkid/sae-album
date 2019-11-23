import React from 'react';
import './Main.css';

const GroupBox = ({ viewGroup, name, cover }) => {
    const coverImg = (cover === '') ? <i className="material-icons">photo_library</i> : <img src={cover}></img>;
    return (
        <div className="Group">
            <p>&nbsp;</p>
            <div className="btn group-box" onClick={viewGroup}>
                {coverImg}
            </div>
            <div className="name">{name}</div>
        </div>
    );;
}

const Main = ({ addGroup, groupList}) => {
    const groups = (groupList === undefined) ? undefined :
    groupList.map(group => (
        <GroupBox
            key={group.name}
            name={group.name}
            cover={group.cover}
        />
    ))
    return (
        <div className='card MainView'>
            <div className="groups">
                <div className="add-group">
                    <p><b>그룹 추가</b></p>
                    <div className="btn group-box" onClick={addGroup}>
                        <i className='material-icons' id="add">add</i>
                    </div>
                </div>
                    {groups}
            </div>
        </div>
    );
};

export default Main;