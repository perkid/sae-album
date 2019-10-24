import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderContainer } from './index';
import { Main, Modal, Popup, AddGroup, AddMember } from '../components/index';

const MainContainer = (props) => {
    const [addGroupToggle, setAddGroupToggle] = useState(false);
    const [addMemberToggle, setAddMemberToggle] = useState(false);

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
                    />
                </Modal>
            </div>
        </HeaderContainer>
    );
};

export default MainContainer;