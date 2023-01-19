import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginScreen } from '../../Screens/loginScreen'
import './Navbar.style.css'
export const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const signout = ()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
        <div className="nav">
            <p className='para txt-white'>
              Employees Management System
            </p>
            <div className="dropdown">
              {
                token? (<button className="nav-link text-white btn" onClick={signout}>
                  Signout
                </button>): <Link to={'/login'} className="nav-link text-white">Sing in</Link>
              }
           
                {/* <button className="dropdown-toggle bg-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administrator
                </button>
                <ul className="dropdown-menu">
                  <li className='border-btm'><a className="dropdown-item" href="#">Action</a></li>
                  <li className='border-btm'><a className="dropdown-item" href="#">Another action</a></li>
                  <li className='border-btm'><a className="dropdown-item" href="#">Something else here</a></li>
                </ul> */}
            </div>
        </div>

       
    </div>
  )
}

