import React, {useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import {DashData} from './DashData';
import {userContext} from '../userContext';
import {useDropzone} from 'react-dropzone';
import {gql, useMutation, useQuery } from '@apollo/client';
import UserDashEvent from './UserDashEvent';
import Modal from 'react-modal';
import Spinner from './Spinner';

const UserImage = gql`
query UserImage($user_id: Int!){
    userImage(userId: $user_id)
  }
`


Modal.setAppElement('#root')

function Dash({mediaUrl}) {
    const {user} = useContext(userContext)
    
    return (
        <> 
        {user === null ? <p>Login required</p> : (
            <>
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
mutation UPdateProfile(
    $bio: String!
    $facebook: String!
    $firstName: String!
    $instagram: String!
    $lastName: String!
    $twitter: String!
    $userId: Int!
  ) {
    updateProfile(
      bio: $bio
      facebook: $facebook
      firstName: $firstName
      instagram: $instagram
      lastName: $lastName
      twitter: $twitter
      userId: $userId
    ) {
      profile {
        firstName
        user {
          id
        }
      }
    }
  }
  
`
const ChangeUserImage = gql`
mutation ChageUserImage($user_id: Int!, $image: Upload!) {
    changeUserImage(image: $image, userId: $user_id) {
      profile {
        image
      }
    }
  }
` 


export const EditProf = ({user}) => {
    const { profile } = user
    const [firstname, setFirstname] = useState(profile.firstName)
    const [lastname, setLastname] = useState(profile.lastName)
    const [bio, setBio] = useState(profile.bio)
    const [facebook, setFacebook ] = useState(profile.facebook)
    const [twitter, setTwitter] = useState(profile.twitter)
    const [instagram, setInstagram] = useState(profile.instagram)
    const [image, setImage] = useState(null)

    const [editProfile] = useMutation(EDIT_PROFILE)
    const [changeUserImage] = useMutation(ChangeUserImage)
    const {loading: userImageLoading, data: userImageData, error: userImageErr} = useQuery(UserImage, {
        variables: {
            user_id: user.id
        }
    })

    if(userImageLoading) return <p>wait a moment</p>
    if(userImageErr) return <p>whoops something went wrong :,( </p>
     return(
         <>
            <div className="container-fluid" >
            <form className="float-right"><input type="submit" className="text-danger float-right" value="X"/></form>
                <div>
                    <div className="img-dash rounded-circle pd-5">
                            <img className="img-fluid round img profile-img" src={userImageData.userImage} width="40px"  height="40px" alt="..." />
                        </div>
                        <div>
                        <div  className="container-fluid bg-gray " style={{margin: 'auto', justifyContent: 'center' }}>
                            <label>change profile Image</label>
                            <div style={{margin: 'auto'}} className="pd-5">
                            <input type="file" className="form-control-file" onChange={e => {setImage(e.target.files[0])}} /> <br/>
                               {image? <button className="btn btn-primary" onClick={()=>{
                                    changeUserImage({variables: {
                                        user_id: user.id,
                                        image: image
                                    }})
                                    setImage(null)
                                }}>save Image</button> : <p></p>}
                            </div>
                        </div>
                        </div>
                        <h3 style={{textAlign: 'center'}}>{user.username} Profile</h3> 
                </div>

                <br/>
                <form onSubmit={(e) => {
                            editProfile({
                                variables: {
                                    firstName: firstname,
                                    lastName: lastname,
                                    bio: bio,
                                    userId: user.id,
                                    twitter: twitter,
                                    instagram:instagram,
                                    facebook: facebook
                    
                                }
                            })
                            console.log('done')
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
                            
                    <div className="pd-5">
                        <input type='submit' className="btn btn-outline-info" value="Save Profile" />
                    </div>
                </form>
            </div>
         </>
     )
 }

 const Nav = ({mediaUrl,  user}) => {
     
    const {loading, data, error} = useQuery(UserImage, {variables: {user_id: user.id}})


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
        if(loading) return <Spinner /> 
        if(error) return <p>something is wrong!!</p>
        
     return (
         <>
        <Dashboard>
        <>
        <div>
            <h1 className="pd-10">DON ARTS</h1>
            <div className="img-dash rounded-circle pd-10">
                <img className="img-fluid round img profile-img" src={data.userImage} width="40px"  height="40px" alt="..." />
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
    </>
     )
 }

const CREATE_EVENT = gql`
mutation(
    $name: String!
    $date: String!
    $userId: Int
    $venue: String!
    $time: String!
  ) {
    createEvent(
      date: $date
      name: $name
      time: $time
      userId: $userId
      venue: $venue
    ) {
      event {
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
    const [eventCreated, setEventCreated] = useState(false)
    const [complete, setComplete] = useState(0)
    const [transition, setTransition] = useState(1)

    const [createEvent, {data}] = useMutation(CREATE_EVENT)
    const [UploadImages] = useMutation(UPLOAD_IMAGE)

    const onDrop = (files) => {
        let imageCount = files.length + 1
        setTransition(imageCount)
        let uploaded = 1
        files.forEach( file => {
            UploadImages({
                variables: {
                    eventId: data.createEvent.event.id,
                    image: file
                }
            })
            uploaded += 1
            setComplete((uploaded/imageCount) * 100)
        });
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const barData = {bgcolor: "#00695c", completed: complete, transition: transition}

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
                            name: eventName,
                            venue: eventVenue,
                            date: date,
                            time: time,
                            userId: user.id
                        }
                    });
                    setEventCreated(true)
                }}>
                <div className="pd-5">
                        <label>Event Name</label>
                        <input type="text" onChange={e=>{
                            setEventName(e.target.value); 
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
                            <><p className="btn btn-outline-info">click to choose images for the Event</p> </>
                            }
                            </div>
                            <div className={"container-fluid"}>
                                <ProgressBar bgcolor={barData.bgcolor} completed={barData.completed} transition={barData.transition} />
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

 const ProgressBar = (props)=> {
    const {bgcolor, completed, transition} = props;
    const containerStyle = {
        height:20,
        width: "100%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: `width ${transition}s ease-in-out`
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }

    return (
        <div style={containerStyle}>  
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    )
 }