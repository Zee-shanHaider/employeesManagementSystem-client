import './EmployeesList.style.css'
import Button from 'react-bootstrap/esm/Button'
import {React,useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import DeleteConfirmation from '../DeleteModal/DeleteModal';
import { Alert } from 'react-bootstrap';
const Employees = () => {
      const [employees, setEmployees] = useState([])
      const token = localStorage.getItem('token')
      const [search, setSearch] = useState('')

      //Modal states
      // Set up some additional local state
      const [id, setId] = useState(null);
      const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
      const [deleteMessage, setDeleteMessage] = useState(null);
      const [fruitMessage, setFruitMessage] = useState(null);
      const [vegetableMessage, setVegetableMessage] = useState(null);

      //-------------------------------

      const showDeleteModal = (id) => {
        setId(id);
        setFruitMessage(null);
        setVegetableMessage(null);
     
        setDeleteMessage(`Are you sure you want to delete this Employee?`);
   
        setDisplayConfirmationModal(true);
      };

        // Hide the modal
        const hideConfirmationModal = () => {
          setDisplayConfirmationModal(false);
        };

          // Handle the actual deletion of the item
      const submitDelete = (id) => {
        console.log('Employee that is to be deleted')

        var config = {
          method: 'delete',
          url: 'http://localhost:8080/employee/'+id,
          headers:{
            Authorization: token
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setFruitMessage(`Employee '${employees.find((x) => x.id === id).firstName}' was deleted successfully.`);
          setEmployees(employees.filter((emp) => emp.id !== id));
          setDisplayConfirmationModal(false);

        })
        .catch(function (error) {
          console.log(error);
        });
        
     
      };

      useEffect(() => {
        var config = {
          method: 'get',
          url: 'http://localhost:8080/employee',
          headers: { 
            Authorization :token
          }
        };
        
        axios(config)
        .then(function (response) {
          setEmployees(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }, []);
  return (
    <div>

      <div className="employees">
        <div className="search">
            <h2 className='text-left'> Staff  </h2>
            <input type="text" placeholder='Search Employee' onChange={(e)=>setSearch(e.target.value)} name='search'/>
        </div>
        {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}

     <div className="employeesList">
      {
        employees?.filter(emp=>emp.firstName.toLowerCase().includes(search.toLowerCase())).map((emp,ind)=>{
          const imageUrl = 'http://localhost:8080/'+emp.imageUrl;
          return(
            
          <div className="card" key={ind}>
            <div className="editMenu">
            <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic" className='drop'>
                    <img src="https://cdn-icons-png.flaticon.com/128/8212/8212730.png" alt="menu" />
                  </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <button className='btn' onClick={()=>console.log("this is the button to edit")}>Edit</button>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Employee Details</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  <Dropdown.Item>
                  <button className='btn' onClick={() => showDeleteModal(emp.id)}>Delete</button>
                  </Dropdown.Item>
                </Dropdown.Menu>
    </Dropdown>
              
            </div>
              <div className="name-img">
                <img src={imageUrl} className='card-img' alt="employee" />
                <h6>{emp.firstName}</h6>
              </div>
              <p className='text-center depart'>
                {emp.Department.title}
              </p>
              <div className="contact">
                <Button className="btn-primary">
                  <a href={`mailto:${emp.email}`} className='links'>Email</a> 
                </Button>
                <Button className='call'>
                  <a href={`tel:+${emp.phoneNo}`} className='links'>Call</a>
                </Button>
              </div>
        </div>
        )})
      }
        </div>
    </div>
    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
  </div>
  )
}

export default Employees
