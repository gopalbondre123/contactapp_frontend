import React, { Component ,useState,useEffect} from 'react'
import  EmployeeService  from '../services/EmployeeService';
import { BrowserRouter as Router,Link,NavLink,Switch, Route,withRouter  } from "react-router-dom";

import axios from 'axios';
//import { useParams } from 'react-router-dom';




const URL='http://localhost:8080/employees'; 





 const EmployeeListComponent =()=> {

    //const {id}=useParams();
   

    const [state,setState]=useState({
       employees:[],
      //  employees:initialState,
        message:null}
        );
        


        
 //const initialState=[{  'empId':'','empName':'','empLastName':'','empEmail':'','empMobNumber':'','empSal':'','empDept':''}]


 

useEffect(()=>{

  
       axios.get(`${URL}/`).then(
        (response)=>{setState({...state,employees:response.data})});

    
},[]);


function getAllEmployees(){
   
    return   axios.get(`${URL}/`).then(
           (response)=>{setState({employees:response.data,message:state.message})}
       );
    

 };


 function getEmployee(id){
   
    return   axios.get(`${URL}/${id}`).then(
           (response)=>{setState({...state,employees:response.data})}
       );
    

 };

  const deleteEmployee=(id)=>{
    axios.delete(`${URL}/${id}`).then(
        (response)=>{setState({...state,message:response.data,employees:state.employees});
      
      setTimeout( getAllEmployees(),3000);
      
      
                   }
       
        );
   

  };
  
        return (
            <div>
             <h1 style={{textAlign: "center",color:"blue",textShadow: "2px 2px 8px #FF0000"}}> Employee List </h1>
                <table  className="table table-hover table-dark table-bordered table-sm" >
                    <thead>
                        <tr className="bg-info text-white">
                            <th style={{color:"white",backgroundColor:"blue"}}>Emp ID</th>
                            <th style={{color:"white",backgroundColor:"blue"}}>Name</th>
                            <th style={{color:"white",backgroundColor:"blue"}}>LastName </th>
                            <th style={{color:"white",backgroundColor:"blue"}}>Email</th>
                            <th style={{color:"white",backgroundColor:"blue"}}>Mobile</th>
                            {/* <th style={{color:"white",backgroundColor:"blue"}}>Salary</th>
                            <th style={{color:"white",backgroundColor:"blue"}}>Department</th> */}
                            <th style={{color:"white",backgroundColor:"blue"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
{ state.employees.map((emp)=>
                   ( <tr key="{emp.empId}">
                    
                            <td>{emp.empId}</td>
                            <td>{emp.empName}</td>
                            <td>{emp.empLastName}</td>
                            <td>{emp.empEmail}</td>
                            <td>{emp.empMobNumber}</td>
                            {/* <td>{emp.empSal}</td>
                            <td>{emp.empDept}</td> */}
                            <td><button className="btn btn-danger" onClick={()=>deleteEmployee(emp.empId)}>DELETE</button>&emsp; <Link to={"edit/"+emp.empId} ><button className="btn btn-info" >EDIT</button></Link></td>

                    </tr>)
                    )
    }
                    </tbody>

                    
                </table>
                { state.message  && (<div  style={{marginLeft: "282px",width: "50%",textAlign: "center"}}className="alert alert-danger">{state.message}</div>)}
            </div>
        )
    
}

export default EmployeeListComponent
