import React, { useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import {userContext} from '../userContext';
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import {gql, useMutation} from '@apollo/client';


const GET_TOKEN = gql`
mutation GetToken($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

function Login (){
    const {user}= useContext(userContext)
    const [username, setUsername ] = useState('')
    const[password, setPassword] = useState('')
    const[login, setLogin] = useState(false)
    const [err, setErr ] = useState('')

    const [tokenAuth, {loading:tokenLoading}] = useMutation(GET_TOKEN)


    const loginMut = async (e) => {
        e.preventDefault();
        try{
            const{data} = await tokenAuth({variables: {
                    username: username,
                    password: password
                }})
            if(data){
                localStorage.setItem('token', data.tokenAuth.token)
            }
            setLogin(true)
        }catch(err){
            console.log(err)
            setErr('invalid credentials!! :(')
        }
    }

    if(user){
        return (
        <div >
        <Redirect to="/" />
        </div>
        )
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
                     <form onSubmit={loginMut} className="pd-30">
                         <div className="pd-10">
                             <label className="text-black float-left"><h5>Username:</h5></label>
                             <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
                         </div>
                         <div className="pd-10">
                            <label className="text-black float-left"><h5>Password:</h5></label>
                            <input type="password" className="form-control" value={password}  onChange={e =>setPassword(e.target.value)} />
                        </div>
                {tokenLoading ? <p style={{color: 'blue'}}>loading...</p> : <p></p> }
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