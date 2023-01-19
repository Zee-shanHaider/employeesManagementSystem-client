import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from '../Screens/homeScreen'
import { LoginScreen } from '../Screens/loginScreen'
import { SignupScreen } from '../Screens/signupScreen'
import EmployeesScreen from '../Screens/employeesList'
export const Navigation = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<LoginScreen/>}></Route>
                <Route path='/signup' element={<SignupScreen/>}></Route>
                <Route path='/employees' element={<EmployeesScreen/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}
