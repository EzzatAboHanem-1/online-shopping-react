import axios from 'axios';
import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import {cartContext} from '../../Context/CartContext';
import {toast} from 'react-hot-toast';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

  let {id} = useParams();
  let [ProdDetails, setProdDetails] = useState(null);
  let [Loading, setLoading] = useState(true);

  let {addToCart} = useContext(cartContext)

  async function wait_CartsAPI_Response(ID) {
    let response = await addToCart(ID);
    if(response?.data.status == 'success') {
      toast.success(response?.data.message, {
        duration: 4000,
        position: 'top-center',
      })
    } 
    else {
      toast.error(response?.data.message, {
        duration: 4000,
        position: 'top-center',
      })
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data}) =>{
      setProdDetails(data?.data)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
    })
  }

  useLayoutEffect(() =>{
    getProductDetails();
  }, [id])
  return (
    <>
    <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div>
        {!Loading? <div className='container col-12 d-flex justify-content-center align-items-center'>
        <div className='image col-5'>
          <Slider {...settings}>
            {ProdDetails?.images.map((src) => {
              return <img className='w-100 px-5 my-5' src= {src} alt= {ProdDetails?.title} />
            })}
          </Slider>
          {/* <img className='w-100 px-5 my-5' src= {ProdDetails?.imageCover} alt= {ProdDetails?.title} /> */}
        </div>

        <div className="info col-7 p-1 mx-5">
          <h1 className='text-success fw-bold'>{ProdDetails?.title}</h1>
          <p className='text-muted pt-4'>{ProdDetails?.description}</p>
          <div className='d-flex justify-content-between align-items-center px-3 mb-1'>
            <span>{ProdDetails?.price} EG</span>
            <span><span className='fw-semibold'>{ProdDetails?.ratingsQuantity}</span> <i className='fas fa-star text-warning'></i></span>
          </div>
          <button onClick={() => {wait_CartsAPI_Response(ProdDetails?.id)}} className='btn btn-success w-100 mt-5 fw-bold py-2'>Add To Cart</button>
        </div>
        </div>: <Loader></Loader>}
      </div>
      <RelatedProduct ProductID = {id} CategoryName = {ProdDetails?.category?.name}/>
    </>

  )
}

