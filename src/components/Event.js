import React from 'react';
import {useQuery, gql} from '@apollo/client';
import Spinner from './Spinner';
import CarouselComp from './Carousel';
import Nav from './Nav';
import * as hiIcons from 'react-icons/hi';
import axios from 'axios'


const EVENT = gql`
query Event($event_id: Int!){
    event(id: $event_id){
      name
    }
  allImages(eventId: $event_id)
  }
`
const download = (url)=>{
    axios.get(url, {
        responseType: 'blob'
    })
    .then((res) => {
        const uri = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = uri;
        link.setAttribute('download', 'img.jpg'); //or any other extension
        document.body.appendChild(link);
        link.click();
    })
}
function Event({ match }){
    const { loading, error, data } = useQuery(EVENT, {
        variables: {
            event_id: match.params.id
        }
    })
    if (loading) return <div className="spinner"><Spinner /></div>

    return (
        <div className="black-fill">
            <Nav />
           <div className="carousel-container rounded" style={{backgroundColor: "black"}}>
            <CarouselComp images={data.allImages}/>
           </div>
           <div className="container-fluid" >
                <h2 className={'text-white head '}> {data.event.name}</h2>
                <div className="row row-flex">
                    {error? <p className="spinnerw">whoopss.. something is wrong</p> :
                        data.allImages.map((image, index) => (
                            <div key={ index } className="col-md-4 pd-10">
                                <div className="card bg-dark">
                                <img src={image} alt="no pic" className="img-fluid" />
                                <hiIcons.HiOutlineDownload className="bottom-right down-ico" onClick={() => {download(image)}}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
           </div>

        </div>
    )
}

export default Event