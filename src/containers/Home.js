import React from 'react';
import { MainContainer, Login } from './index';
import { useSelector } from 'react-redux';

const Home = (props) => {
    const status = useSelector(state => state.authentication.status, []);
    const loginF = <Login props={props}/>;
    const mainF =<MainContainer props={props}/>
    return (
            <div className="Home">
                {status.isLoggedIn ? mainF: loginF }
            </div>
    );
};

export default Home;