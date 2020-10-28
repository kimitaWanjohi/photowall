import React, { Component } from "react";
import Slider from "react-slick";
import '../App.css'


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const {mediaUrl} = this.props
    return (
      <div>
        <Slider {...settings}>
          {
              this.props.images.map(image => (
                <div key={image.id}>
                    <img src={mediaUrl + image.image} alt="imgcarl" className=" img-fluid image-carousel" />
                </div>
              ))
          }
        </Slider>
      </div>
    );
  }
}