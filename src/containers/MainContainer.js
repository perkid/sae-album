import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderContainer } from './index';
import { Main, Modal, Popup, AddGroup, AddMember } from '../components/index';
import { createGroupRequest } from '../modules/album';
const MainContainer = (props) => {
    const [addGroupToggle, setAddGroupToggle] = useState(false);
    const [addMemberToggle, setAddMemberToggle] = useState(false);
    const [groupName, setGroupName] = useState('');

    const friendsList = useSelector(state => state.friend.friendsList.list, []);
    const status = useSelector(state => state.authentication.status, []);

    const handleAddGroup = () => {
        setAddGroupToggle(!addGroupToggle);
    }

    const handleAddMember = () => {
        setAddMemberToggle(!addMemberToggle);
    }
    const handleChange = e => {
        setGroupName(e.target.value);
    }
    const dispatch = useDispatch();

    const handleCreate = () => {
        setAddGroupToggle(!addGroupToggle);
        return dispatch(createGroupRequest(groupName, status.username))
    }
    
    useEffect(() => {
        setGroupName('');
    },[addGroupToggle]);


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
                        change={handleChange}
                        create={handleCreate}
                        groupName={groupName}
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