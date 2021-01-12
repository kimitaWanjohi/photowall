import React from 'react';
import Modal from './Modal'
import { Link } from 'react-router-dom'
import {useQuery, gql} from '@apollo/client'
import Spinner from "./Spinner"

const EVENT_IMAGES = gql`
query EventImages_UserImage($event_id: Int!, $user_id: Int!) {
    allImages(eventId: $event_id)
    userImage(userId: $user_id)
  }
`


function EventItem  ({event}) {
    const modalRef = React.useRef();
    const openModal = () => {
        modalRef.current.openModal()
    }
    const {loading, error, data} = useQuery(EVENT_IMAGES, {variables: {event_id: event.id, user_id: event.user.id}})

    if(loading) return <Spinner />
    if(error) return <p>something went wrong :*( </p>
    return (
        <div className="card-card card col-md-4">
                            <Link to={`events/${event.id}`}><img src={data.allImages[0]} className=" img-fluid card-img-top" alt="..." /></Link>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-4" onClick={openModal}>
                                        <img src={data.userImage} alt="..." className="img-fluid round"/>
                                    </div>
                                    <Modal ref={modalRef}>
                                    <button onClick={() => modalRef.current.close()} className="close">X</button>
                                    <div className="card col-md-12">
                                        <img src={data.userImage} className="img-fluid img-modal card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h2 className="card-text text-black">{event.user.profile.firstName + ' ' + event.user.profile.lastName}</h2>
                                            <p className="card-text text-black">photographer.</p>
                                            <p className="card-text text-black">{event.user.profile.bio}</p>
                                            <div className="social-container row-cols-3">
                                                <a href={ event.user.profile.facebook}><small><img src='social/facebook.png' className="social" alt='...' /></small></a> {'  '}
                                                <a href={event.user.profile.instagram}><small><img src='social/instagram.png' className="social" alt='...' /></small></a> {'  '}
                                                <a href={event.user.profile.twitter}><small><img src='social/twitter.png' className="social" alt='...' /></small></a>{'  '}
                                            </div>
                                            
                                            <small className="text-black-50"> <p className="text-black-50 modal-foot">member since:{event.user.profile.memberSince.substring(0, 10)}</p></small>
                                        </div>
                                    </div>
                                </Modal>
                                    <div className="text-white col-md-6 float-right bg-gray">
                                        <div>
                                        <h4 style={{ color: 'black'}}> { event.name }</h4>
                                        <h6 style={{ color: 'black'}}> venue: { event.venue }</h6>
                                        <h6 style={{ color: 'black'}}> date: { event.date }</h6>
                                        <h6 style={{ color: 'black'}}> time: { event.time }</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    )
}

export default EventItem