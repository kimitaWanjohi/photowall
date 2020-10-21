import React from 'react';
import {useQuery, gql} from '@apollo/client';
import Spinner from './Spinner';
import SimpleSlider from './Carousel';
import Nav from './Nav';
import * as hiIcons from 'react-icons/hi';
import axios from 'axios'
import {mediaProvider} from '../index.js'

const EVENT = gql`
query Event($id: Int!){
    event(id: $id){
      name
      eventImages{
        id
        image
      }
    }
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
    const mediaUrl = React.useContext(mediaProvider)
    const { loading, error, data } = useQuery(EVENT, {
        variables: {
            "id": match.params.id
        }
    })
    if (loading) return <div className="spinner"><Spinner /></div>
    if (error) return <p className="spinnerw">whoopss.. something is wrong</p>
    return (
        <div className="black-fill">
            <Nav />
           <div className="carousel-container">
            <SimpleSlider mediaUrl ={mediaUrl} images={data.event.eventImages}/>
           </div>
           <div className="container-fluid" >
                <h2 className={'text-white head '}> {data.event.name}</h2>
                <div className="row row-flex">
                    {
                        data.event.eventImages.map(image => (
                            <div key={ image.id } className="col-md-4 pd-10">
                                <div>
                                <img src={mediaUrl + image.image} alt="no pic" className="img-fluid" />
                                <hiIcons.HiOutlineDownload className="bottom-right down-ico" onClick={() => {download(mediaUrl + image.image)}}/>
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