import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';


export default function RelatedProduct(props) {
  let {id} = useParams();
  let Category = props?.CategoryName;
  let [RelateProd, setRelateProd] = useState([]);
  let [Loading, setLoading] = useState(true);

  function getRelatedProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data}) =>{
      let allProducts = data?.data;
      let related = allProducts?.filter((Produc) => {
        return Produc?.category?.name.toLowerCase() === Category.toLowerCase();
      })

      console.log('r', related)
      setRelateProd(related)
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false)
    })
  }

 useEffect(() =>{
  if (Category) getRelatedProducts();
}, [Category])

  return (
    <>
      <div className='container'>
        {!Loading? <div className='col-12 d-flex flex-wrap justify-content-center'>
          {RelateProd?.map((product) => {
            return <div  className = 'row col-2 d-flex mx-2 my-4 pb-3'>
              <Link to = {`/ProductDetails/${product?.id}/${product?.category?.name}`}>
                <img className='w-100' src= {product?.imageCover} alt= {product?.title} />
                <span className='text-muted mt-3 fw-semibold d-block'>{product?.category?.name}</span>
                <span className='text-dark mt-1 fw-bold d-block'>{product?.title?.split(" ")?.slice(0, 3)?.join(" ")}</span>
                <div className='d-flex justify-content-between px-3 mt-3'>
                  <span>{product?.price} EG</span>
                  <span><span className='fw-semibold'>{product?.ratingsQuantity}</span> <i className='fas fa-star text-warning'></i></span>
                </div>
              </Link>
            </div>
          })}
        </div>: <Loader></Loader>}
      </div>
    </>

  )
}

