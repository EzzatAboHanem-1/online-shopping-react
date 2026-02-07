import { data, Link } from 'react-router-dom';
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Category from '../Category/Category';
import styles from './Products.module.css';
import {cartContext} from '../../Context/CartContext';
import {toast} from 'react-hot-toast';
import MainSlider from './../MainSlider/MainSlider';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

export default function Products() {

  let {data, error, isError, isLoading, Loading} = useQuery({queryKey: ['getProducts'], queryFn: getProducts});

  // let [Products, setProduct] = useState([]);
  // let [Loading, setLoading] = useState(true);

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
  let [cartQ, setCartQ] = useState(0);
  async function getProducts(){
     return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    .then(({data}) => {
      // console.log(data.data);
      // setProduct(data.data);
        // setLoading(false);
        return data;
    })
    .catch((error) => {
      // console.log(error);
      // setLoading(false);
    })
  }
  
  // useEffect(() => {
  //   getProducts();
  // }, [])

  if(!isLoading) {
      return (
    <>
    <Helmet>
        <title>Products</title>
      </Helmet>
      <div className='mx-5'><MainSlider></MainSlider></div>
      <div className='container'>
        <div><Category></Category></div>
        {<div className='col-12 d-flex flex-wrap justify-content-center'>
          {data?.data?.map((product) => {
            return <div  className = 'row col-2 d-flex mx-2 my-4 pb-3 bg-light'>
               <div className = {styles.productHover}>
              <Link to = {`/ProductDetails/${product?.id}/${product?.category?.name}`} className={styles.link}>
                <img className='w-100 mt-2' src= {product?.imageCover} alt= {product?.title} />
               <div className= {styles.discribtionHeight}>
                 <span className='text-muted mt-3 fw-semibold d-block'>{product?.category?.name}</span>
                 <span className='text-dark mt-1 fw-bold d-block'>{product?.title?.split(" ")?.slice(0, 3)?.join(" ")}</span>
               </div>
                <div className='mt-5'>
                  <div className='d-flex justify-content-between px-1 mt-3'>
                  <span className='d-block'>{product?.price} EG</span>
                  <span className='d-block'><span className='fw-semibold'>{product?.ratingsQuantity}</span> <i className='fas fa-star text-warning'></i></span>
                  </div>
                </div>
              </Link>
                <div onClick = {() => {wait_CartsAPI_Response(product?.id)}} className={styles.btnCart}>Add To Chart</div>
               </div>
            </div>
          })}
        </div>}
      </div>
    </>
  )
  } else {
    <Loader></Loader>
  }





}

