import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSearchRequest, deleteResult } from '../modules/authentication';
import { addFriendRequest } from '../modules/friend';
import { AddFriend } from '../components/index';
import { formatResultsErrors } from 'jest-message-util';

const AddFriendContainer = ({ handleAddFriend, toggle, props, currentUser }) => {
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
                const response = await dispatch(userSearchRequest(username, currentUser));
                
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

    const addFriend = e => {

        let a = e.target.id;
        let result = window.confirm(`${a}님에게 친구 요청을 보내겠습니까?`);
        if(result){
            dispatch(addFriendRequest(currentUser, a));
            alert('요청을 보냈습니다.');
        }
    }
    return (
        <AddFriend
            handleAddFriend={handleAddFriend}
            search={userSearch}
            username={username}
            users={users}
            visit={movePofilePage}
            addFriend={addFriend}
            currentUser={currentUser}
        />
    );
};

export default AddFriendContainer;