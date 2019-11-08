import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderContainer } from './index';
import { Main, Modal, Popup, AddGroup, AddMember } from '../components/index';

const MainContainer = (props) => {
    const [addGroupToggle, setAddGroupToggle] = useState(false);
    const [addMemberToggle, setAddMemberToggle] = useState(false);

    const friendsList = useSelector(state => state.friend.friendsList.list, []);
    const status = useSelector(state => state.authentication.status, []);
    const handleAddGroup = () => {
        setAddGroupToggle(!addGroupToggle);
    }

    const handleAddMember = () => {
        setAddMemberToggle(!addMemberToggle);
    }

    const dispatch = useDispatch();

    const modalOFF = e => {
        let a = e.target;
        if (a.className === 'modal display-block') {
            setAddMemberToggle(!addMemberToggle);
        }
    }
    return (
        <HeaderContainer
            props={props.props}
        >
            <Main
                addGroup={handleAddGroup}
            />
            <Popup>
                <Modal
                    show={addGroupToggle}
                >
                    <AddGroup
                        currentUser={status}
                        addGroup={handleAddGroup}
                        addMember={handleAddMember}
                    >
                    </AddGroup>
                </Modal>
            </Popup>
            <div onClick={modalOFF}>
                <Modal
                    show={addMemberToggle}
                >
                    <AddMember
                        friendsList={friendsList}
                    />
                </Modal>
            </div>
            
        </HeaderContainer>
    );
};

export default MainContainer;