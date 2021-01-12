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
    return (
      <div>
        <Slider {...settings}>
          {
              this.props.images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt="imgcarl" className=" img-fluid image-carousel" />
                </div>
              ))
          }
        </Slider>,
      </div>
    );
  }
}