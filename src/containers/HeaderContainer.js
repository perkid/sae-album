import React, { useState } from 'react';
import { Header, Sidebar, Floating, Notifications, } from '../components/index';

const Main = ({children}) => {
    const [sidebarToggleState, setSidebarToggleState] = useState(false);
    const [noticeToggleState, setNoticeToggleState] = useState(false);
    const [value, setValue] = useState('');

    const handleSidebarToggle = () => {
        setSidebarToggleState(!sidebarToggleState);
    }
    const handleNoticeToggle = () => {
        setNoticeToggleState(!noticeToggleState);
    }

    const toggleOff = () => {
        if (sidebarToggleState) {
            setSidebarToggleState(false);
        }
        if (noticeToggleState) {
            setNoticeToggleState(false);
        }
    }
    
    const handleClick = () => {
        setSidebarToggleState(true);
        setValue('');
    }


    return (
        <div className='Main' onClick={toggleOff}>
            <Header
                sidebarToggle={handleSidebarToggle}
                noticeToggle={handleNoticeToggle}
            />
            {sidebarToggleState ? <Sidebar click={handleClick} value={value} /> : undefined}
            {noticeToggleState ? <Notifications/> : undefined }
            {children}
            {sidebarToggleState ?  undefined : <Floating/> }
        </div>
    );
};

export default Main;