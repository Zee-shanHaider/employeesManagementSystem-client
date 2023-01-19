import React from 'react'
import { ErrorMessage, useField } from 'formik';

const TextField =({ label, ...props }) => {
    const [field, meta] = useField(props);
      return ( 
          <div className="mb-2">
        <label htmlFor={field.name} style={{'textAlign': 'left',display:'block'}}>{label}</label>
        <input
          className={`form-control shadow-none form-fields ${meta.touched && meta.error && 'is-invalid'}`}
          {...field} {...props}
           autoComplete='off'
        />
        <ErrorMessage component="div" name={field.name} className="error" style={{color: 'red'}}/>
      </div>
       );
  }


export default TextField 