import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {userContext} from '../userContext';
import Dashboard from './Dashboard';
import {gql, useMutation} from '@apollo/client';

const SIGNUP  = gql`
mutation SIGNUP(
    $email: String!
    $password: String!
    $password1: String!
    $username: String!
  ) {
    signUp(
      email: $email
      password: $password
      password1: $password1
      username: $username
    ) {
      user {
        id
      }
    }
  }
`


function SignUp(){
    const { user } = useContext(userContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [err, setErr] = useState(null)
    const [signup, setSignup] = useState(false)

    const [signUpMut, {onError, onCompleted}] = useMutation(SIGNUP)

   const handleSubmit =  async (e) => {
       e.preventDefault()
       if(password1 !== password){
           setErr('passwords did not match')
       }else{
        try{
            await signUpMut({variables: {
                email: email,
                password: password,
                password1: password1,
                username: username
            }
         })
         setSignup(true)
        }catch (error){
            setErr('username already taken!')
            console.log(error)
        }
   }
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
    if (user) return (
        <>
        <div className={'black-fill'}>
                <h1>already logged in as {user.username}</h1>
                <Link to ='/'><button className=" btn btn-primary">Home</button></Link>
        </div>
    
        </>
    )


    return (
        <>
       {signup ? <Redirect to='/login' /> : (
            <div className="black-fill">
            <Dashboard>
                <div>
                {
                    dashData.map((link, index) => (
                        <div key={index}>
                    <Link to={link.path} ><h2>{link.title}</h2></Link>
                        </div>
                    ))
                }
                </div>
            </Dashboard>
            <div className="row container-fluid ">
                    <div className="col-md-6">
                        <img className="img-fluid" src="/images/logo.PNG" alt="..." />
                    </div>
                <div className="col-md-6">
                <div className = "login-form bg-light rounded"  >
                    <h3 className="text-black card-title pd-5">SignUp</h3>
                 <form onSubmit={handleSubmit} className="pd-5">
                 <div className="pd-5">
                         <label className="text-black float-left"><h5>Username:</h5></label>
                         <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value.toLowerCase())} />
                     </div>
                     <div className="pd-5">
                         <label className="text-black float-left"><h5>Email:</h5></label>
                         <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
                     </div>
                     <div className="pd-5">
                        <label className="text-black float-left"><h5>Password:</h5></label>
                        <input type="password" className="form-control" value={password}  onChange={e =>setPassword(e.target.value)} />
                    </div>
                    <div className="pd-5">
                        <label className="text-black float-left"><h5>Confirm Password:</h5></label>
                        <input type="password" className="form-control" value={password1}  onChange={e =>setPassword1(e.target.value)} />
                    </div>
            { err? <small className="text-danger"> {err}</small> : <p></p> }
                    <div className="pd-5">
                         <input type = "submit" value="Sign Up" className="btn btn-info login-btn rounded-pill" />
                    </div>   
                    <Link to="/Login"><small> Already  have an account? Click here</small></Link>
                </form>
                </div>
                </div>
    </div>
    </div>
       )}
        </>
    )
}

export default SignUp