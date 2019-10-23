import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderContainer } from './index';
import { Main, Modal, Popup, AddGroup } from '../components/index';

const MainContainer = () => {
    const [addGroupToggle, setAddGroupToggle] = useState(false);

    const handleAddGroup = () => {
        setAddGroupToggle(!addGroupToggle);
    }

    const dispatch = useDispatch();

    return (
        <HeaderContainer>
            <Main
                click={handleAddGroup}
            />
            <Popup>
                <Modal
                    show={addGroupToggle}
                >
                    <AddGroup
                        click={handleAddGroup}
                    />
                </Modal>
            </Popup>
        </HeaderContainer>
    );
};

export default MainContainer;