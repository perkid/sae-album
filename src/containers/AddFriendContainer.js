import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSearchRequest, deleteResult } from '../modules/authentication';
import { AddFriend } from '../components/index';

const AddFriendContainer = ({ handleAddFriend, toggle, props }) => {
    const [username, setUsername] = useState('');
    const users = useSelector(state => state.authentication.search.users, []);

    const dispatch = useDispatch();

    const userSearch = e => {
        setUsername(e.target.value);
    }

    useEffect(() => {
        if (username !== '') {
            async function fetchData() {
                // You can await here
                const response = await dispatch(userSearchRequest(username));
                // ...
            }
            fetchData();
        }
    }, [username]);

    useEffect(() => {
        setUsername('');
        dispatch(deleteResult());
    },[toggle]);

    const movePofilePage = e => {
        let a = e.target.id;
        props.history.push(`/${a}`);
        handleAddFriend();
    }
    return (
        <AddFriend
            handleAddFriend={handleAddFriend}
            search={userSearch}
            username={username}
            users={users}
            test={movePofilePage}
        />
    );
};

export default AddFriendContainer;