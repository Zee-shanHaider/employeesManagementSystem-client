import {React, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup'
import {Formik} from 'formik'
import './Signin.style.css'
import axios from 'axios'

export const Signin = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
   
    const schema = yup.object({
        email: yup.string()
               .email('Email is Invalid')
              .required('Required'),
        password: yup
        .string()
        .required('Please Enter your password')
      });

  return (
    <div className='loginForm'>
        <h1 className='text-center'>
            Sign in
        </h1>
        <div className="form">

<Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}

      onSubmit={(values,{resetForm})=>{
        const formData = new FormData();
        formData.append('email', values.email)
        formData.append('password', values.password)
        
          var config = {
            method: 'post',
            url: 'http://localhost:8080/login',
            headers: { 
              'Content-Type': 'application/json' //Never give Content-type while uploading file : application/json otherwise IT'll ignore our file
            },
            data : formData
          };
          
          axios(config)
          .then(function (response) {
            localStorage.setItem('token', response?.data?.token)
            alert('Successfully logged In')
            navigate('/')
          })
          .catch(function (error) {
            setError(error?.response?.data?.message)
          });
        
      }}
      validateOnBlur={true}
      validateOnMount={false}
      validateOnChange={false}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form onSubmit={handleSubmit} style={{width: "45%", margin: "20px auto"}}>
            
              
           
            <Form.Group controlId="validationFormikUsername2">
               
            <FloatingLabel label="Email" className="mb-3 formControl">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        className='formControl'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.email}
                             </Form.Control.Feedback>
             </FloatingLabel>
                  
            </Form.Group>

             <Form.Group
              controlId="validationFormik104"
              className="position-relative"
            >
              <FloatingLabel label="Password" className="mb-3 formControl">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className='formControl'
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.password}
                             </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>
            
          <div className="submit">
          <Button type="submit" className='p-2 w-25 mx-auto'>Sign in</Button>
          </div>
        </Form>
      )}
    </Formik>
    {
        error? (<p className="text-center text-red error">
            {error}
        </p>):null
    }
        <div className="register">
            <p className='para'>Don't have an account?</p><Link to='/signup' className='btnSign'>Register</Link>
        </div>
        </div>
    </div>
  )}
       
       