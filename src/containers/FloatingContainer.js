import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Floating, Modal } from '../components/index';
import AddFriendContainer from './AddFriendContainer';

const FloatingContainer = () => {
    const [addFriendToggle, setAddFriendToggle] = useState(false);
    const dispatch = useDispatch();
    const handleAddFriend = () => {
        setAddFriendToggle(!addFriendToggle);
    }
    const modalOFF = e => {
        let a = e.target;
        if (a.className === 'modal display-block') {
            setAddFriendToggle(!addFriendToggle);
        }
    }
    return (
        <Floating
            addFriend = { handleAddFriend }
        >
            <div onClick={modalOFF}>
                <Modal
                    show={addFriendToggle}
                >
                    <AddFriendContainer
                        addFriend = { handleAddFriend }
                    />
                </Modal>
            </div>
        </Floating>
    );
};

export default FloatingContainer;