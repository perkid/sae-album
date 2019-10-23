import React from 'react';
import { MainContainer, Login } from './index';
import { useSelector } from 'react-redux';

const Home = (props) => {
    const status = useSelector(state => state.authentication.status, []);
    const loginF = <Login props={props}/>;
    return (
            <div className="Home">
                {/* {status.isLoggedIn ? <MainContainer/> : loginF } */}
                <MainContainer></MainContainer>
            </div>
    );
};

export default Home;