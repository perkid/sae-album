import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddFriend } from '../components/index';

const AddFriendContainer = ({addFriend}) => {
    const dispatch = useDispatch();
    return (
        <AddFriend
            addFriend={addFriend}
        />
    );
};

export default AddFriendContainer;