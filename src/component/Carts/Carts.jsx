import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import Products from './../Products/Products';
import styles from './Carts.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Checkout from '../Checkout/Checkout';
import {Helmet} from "react-helmet";

export default function Carts() {
  let {getCarts, updateCart, deleteCartProduct, deleteAllCart} = useContext(cartContext);

  let [ProdOfCarts, setProdOfCarts] = useState([]);
  let [Loading, setLoading] = useState(true);


  async function waitGetCarts() {
    let {data} = await getCarts();
    setProdOfCarts(data?.data);
    setLoading(false)
  }

  async function waitUpdateCarts(id, count) {
    let {data} = await updateCart(id, count);
    setProdOfCarts(data?.data);
  }

  async function waitDeleteCartProd(id) {
    let {data} = await deleteCartProduct(id);
    setProdOfCarts(data?.data);
  }

  async function waitDeleteAllCart() {
    let {data} = await deleteAllCart();
    setProdOfCarts(data?.data);
  }
  
  let navigate = useNavigate();
  function continueShopping() {
    navigate('/')
  }
  
  function openChekOut() {
    navigate('/Checkout')
  }
  useEffect(() => {
    waitGetCarts();
    
  }, [waitUpdateCarts])

  return (
// //maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css
    <div className='my-5'>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {
        !Loading? <div>
          <h1 className='text-center text-success my-4 fw-bold'>Shopping Cart</h1>
      <td className="text-center d-block mb-5 fs-4"><strong>Total Price: <span className='fw-semibold text-muted px-2'>{ProdOfCarts? ProdOfCarts?.totalCartPrice: '0'}</span>$</strong></td>
      <div>
      <link href="" rel="stylesheet" />
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{width: '50%'}}>Product</th>
              <th style={{width: '10%'}}>Price</th>
              <th style={{width: '8%'}}>Quantity</th>
              <th style={{width: '22%'}} className="text-center">Subtotal</th>
              <th style={{width: '10%'}} />
            </tr>
          </thead>
          {ProdOfCarts?.products?.map((item) => {
            return <tbody>
            <tr>
              <td data-th="Product">
                <div className="d-flex align-items-center">
                  <div className=""><img src={item?.product?.imageCover} alt="..." className={styles.cartImg} /></div>
                  <div className="col-sm-10 mx-4">
                    <h4 className="nomargin">{item?.product?.title}</h4>
                    {/* <p className='w-50'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.</p> */}
                  </div>
                </div>
              </td>
              <td data-th="Price">{item?.price}</td>
              <td>
              <div className={styles.cartCount}>
                <button onClick={() => {waitUpdateCarts(item?.product?.id, item?.count - 1)}} className='btn bg-secondary'><i class="fa-solid fa-minus text-white"></i></button>
                <input  className="form-control text-center" value = {item?.count} />
                <button onClick={() => {waitUpdateCarts(item?.product?.id, item?.count + 1)}} className='btn bg-secondary'><i class="fa-solid fa-plus text-white"></i></button>
              </div>
              </td>
              <td data-th="Subtotal" className="text-center">{item?.price * item?.count}</td>
              <td className="actions" data-th>
                {/* <button className="btn btn-info btn-sm m-2 fs-6"><i className="fa fa-refresh" /></button> */}
                <button onClick={() => {waitDeleteCartProd(item?.product?.id)}} className="btn btn-danger btn-sm m-2 fs-6"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
          })}
          <tfoot>
            <tr >
              <td><a href="#" onClick={() => {continueShopping()}} className="btn btn-warning my-3"><i className="fa fa-angle-left" /> Continue Shopping</a></td>
              <td colSpan={3} className="hidden-xs my-3" />
              <td><button onClick={() => {waitDeleteAllCart()}} className = {styles.clearAllBtn}>Clear All</button></td>
              <td><a href="#" className="btn btn-success btn-block my-3" onClick={openChekOut}>Checkout <i className="fa fa-angle-right" /></a></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
        </div>:
        <Loader></Loader>
      }
    </div>

  )
}

