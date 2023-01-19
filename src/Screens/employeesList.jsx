import React from 'react'
import Employees from '../Components/EmployeesList/EmployeesList.component'
import { Navbar } from '../Components/Navbar/Navbar'

const EmployeesScreen = () => {
  return (
    <div>
      <Navbar/>
      <Employees/>
    </div>
  )
}

export default EmployeesScreen
