import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Sidebar, Notifications } from '../components/index';
import { getNotificationsRequest } from '../modules/notification';
import { getFriendsListRequest } from '../modules/friend';
import FloatingContainer from './FloatingContainer';

const HeaderContainer = ({ children, props }) => {
    const status = useSelector(state => state.authentication.status, []);
    const notice = useSelector(state => state.notification.notice.list, []);

    const [sidebarToggleState, setSidebarToggleState] = useState(false);
    const [noticeToggleState, setNoticeToggleState] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const handleSidebarToggle = () => {
        setSidebarToggleState(!sidebarToggleState);
    }

    const handleNoticeToggle = () => {
        getNotifications();
        setNoticeToggleState(!noticeToggleState);
    }

    const getNotifications = () => {
        return dispatch(getNotificationsRequest(status.username));
    }
    
    const getFriendsList = () => {
        return dispatch(getFriendsListRequest(status.username));
    }

    useEffect(() => {
        getNotifications()
        getFriendsList()
    }, [status]);
    
    const toggleOff = e => {
        let a = e.target;

        if (sidebarToggleState) {
            if (a.className !== 'card-image' && a.className !== 'card horizontal' && a.className !== 'small material-icons')
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
                myPage={myPage}
                login={status.username}
                noticeCnt={notice.length}
            />
            {sidebarToggleState ? <Sidebar click={handleClick} value={value} /> : undefined}
            {noticeToggleState ? <Notifications
                notice={notice}
                myPage={myPage}
            /> : undefined}
            {children}
            {sidebarToggleState ? undefined : <FloatingContainer
                props={props}
            />}
        </div>
    );
};

export default HeaderContainer;