import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddMember } from '../components/index';

const AddMemberContainer = ({addMember}) => {

    const dispatch = useDispatch();

    return (
            <AddMember
                close={addMember}
            ></AddMember>
    );
};

export default AddMemberContainer;