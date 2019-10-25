import React from 'react';
import './Sidebar.css';

const Sidebar = ({click, value}) => {
    return (
        <div className='Sidebar'>

            <div className="col s12 m7">
                <div className="card horizontal">
                    <div className="card-image">
                        <ul>
                            <li><a onClick={click}><i className="small material-icons">face</i></a></li>
                            <li><a onClick={click}><i className="small material-icons">chat_bubble</i></a></li>
                        </ul>
                    </div>
                            <div className="content">{value}</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;