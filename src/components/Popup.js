import React from 'react';
import './Popup.css';

const Popup = ({children}) => {
    return (
        <div className='Popup'>
            {children}
        </div>
    );
};

export default Popup;