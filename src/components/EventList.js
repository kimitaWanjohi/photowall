import React from 'react';
import { gql, useQuery } from '@apollo/client';
import '../App.css';
import Spinner from './Spinner';
import EventItem from './EventObj'
import Nav from './Nav';

const GET_EVENTS = gql`
{
  allEvents{
  	id
    name
    venue
    time
    date
    status
    user{
      id
      username
      profile{
        id
        image
        firstName
        lastName
      	bio
        memberSince
        instagram
        twitter
        facebook
      }
    }
  }
}`


function EventList(){
    const { loading, error, data } = useQuery(GET_EVENTS)
    if(loading) return <div className="spinner"> <Spinner /> </div>
  
    return (
        <div className="black-fill">
           <Nav />
           <div style={{border: "10px", paddingTop: "30px"}}>
               <h1 style={{textAlign: 'center'}}>LIVE EVENTS</h1>
                <div className='row row-flex container-fluid'>
                {error? <p className="spinner">whoops... something went wrong</p>:
                       data.allEvents.map(event => {
                        if(event.status === 'ONLINE'){
                          return(
                            <EventItem key={event.id}  event={event} />
                          )
                        }
                       })
                   }
                </div>
           </div>
        </div>
    )
}

export default EventList;
