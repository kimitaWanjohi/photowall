import React, { useState, useContext} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {userContext} from '../userContext';
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';

function Login (){
    const {user}= useContext(userContext)
    const [username, setUsername ] = useState('')
    const[password, setPassword] = useState('')
    const[login, setLogin] = useState(false)
    const [err, setErr ] = useState('')

    const  handleSubmit = async e => {
        e.preventDefault()
        localStorage.clear()
        await axios.post('/graphql/', {
                query: `
                mutation TokenAuth($username: String! $password: String!){
                    tokenAuth(username: $username password: $password){
                      token
                    }
                  }
                `,
                variables: {
                    username: username,
                    password: password
                }
        })
        .then( res => {
            if(res.data.errors){
                setErr('invalid credentials')
            }else{
                localStorage.setItem('token', res.data.data.tokenAuth.token)
                setLogin(true)
            }
        })
        .catch( err  => console.log(err))
    }

    const dashData = [
        {
            title: 'HOME',
            path: '/'
        },
        {
            title: 'LIVE SHARE',
            path: '/events'
        },
        {
            title: 'SIGN UP',
            path: '/signup'
        }
    ]


    if (user) return( 
    <>
    <Redirect to="/dash" />
    <div className={'black-fill'}>
            <h1>already logged in as {user.username}</h1>
            <Link to ='/'><button className=" btn btn-primary">Home</button></Link>
    </div>

    </>
    )

    return (
        <>
        {login ? <Redirect to="/dash" /> : (
            <div  className="black-fill">
                <Dashboard>
                    <>
                    {
                        dashData.map((link, index) => (
                            <div key={index}>
                        <Link to={link.path} ><h2>{link.title}</h2></Link>
                            </div>
                        ))
                    }
                    </>
                </Dashboard>
                <div className="row container-fluid">
                        <div className="col-md-6">
                            <img className="img-fluid" src="/images/logo.PNG" alt="..." />
                        </div>
                    <div className="col-md-6">
                    <div className = "login-form bg-light rounded"  >
                        <h3 className="text-black card-title pd-30">Login</h3>
                     <form onSubmit={handleSubmit} className="pd-30">
                         <div className="pd-10">
                             <label className="text-black float-left"><h5>Username:</h5></label>
                             <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
                         </div>
                         <div className="pd-10">
                            <label className="text-black float-left"><h5>Password:</h5></label>
                            <input type="password" className="form-control" value={password}  onChange={e =>setPassword(e.target.value)} />
                        </div>
                <small className="text-danger">{err}</small>
                        <div className="pd-10">
                             <input type = "submit" value="login" className="btn btn-info login-btn rounded-pill" />
                        </div>    
                        <Link to="/signup"><small>Don't have an account? Click here</small></Link>
                    </form>
                    </div>
                    </div>
                </div>
           
        </div>
        )}
        
        </>
    )
}
export default Login