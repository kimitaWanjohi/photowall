import React, {useState} from 'react';
import Modal from './Modal'
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import {gql, useMutation } from '@apollo/client';


const EVENT_UPDATE = gql`
mutation($id: Int! $name: String! $venue: String! $time: String! $date: String! $image: Upload!){
    updateEvent(id: $id date: $date time: $time name: $name venue: $venue image: $image){
      event{
        id
      }
    }
  }
`
export default function UserDashEvent ({event, mediaUrl}) {
    const modalRef = React.useRef();
    const openModal = () => {
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.close()
    }
    const [name, setName] = useState(event.name)
    const [venue, setVenue] = useState(event.venue)
    const [time, setTime] = useState(event.time)
    const [date, setDate] = useState(event.date)

    const [updateEvent] = useMutation(EVENT_UPDATE)
    
    const onDrop = ([file]) => {
        updateEvent({variables: {
            id: event.id,
            name: name,
            venue: venue,
            time: time,
            date: date,
            image: file
        }})
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const delEvent = e => {
        e.preventDefault();
        axios.post('/graphql/', {
            query: `
            mutation($id: Int!){
                delEvent(id: $id){
                  event{
                    id
                  }
                }
              }
            `, 
            variables: {
                id: event.id
            }
        })
        .catch(err => console.log(err))
        modalRef.current.close()
    }

    const endEvent = e => {
        e.preventDefault();
        axios.post('/graphql/', {
            query: `
            mutation($id: Int!){
                endEvent(id: $id){
                event{
                  name
                }
              }
            }
            `,variables: {
                id: event.id
            }
        })
        .catch(err => console.log(err))
        modalRef.current.close()
    }
   
    return (   
    <>
     <div key={event.id}  className="col-md-4 pd-5" >
         <div className="card mx-vh">
         <div className="card-body">
         <img src={mediaUrl + event.coverImage} height="40%" alt="..." className="img-fluid" />
        <h4>{event.name}</h4>
        <p>Venue: {event.venue} </p>
        <p>Time: {event.time} </p>
        <p>Date: {event.date} </p>
        <button className={"btn btn-info"} onClick={openModal}>Edit</button>
         </div>
        <br></br>
        <Modal ref={modalRef}>
            <div className="container-fluid">
                <h2>Edit Event</h2>
                <div className="row row-flex card">
                    <img className="img-fluid" src={mediaUrl + event.coverImage} alt="..." />
                </div>
                <div className=' container-fluid'>
                    <h4> {event.name} </h4>
                    <div>
                    <div className="pd-10">
                            <label>Event Name</label>
                            <input type='text' value={name} className="form-control" onChange={e=> setName(e.target.value)} />
                        </div>
                        <div className="pd-10">
                            <label>Event Venue</label>
                            <input type='text' value={venue} className="form-control" onChange={e=> setVenue(e.target.value)} />
                        </div>
                        <div className="pd-10">
                            <label>Event Time</label>
                            <input type='time' value={time} className="form-control" onChange={e=> setTime(e.target.value)} />
                        </div>
                        <div className="pd-10">
                            <label>Event Date</label>
                            <input type='date' value={date} className="form-control" onChange={e=> setDate(e.target.value)} />
                        </div>
                        <div className="pd-10">
                            <label>Choose Image</label>
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <p className="btn btn-outline-info">Select Image</p> :
                                <p className="btn btn-outline-info">Select Image</p>
                            }
                            </div>
                        </div>


                        <div className="pd-10y">
                            <input type='submit' value='save Changes' className="btn btn-outline-info" onClick={closeModal} />
                        </div>
                    </ div>
                </div>
                <h5>options</h5>
                <div className="row row-flex row-cols-2">
                    <div className="pd-10 container-small">
                    <button className="btn btn-danger" onClick={delEvent}>Delete Event</button>
                    </div>
                    {
                        event.status === 'ONLINE' ? (
                      <div className="pd-10 container-small">
                          <button className="btn btn-primary" onClick={endEvent}>End Event</button>
                    </div>) : <div></div>
                    }
                    <br />
                    <div className="container-fluid">
                        <h3>Event Images</h3>
                        <div className="row row-flex">
                        {event.eventImages.map(image => (
                            <div key={image.id} className="col-md-4">
                                <img className="img-fluid" src={mediaUrl + image.image} alt="..." />
                            </div>
                        ))}
                        </div>
                    </div>

                
                </div>
            </div>
        </Modal>
         </div>

    </div>
    </>
    )
}
