import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AuthBtn from './AuthBtn';


function Home() {
    return (
        <div className="container-fluid black-fill text-white home-nav">
            <div>
                <Link to="/events">
                    <h1 style={{margin: 'auto', justifyContent: 'center', color: 'white'}}>LIVE SHARE</h1>
                </Link>
                <hr />
                <AuthBtn />
            </div>
            <div className="img-container">
                <img src="/images/logo.PNG" alt="logo" className="img-fluid"/>
                
            </div>
            <Link to="/events">
            <button className="btn gotolive-btn btn-lg bg-warning rounded-pill"><b>GO TO LIVE</b></button>
            </Link>
        </div>
    )
}


export default Home;