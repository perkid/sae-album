import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Floating, Modal } from '../components/index';
import AddFriendContainer from './AddFriendContainer';

const FloatingContainer = ({props}) => {
    const [addFriendToggle, setAddFriendToggle] = useState(false);

    const status = useSelector(state => state.authentication.status, []);
    const handleAddFriend = () => {
        if(status.username===''){
            window.location.replace('/');
        }
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
                        currentUser = {status.username}
                        handleAddFriend = { handleAddFriend }
                        toggle = {addFriendToggle}
                        props = {props}
                    />
                </Modal>
            </div>
        </Floating>
    );
};

export default FloatingContainer;