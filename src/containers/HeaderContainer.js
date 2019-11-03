import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Sidebar, Notifications } from '../components/index';
import { getNotificationsRequest } from '../modules/notification';
import FloatingContainer from './FloatingContainer';
import { getProfileRequest } from '../modules/authentication';

const HeaderContainer = ({ children, props }) => {
    const status = useSelector(state => state.authentication.status, []);
    const notice = useSelector(state => state.notification.notice.list, []);
    const profile = useSelector(state => state.authentication.getProfile, []);

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
        return dispatch(getNotificationsRequest(status.username)).then(
            // dispatch(getProfileRequest(notice[0].sender)).then(
            //     console.log(profile)
            // )
        );
    }
    useEffect(() => {
        for (let i = 0; i < notice.length; i++) {
            if (notice[i].sender !== undefined) {
                dispatch(getProfileRequest(notice[i].sender)).then(
                )
            }
        }
    }, [notice])
    console.log(profile)
    console.log(notice.length)
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
                                    profile={profile}
                                    notice={notice}
                                    noticeCnt={notice.length}
                                /> : undefined}
            {children}
            {sidebarToggleState ? undefined : <FloatingContainer
                props={props}
            />}
        </div>
    );
};

export default HeaderContainer;