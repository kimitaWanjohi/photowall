import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap'



function CarouselComp({images}) {
  return (

<Carousel>
  {
    images.map((image, index) => (
    <Carousel.Item key={index}>
    <img
      className="img-fluid image-carousel"
      src={image}
      alt="First slide"
      width="100%"
      height="600px"
    />
  </Carousel.Item>
    ))
  }
</Carousel>

  )
}

export default CarouselComp