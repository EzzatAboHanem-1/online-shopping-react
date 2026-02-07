import React from 'react'
import img1 from '../../assets/Capture.PNG'
import img2 from '../../assets/Capture2.PNG'
import img3 from '../../assets/ddd.jpg'
import img4 from '../../assets/cccc.jpg'
import img5 from '../../assets/original-3304bafef349064948d47df33af0232f.webp'
import img6 from '../../assets/original-fe842c3e42d7b107170c3f1b8b38fbb6.webp'
import img7 from '../../assets/original-d478ecbc7003cc2097676bc57b9658a0.webp'

import styles from './MainSlider.module.css';
import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className={styles.holder}>
      <div className={styles.mainSlid1}>
        <img className='w-100 h-50' src = {img3} alt="" />
        <img className='w-100 h-50' src = {img4} alt="" />
      </div>
      <div className={styles.mainSlid2}>

        
    <Slider {...settings} className={styles.slideHolder}>
      <img className='w-100' src = {img5} alt="" />
      <img className='w-100' src = {img1} alt="" />
      <img className='w-100' src = {img6} alt="" />
      <img className='w-100' src = {img2} alt="" />
      <img className='w-100' src = {img7} alt="" />
    </Slider>
      </div>

    </div>
  )
}

