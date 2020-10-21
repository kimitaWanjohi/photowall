import React, {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Dashboard from './Dashboard';
import {DashData} from './DashData';
import {userContext} from '../userContext';
import {useDropzone} from 'react-dropzone';
import {gql, useMutation } from '@apollo/client';
import UserDashEvent from './UserDashEvent';
import Modal from 'react-modal';
import {useQuery} from '@apollo/client';
import {v4 as uuidv4} from 'uuid';

const Me= gql`
{
    me{
        username
    }
}
`


Modal.setAppElement('#root')

function Dash({mediaUrl}) {
    const {user} = useContext(userContext)

    const { loading } = useQuery(Me)
    if (loading) return <p>loading</p>

    return (
        <> 
        {user === null ? <p>...</p> : (
            <>
                         <Dashboard>
                         <>
                         <div>
                             <h1 className="pd-10">DON ARTS</h1>
                             <div className="img-dash rounded-circle pd-10">
                                 <img className="img-fluid round img profile-img" src={mediaUrl + user.profile.image} width="40px"  height="40px" alt="..." />
                             </div>
                             <h5 style={{margin: 'auto', textAlign: 'center'}}> Hi {user.profile.firstName ? user.profile.firstName : user.username}</h5>
                         </div>
                      
                         {
                              DashData.map((link, index) => (
                                  <div key={index}>
                                     <Link to={link.path} ><h4 className={' nav-text pd-10 a'} > {link.title}</h4></Link>
                                  </div>
                              ))
                          }
                          </>
                      </Dashboard>
                      <div className="container bg-light text-black">
                          <div>
                              <h2>Dashboard</h2>
                              <hr />
                                <div className='container-fluid'>
                                     
                                    <Nav mediaUrl={mediaUrl} user ={user} />

                                    <br/>
                                    <h3>All Your Events -- {user.profile.firstName? user.profile.firstName : user.username}</h3>
                                    <div className ="row row-flex">
                                        {
                                            user.eventSet.map((event) => (
                                                <UserDashEvent mediaUrl={mediaUrl} event={event} key={event.id} />
                                            ))
                                        }
                                    </div>
                                </div>
                          </div> 
                      </div>
                      </>
        )}
        </>

    )
}
 export default Dash

const EDIT_PROFILE = gql`
mutation UPdateProfile($bio: String! $facebook: String! $firstName: String! $image: Upload! $instagram: String! $lastName: String! $twitter: String! $userId: Int!){
    updateProfile(bio: $bio, facebook: $facebook, firstName: $firstName, image: $image, instagram: $instagram, lastName: $lastName, twitter: $twitter, userId: $userId){
      profile{
        firstName
        image
        user{
          id
        }
      }
    }
  }
`

export const EditProf = ({user, mediaUrl}) => {
    const { profile } = user
    const [firstname, setFirstname] = useState(profile.firstName)
    const [lastname, setLastname] = useState(profile.lastName)
    const [bio, setBio] = useState(profile.bio)
    const [facebook, setFacebook ] = useState(profile.facebook)
    const [twitter, setTwitter] = useState(profile.twitter)
    const [instagram, setInstagram] = useState(profile.instagram)
    const [image, setImage] = useState(null)

    const [editProfile] = useMutation(EDIT_PROFILE)


     return(
         <>
            <div className="container-fluid" >
            <form className="float-right"><input type="submit" className="text-danger float-right" value="X"/></form>
                <div>
                    <div className="img-dash rounded-circle pd-10">
                            <img className="img-fluid round img profile-img" src={mediaUrl + user.profile.image} width="40px"  height="40px" alt="..." />
                        </div>
                        <h3 style={{textAlign: 'center'}}>{user.username} Profile</h3> 
                </div>

                <br/>
                <form onSubmit={() => {
                            editProfile({
                                variables: {
                                    image: image,
                                    firstName: firstname,
                                    lastName: lastname,
                                    bio: bio,
                                    userId: user.id,
                                    twitter: twitter,
                                    instagram:instagram,
                                    facebook: facebook
                    
                                }
                            })
                }}>
                <div className="pd-5">
                        <label>First name</label>
                        <input type='text'  onChange={e=>setFirstname(e.target.value)} value={firstname} className="form-control" />
                    </div>
                    <div className="pd-5">
                        <label>Last name</label>
                        <input type='text' className="form-control" onChange={e=>setLastname(e.target.value)} value={lastname} />
                    </div>
                    <div className="pd-5">
                        <label>bio</label>
                        <textarea type='text' className="form-control" onChange={e=>setBio(e.target.value)} value={bio} />
                    </div>
                    <div className="pd-5">
                        <label>Facebook Link</label>
                        <input type='text' className="form-control" placeholder="eg... http://www.facebook.com/username/" onChange={e=>setFacebook(e.target.value)} value={facebook} />
                    </div>
                    <div className="pd-5">
                        <label>Instagram Link</label>
                        <input type='text' className="form-control" placeholder="eg... http://www.instagram.com/username/" onChange={e=>setInstagram(e.target.value)} value={instagram}/>
                    </div>
                    <div className="pd-5">
                        <label>Twitter Link</label>
                        <input type='text' className="form-control" placeholder="eg... http://www.twitter.com/username/" onChange={e=>setTwitter(e.target.value)} value={twitter} />
                    </div>

                    <div className="pd-10">
                            <label>Profile Image</label>
                                <input type="file" className="form-control-file" onChange={e => {setImage(e.target.files[0])}} />
                        </div>
                            
                    <div className="pd-5">
                        <input type='submit' className="btn btn-outline-info" value="Save Profile" />
                    </div>
                </form>
            </div>
         </>
     )
 }

 const Nav = ({mediaUrl,  user}) => {
     
        //profileModal functions

        const [profileOpen, setProfileOpen] = useState(false)
        const openProfile = () => {
            setProfileOpen(true)
        }
        const closeProfile = () => {
            setProfileOpen(false)
        }
    
        //CreateEvent Modal
        const [eventOpen, setEventOpen] = useState(false)
        const openEvent = () => {
            setEventOpen(true)
        }
        const closeEvent = () => {
            setEventOpen(false)
        }
        
        const back =  () => {
            console.log('name')
            return <Redirect to='/dash' />
        }
     return (
        <div className="nav-justified">
        <div className="row row-cols-2">
        <div  className="text-black a nav-menu-items" onClick={openEvent}>
                <h3 className="txt-algn-cent">Create Event</h3>
                <Modal isOpen={eventOpen} onRequestClose={closeEvent}>
                    <>
                        <CreateEvent mediaUrl={mediaUrl} user={user} />
                    </>
                </Modal>
            </div>
            <div className="text-black a nav-menu-items" onClick={openProfile}>
                <h3 className=" txt-algn-cent">Edit Profile</h3> 
                <Modal isOpen={profileOpen} onRequestClose={closeProfile}>
                    <>
                    <EditProf  mediaUrl={mediaUrl} user={user}/>
                    </>
                </Modal>
            </div>
        </div>
    </div>
     )
 }

const CREATE_EVENT = gql`
mutation($eventKey: String! $name: String! $date:String! $userId: Int $venue: String! $image: Upload! $time: String!){
    createEvent(coverImage: $image, date: $date, eventKey: $eventKey, name: $name, time: $time, userId: $userId, venue: $venue){
      event{
          id
          name
      }
    }
  }
  
`
const UPLOAD_IMAGE = gql`
mutation UploadImages($eventId: Int! $image: Upload!){
    uploadImage(eventId: $eventId image: $image){
      image{
        id
      }
    }
  }
`

 const CreateEvent = ({mediaUrl, user}) => {

    const [eventName, setEventName] = useState(null)
    const [eventVenue, setEventVenue] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [image, setImage] = useState(null)
    const [eventCreated, setEventCreated] = useState(false)
    const [key, setKey] = useState(null)

    const [UploadImages] = useMutation(UPLOAD_IMAGE)


    const onDrop = (files) => {
        console.log(data.createEvent.event)
        console.log(data.createEvent.event.id)
        files.forEach( file => {
            UploadImages({
                variables: {
                    eventId: data.createEvent.event.id,
                    image: file
                }
            })
        });
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const [createEvent, {data}] = useMutation(CREATE_EVENT)

    return(
        <>
        <div className="container-fluid" >
            <form className="float-right"><input type="submit" className="text-danger float-right" value="X"/></form>
            <div>
                <h3>Create Event</h3>
                <br/>
                <form onSubmit={e=>{
                    e.preventDefault()
                    createEvent({
                        variables: {
                            image: image,
                            name: eventName,
                            venue: eventVenue,
                            date: date,
                            time: time,
                            userId: user.id,
                            eventKey: key,
                        }
                    });
                    setEventCreated(true)
                }}>
                <div className="pd-5">
                        <label>Event Name</label>
                        <input type="text" onChange={e=>{
                            setEventName(e.target.value); 
                            const keyItem = `${uuidv4()}`
                            setKey(keyItem);
                            }} className="form-control"/>
                    </div>
                    <div className="pd-5">
                        <label>Event Venue</label>
                        <input type="text"  onChange={e=>{setEventVenue(e.target.value)}} className="form-control"/>
                    </div>
                    <div className="pd-5">
                        <label>Event Date</label>
                        <input type="date" onChange={e=>{setDate(e.target.value)}} className="form-control"/>
                    </div>
                    <div className="pd-5">
                        <label>Event Time</label>
                        <input type="time" onChange={e=>{setTime(e.target.value)}} className="form-control"/>
                    </div>
                    <div className="pd-5">
                        <label>Event Cover Image</label> <br/>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="pd-5">
                        <input type="submit" value="Create Event" className="btn btn-outline-info"/>
                    </div>
                </form>
                {
                    eventCreated ? <>
                    <div className="container-fluid">
                        <h4>Upload Images</h4>
                        <div>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                            <><p >click or drop images to upload to the event</p></>:
                            <><p >click to choose files</p> </>
                            }
                            </div>
                            </div>
                    </div>
                    </> : <p className="text-warning"> Upload Images here!! after creating Event</p>
                }
            </div>
        </div>
        </>
    )
 }