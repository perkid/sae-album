import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Sidebar, Floating, Notifications, } from '../components/index';

const HeaderContainer = ({children, props}) => {
    const status = useSelector(state => state.authentication.status, []);
    const [sidebarToggleState, setSidebarToggleState] = useState(false);
    const [noticeToggleState, setNoticeToggleState] = useState(false);
    const [value, setValue] = useState('');

    const handleSidebarToggle = () => {
        setSidebarToggleState(!sidebarToggleState);
    }
    const handleNoticeToggle = () => {
        setNoticeToggleState(!noticeToggleState);
    }

    const toggleOff = e => {

        let a = e.target;
        
        if (sidebarToggleState) {
            if(a.className!=='card-image' && a.className !=='card horizontal' && a.className !== 'small material-icons')
            setSidebarToggleState(false);
        }
        if (noticeToggleState) {
            setNoticeToggleState(false);
        }
    }
    
    const handleClick = () => {
        setValue('메신저 기능은 현재 지원되지 않습니다.');
    }
    const myPage = () => {
        props.history.push(`/${status.username}`)
    }

    return (
        <div className='Main' onClick={toggleOff}>
            <Header
                sidebarToggle={handleSidebarToggle}
                noticeToggle={handleNoticeToggle}
                myPage = {myPage}
            />
            {sidebarToggleState ? <Sidebar click={handleClick} value={value} /> : undefined}
            {noticeToggleState ? <Notifications/> : undefined }
            {children}
            {sidebarToggleState ?  undefined : <Floating/> }
        </div>
    );
};

export default HeaderContainer;