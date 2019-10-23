import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddMember } from '../components/index';

const AddMemberContainer = ({}) => {

    const dispatch = useDispatch();

    return (
            <AddMember
            ></AddMember>
    );
};

export default AddMemberContainer;