import React, {useContext} from 'react';
import {userContext} from '../userContext';
import {Link} from 'react-router-dom';
function AuthBtn () {
    const {user, setUser} = useContext(userContext)

    return (
        <>
            <div>
            {
                    user===null ? (
                <div className=" home-nav row">
                    <Link to="/login"><h3 className=" text-white home-link">Login</h3></Link> <h3>|</h3>
                    <Link to="/signup"><h3 className="home-link text-white">Sign Up</h3></Link>
                </div>) : (                <div className=" home-nav row">
                    <Link to="#" onClick={() => {
                        localStorage.clear()
                        setUser(null);
                    }
                        }><h3 className=" text-white home-link">Log out</h3></Link>
                </div>)
                }
            </div> 
        </>
    )
}

export default AuthBtn

