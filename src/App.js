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
import {gql, useQuery} from '@apollo/client';
import Spinner from './components/Spinner';

const Me = gql`
{me{id username email eventSet{id name venue date time status}profile{id firstName lastName bio facebook instagram twitter}}}`


function App(){
    const[user, setUser] = useState(null)
    const providerUser = useMemo(() => ({user, setUser}), [user, setUser])
    const {loading, data} = useQuery(Me)

  useEffect( () => {
      if(data){
        const token = localStorage.getItem('token')
        if(token === null){
          setUser(null)
        }else{
          setUser(data.me)
        }
      }
    })

    if(loading) return <div className="black"><Spinner /></div>

    return (
      <div className="black" >
        <Router>
          <Switch> 
            <userContext.Provider value={providerUser}>
              <Route path="/" exact component={Home}/>
              <Route path="/events" exact component={EventList}/>
              <Route path="/events/:id" component={Event}  />
              <Route path="/login" exact component={Login } />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/dash" exact component={Dash} />
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
