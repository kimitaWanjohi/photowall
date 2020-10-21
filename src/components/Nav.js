import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import AuthBtn from './AuthBtn';

class Nav extends Component{
    render () {
        return (
            <div className="row row-flex pd-30">
                <div className="col-md-4 col-sm-6 col-xs-12">

                    <Link to="/"><div className="arrow-left arrow text-white"></div></Link>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <div className="">
                        <Link to="/"><img src="/images/logo.PNG" className="img-fluid" alt="logo"></img></Link>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <div className=" home-nav row">
                        <AuthBtn />
                    </div>
                </div>
                </div>
        )
    }
}

export default Nav