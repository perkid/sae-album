import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderContainer } from './index';
import { Main, Modal, Popup, AddGroup, AddMember } from '../components/index';

const MainContainer = () => {
    const [addGroupToggle, setAddGroupToggle] = useState(false);
    const [addMemberToggle, setAddMemberToggle] = useState(false);

    const handleAddGroup = () => {
        setAddGroupToggle(!addGroupToggle);
    }

    const handleAddMember = () => {
        setAddMemberToggle(!addMemberToggle);
    }

    const dispatch = useDispatch();

    return (
        <HeaderContainer>
            <Main
                addGroup={handleAddGroup}
            />
            <Popup>
                <Modal
                    show={addGroupToggle}
                >
                    <AddGroup
                        addGroup={handleAddGroup}
                        addMember={handleAddMember}
                    >
                    </AddGroup>
                </Modal>
            </Popup>
            <Modal
                show={addMemberToggle}
            >
                <AddMember
                    addMember={handleAddMember}
                />
            </Modal>
        </HeaderContainer>
    );
};

export default MainContainer;