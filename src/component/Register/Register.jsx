import React, { useContext, useState } from 'react'
import { Formik, useFormik, validateYupSchema } from 'formik' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/userContext';
import { Helmet } from 'react-helmet';

export default function Register() {
  
  //
      let {setLogin} = useContext(userContext);

  // function customValidation(formValues) {
  //   let errors = {};
  //   if(!formValues.name) {
  //     errors.name = 'Name is required';
  //   } else if(!/^[A-Z][a-z]{3,5}$/.test(formValues.name)) {
  //     errors.name = 'Name must be 5char and start with capital char';
  //   }
  //   // 
  //   if(!formValues.email) {
  //     errors.email = 'Email is required';
  //   } else if(!/^[A-Z0-9._%+-]+@[A-Z]{2,4}$/i.test(formValues.email)) {
  //     errors.email = 'Enter valid email';
  //   }
  //   // 
  //   if(!formValues.phone) {
  //     errors.phone = 'Phone is required';
  //   } else if(!/^01[1250][0-9]{8}$/.test(formValues.phone)) {
  //     errors.phone = 'Enter valid phone';
  //   }
  //   // 
  //   if(!formValues.password) {
  //     errors.password = 'Password is required';
  //   } else if(!/^[A-Z][a-z0-9]{6,8}$/.test(formValues.password)) {
  //     errors.password = 'Enter valid password ';
  //   }
  //   // 
  //   if(!formValues.rePassword) {
  //     errors.rePassword = 'Repassword is required';
  //   } else if(formValues.rePassword !== formValues.password) {
  //     errors.rePassword = 'Not matched password';
  //   }

  //    return errors;
  //   }

 let [message, setMessage] = useState('');
 let [loading, setLoading] = useState(false);


 let navigate = useNavigate();
 async function formMaipulation(formData) {

  setLoading(true)
    // let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formData);
    // console.log('response', data);

    // if(data.message === 'success') {
    //   navigate('/login')
    // }

    //
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formData)
  .then((response) =>{setMessage(response.data.message)
    if(response.data.message == 'success') {
      setLogin(response.data.token);
      localStorage.setItem('userToken', response.data.token);
      setLoading(false);
      navigate('/login');
    }
  })
  .catch((error) => {
    setLoading(false);
    setMessage(error.data.message)})
  //
  }

 let formObject =  useFormik({

    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword: '',
      phone:''
    },
    // validate: customValidation,
    validationSchema: Yup.object({
      name:Yup.string().required('name is required').min(3, 'min length is 3').max(10, 'max length is 10'),
      email:Yup.string().required('email is required').email('enter valid email'),
      phone:Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}/, 'phone not valid'),
      password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Not valid'),
      rePassword: Yup.string().required('password is required').oneOf([Yup.ref('password')], 'not matched')
    }),
    onSubmit: formMaipulation,
  })

  return (
    <>
    <Helmet>
        <title>Registeration</title>
    </Helmet>
         <div className=" d-flex align-items-center justify-content-center mt-4 mb-4" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg w-100 p-2" style={{ maxWidth: '550px',height: '675px' }} >
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h3 fw-bold" style={{color: '#e06215'}}>Sign Up</h1>
            <p className="card-text text-muted">Sign in below to access your account</p>
            {message? <div className="alert alert-primary" role="alert">{message}</div> : null}
          </div>
          <div className="mt-4">
            <form onSubmit={formObject.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label text-muted">Name</label>
                <input value = {formObject.values.name} name = 'name' type="name" onChange={formObject.handleChange} onBlur={formObject.handleBlur} className="form-control" id="name" placeholder="Enter your name" required />
                <div className='delay'>{formObject.touched.name && formObject.errors.name? <div class="alert alert-danger" role="alert">{formObject.errors.name}</div>: null}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">Email Address</label>
                <input  value = {formObject.values.email} name='email' type="email" onChange={formObject.handleChange} onBlur={formObject.handleBlur} className="form-control" id="email" placeholder="Email Address" required />
                <div  className='delay'>{formObject.touched.email && formObject.errors.email? <div class="alert alert-danger" role="alert">{formObject.errors.email}</div>: null}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">Password</label>
                <input  value = {formObject.values.password} name='password' type="password" onChange={formObject.handleChange} onBlur={formObject.handleBlur} className="form-control" id="password" placeholder="Password" required />
                <div  className='delay'>{formObject.touched.password && formObject.errors.password? <div class="alert alert-danger" role="alert">{formObject.errors.password}</div>: null}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="repassword" className="form-label text-muted">Repassword</label>
                <input value = {formObject.values.rePassword} name='rePassword' type="password" onChange={formObject.handleChange} onBlur={formObject.handleBlur} className="form-control" id="rePassword" placeholder="Repassword" required />
                <div  className='delay'>{formObject.touched.rePassword && formObject.errors.rePassword? <div class="alert alert-danger" role="alert">{formObject.errors.rePassword}</div>: null}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="form-label text-muted">Phone</label>
                <input  value = {formObject.values.phone} name='phone' type="phone" onChange={formObject.handleChange} onBlur={formObject.handleBlur} className="form-control" id="phone" placeholder="Phone" required />
                <div  className='delay'>{formObject.touched.phone && formObject.errors.phone? <div class="alert alert-danger" role="alert">{formObject.errors.phone}</div>: null}</div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn-lg fw-bold p-1 rounded border-0 " style={{backgroundColor: '#f0b427', fontSize: '20px', color: 'white'}} disabled ={!(formObject.isValid && formObject.dirty)}>Sign Up</button>
                <div className='text-center' style={{fontSize: '20px'}}>{loading? <i className='fa fa-spinner fa-spin m-1 '></i>: null}</div>
              </div>
              <p className="text-center text-muted mt-4">
                Don't have an account yet?{' '}
                <a href="#!" className="text-decoration-none text-success ">Sign up</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )


}