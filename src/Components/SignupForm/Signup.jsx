

import {React,useState} from 'react'
// import './signup_style.css'
// import {useDispatch, useSelector} from 'react-redux'
// import {userSignupAsync} from '../../store/user/userActions'
import {Formik, Form, replace} from 'formik'
import TextField from '../TextField'
import * as yup from 'yup'
import axios from 'axios'

import { Navigate, useNavigate } from 'react-router-dom'
// import { signupErrorSelector } from '../../store/user/userSelector'


export const Signup = () => {
    const [department, setDepartment] = useState('')
    const [error, setError] = useState('')
   
    const [image,setImage] = useState(null)
    // const signupError = useSelector(signupErrorSelector)

    const validate = yup.object({
            firstName: yup.string()
                       .required('Required'),
            lastName: yup.string()
                       .required('Required'),
            email: yup.string()
                   .email('Email is Invalid')
                  .required('Required'),
            address: yup.string()
                  .required('Required'),
            phoneNo: yup.string()
            .required('Required'),
            // department: yup.string()
            // .required('Required'),
            
            password: yup
            .string()
            .required('Please Enter your password')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
            confirmPassword:  yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Required'),
    })

  return (


    <Formik
    initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={values=>{
        console.log('values',values)
        console.log('image', image)
        const formData = new FormData();
        formData.append('firstName', values.firstName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('image', image)
        formData.append('address', values.address)
        formData.append('phoneNo', values.phoneNo)
        formData.append('department', department)
        formData.append('password', values.password)
        formData.append('confirmPassword', values.confirmPassword)
        
          var config = {
            method: 'post',
            url: 'http://localhost:8080/employee',
            data : formData
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data)
            alert('Employee Created Successfully!')
          })
          .catch(function (error) {
            console.log(error);
            setError(error?.response?.data?.msg[0]?.msg)
          });
        
      }}
      >
      
        <>
      <p className='txt-left'> 
          AiOutlineArrowLeft
          </p>
        <div className='form'>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>


            <TextField label ='First Name' type="text" name='firstName' id='firstName' placeholder='First Name'/>
            <TextField label="Last Name"  type="text" name='lastName' id='lastname' placeholder='Last Name' />
            <TextField label="Email"  type="email" name='email' id='email' placeholder='Email' />
            <input type="file" className='form-fields img-input' onChange={(e)=>setImage(e.target.files[0])}/>
            <TextField label="Address"  type="text" name='address' id='address' placeholder='Address' />
            <TextField label='Phone No' type="text" name='phoneNo' id='phoneNo' placeholder='Phone No'/>
            <select name='department' onChange={(e)=>setDepartment(e.target.value)} placeholder='Select Department'>
                    <option disabled hidden value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Android Developer">Android Developer</option>
            </select>
            <TextField label="Password" name="password" type="password" id='password'/>
            <TextField label="Confirm Password" name="confirmPassword" type="password" id='confirmPassword'/>
            <button className="btn btn-dark mt-3" type="submit">Register</button>
          </Form>
          <div className="error">
            {/* <p style={{color: 'red'}}>
              {signupError?.response?.data?.msg[0].msg}
            </p> */}
             {
        error? (<p className="text-center text-red error">
            {error}
        </p>):null
    }
          </div>
        </div>
    
      </>
    </Formik>
     


  )
}
