import React, {useState, useMemo, useEffect} from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EventList from './components/EventList';
import Event from './components/Event';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dash from './components/Dash';
import {userContext} from './userContext';
import axios from 'axios';
import {gql, useQuery} from '@apollo/client';

const GET_USER = gql`
  {
    me{
      id
      username
      email
      eventSet{
        id
        name
        venue
        date
        time
        status
        coverImage
        eventImages{
          id
          image
        }
      }
      profile{
        id
        image
        firstName
        lastName
        bio
        facebook
        instagram
        twitter
      }
    }
  }
`

function App({mediaUrl}){
   const { loading, error, data} = useQuery(GET_USER)
    const[user, setUser] = useState(null)
    const providerUser = useMemo(() => ({user, setUser}), [user, setUser])

    const getUser = async () => {
      const token = localStorage.getItem('token')
      if (data){
          const token = localStorage.getItem('token')
          if (token===null){
            setUser(null)
          }else{
            setUser(data.me)
          }
      }else{
        setUser(null)
      }
    }

    useEffect(() => {
      getUser()
    })

    if(loading) return <p>loading</p>
    return (
      <div className="black" >
        <Router>
          <Switch> 
            <userContext.Provider value={providerUser}>
              <Route path="/" exact component={Home}/>
              <Route path="/events" exact component={() => <EventList mediaUrl={mediaUrl}/>}/>
    <Route path="/events/:id" component={Event}  />
              <Route path="/login" exact component={Login } />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/dash" exact component={()=> <Dash mediaUrl={mediaUrl} />} />
            </userContext.Provider>
          </Switch>
          <div>
            <Footer />
          </div>
        </Router>
        
      </div>
    );
}

export default App;
