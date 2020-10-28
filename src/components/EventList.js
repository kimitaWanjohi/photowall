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
    coverImage
    time
    date
    status
    eventImages{
      id
      image
    }
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


function EventList({mediaUrl}){
    const { loading, error, data } = useQuery(GET_EVENTS)
    if(loading) return <div className="spinner"> <Spinner /> </div>
    if (error) return <p className="spinner">whoops... something went wrong</p>

  
    return (
        <div className="black-fill">
           <Nav />
           <div style={{border: "10px", paddingTop: "30px"}}>
               <h1 style={{textAlign: 'center'}}>LIVE EVENTS</h1>
                <div className='row row-flex container-fluid'>
                {
                       data.allEvents.map(event =>(
                           <EventItem key={event.id}  event={event} mediaUrl={mediaUrl}/>
                       ))
                   }
                </div>
           </div>
        </div>
    )
}

export default EventList;
