import React, { useContext, useEffect } from 'react'
import Home from '../Home/Home.jsx'
import Products from '../Products/Products.jsx'
import About from './../About/About.jsx';
import Register from '../Register/Register.jsx';
import Brands from '../Brands/Brands.jsx';
import Login from '../Login/Login.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import navlogo from '../../assets/img.avif';
import styles from './Navbar.module.css';
import { userContext } from '../../Context/userContext.jsx';
import { cartContext } from '../../Context/CartContext.jsx';
// import { counterContext } from '../../Context/counterContext';

export default function Navbar() {

  // let {counter} = useContext(counterContext);

  let {isLogin, setLogin} = useContext(userContext);
  let navigate = useNavigate();
  let {cartQuantity, getCarts} = useContext(cartContext);

  async function waitCartQuantity() {
    await getCarts();
  }
  function manageLogout() {
    localStorage.removeItem('userToken');
    setLogin(null);
    navigate('/login');
  }
  
  useEffect(() => {
    waitCartQuantity()
  }, [])
  return (
      <div className={styles.navcontainer}>
        <div className={styles.logocontainer}>
          <img src={navlogo} alt="" className= {styles.navlogo} />
           {isLogin?  <ul className={styles.linkscontainer}>
              <li className={styles.linkitems}><NavLink to = {''}>Home</NavLink></li>
              <li className={styles.linkitems}><NavLink to = {'brands'}>Brands</NavLink></li>
              <li className={styles.linkitems}><NavLink to = {'carts'}>Carts<div className='d-inline-flex'> <div className='d-inlin-flex flex-column justify-content-start align-items-center position-relative mx-1'><span className={styles.cartQuantity}>{cartQuantity? cartQuantity: 0}</span><i className="fa-solid fa-cart-shopping"></i></div></div></NavLink></li>
              <li className={styles.linkitems}><NavLink to = {'about'}>About</NavLink></li>             
              <li className={styles.linkitems} onClick={() => {manageLogout()}}><NavLink to = {'logout'}>Logout</NavLink></li>             
            </ul>: null}
        </div>
        <div className={styles.slinkscontainer}>
         {!isLogin? <> <li className={styles.linkitems}><NavLink to = {'register'}>Register</NavLink></li>
          <li className={styles.linkitems}><NavLink to = {'login'}>Login</NavLink></li></>:null }
          <div className={styles.icons}>
            <i className='fab fa-facebook'></i>
            <i className='fab fa-youtube'></i>
            <i className='fab fa-instagram'></i>
            {/* <span>{counter}</span> */}
          </div>
        </div>
      </div>
  )
}