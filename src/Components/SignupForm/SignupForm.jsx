import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as yup from 'yup'
import {Formik} from 'formik'
import axios from 'axios'
import './SignupForm.style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const Signup = ()=> {
    const [formValues, setFormValues] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [image, setImage] = useState(null)
    console.log('image', image)
    const schema = yup.object({
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
        department: yup.string()
        .required('Required'),
        
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
      });
        
        
  return (
<>

    <h1 className='text-center'>
    Create Employee
</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNo: '',
        department: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}

      onSubmit={(values,{resetForm})=>{
        console.log('values',values)
        console.log('image', image)
        const formData = new FormData();
        formData.append('firstName', values.firstName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('image', image)
        formData.append('address', values.address)
        formData.append('phoneNo', values.phoneNo)
        formData.append('department', values.department)
        formData.append('password', values.password)
        formData.append('confirmPassword', values.confirmPassword)
        
          var config = {
            method: 'post',
            url: 'http://localhost:8080/employee',
            // headers: { 
            //   'Content-Type': 'application/json' //Never give Content-type : application/json otherwise IT'll ignore our file
            // },
            data : formData
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data)
            alert('Employee Created Successfully!')
            resetForm({values: ''})
            setImage(null)
            navigate('/login')
          })
          .catch(function (error) {
            console.log(error);
            setError(error?.response?.data?.msg[0]?.msg)
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
        <Form onSubmit={handleSubmit} style={{width: "50%", margin: "20px auto"}} encType="multipart/form-data">
             <Form.Group
              controlId="validationFormik101"
              className="position-relative"
            >
              {/* <Form.Label>First Name</Form.Label> */}
              <FloatingLabel
                        
                        label="First Name"
                        className="mb-3 formControl"
                    >
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                className='formControl'
                value={values.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                {errors.firstName}
              </Form.Control.Feedback>
              </FloatingLabel>

            </Form.Group>

            
            <Form.Group
              controlId="validationFormik102"
              className="position-relative"
            >
              <FloatingLabel label="Last Name" className="mb-3 formControl">
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className='formControl'
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.lastName}
                             </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

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
              controlId="validationFormik102"
              className="position-relative"
            >
              <FloatingLabel label="Image" className="mb-3 formControl"> 
                    <Form.Control
                        type="file"
                        className='formControl'
                        name='image'
                        onChange={(e)=>setImage(e.target.files[0])}
                        isInvalid={!!errors.image} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.image}
      </Form.Control.Feedback>
                            
                        
                 </FloatingLabel>  
            </Form.Group>
                       {/* <input type="file"  className='formControl image'
                        name='image'
                        onChange={(e)=>setImage(e.target.files[0])} />  */}

            <Form.Group
              controlId="validationFormik102"
              className="position-relative"
            >
              <FloatingLabel label="Address" className="mb-3 formControl">
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        className='formControl'
                        name='address'
                        value={values.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.address}
                             </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

             
             <Form.Group
              controlId="validationFormik104"
              className="position-relative"
            >
              <FloatingLabel label="Phone No" className="mb-3 formControl">
                    <Form.Control
                        type="text"
                        placeholder="Phone No"
                        className='formControl'
                        name="phoneNo"
                        value={values.phoneNo}
                        onChange={handleChange}
                        isInvalid={!!errors.phoneNo} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.phoneNo}
                             </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>

                {/* <Form.Select aria-label="Floating label select example" name='department' value={values.department} className='mb-3 form-fields login-input' style={{"border": "none", "borderBottom": "1px solid silver", "boxShadow": "none","borderRadius": "0px",}} onChange={handleChange}>
                    <option disabled hidden value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Android Developer">Android Developer</option>
                </Form.Select> */}

<Form.Group
              controlId="validationFormik104"
              className="position-relative"
            >
              <FloatingLabel className="mb-3">
                    <Form.Select
                     aria-label="Floating label select example"
                     name='department'
                     isInvalid={!!errors.department}
                    value={values.department}
                    className='mb-3 form-fields login-input' style={{"border": "none", "borderBottom": "1px solid silver", "boxShadow": "none","borderRadius": "0px",}}
                    onChange={handleChange}>
                    <option disabled hidden value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Android Developer">Android Developer</option>
                </Form.Select>
                            <Form.Control.Feedback type="invalid" tooltip style={{"backgroundColor": "white", "color": "red"}}>
                            {errors.department}
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
            

            <Form.Group
              controlId="validationFormik104"
              className="position-relative"
            >
              <FloatingLabel label="Confirm Password" className="mb-3 formControl">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        className='formControl'
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword} />
                            <Form.Control.Feedback type="invalid" tooltip style={{"background": "white", "color": "red"}}>
                            {errors.confirmPassword}
                             </Form.Control.Feedback>
                </FloatingLabel>
            </Form.Group>


          <div className="submit">
          <Button type="submit" className='p-2 w-25 mx-auto'>Create</Button>
          </div>
        </Form>
      )}
    </Formik>
      {
        error? (<p className="text-center text-red error">
            {error}
        </p>):null
    }
    
    </>
  );
}

;