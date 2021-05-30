import React, { Component,useState,useEffect } from "react";
import  EmployeeService  from "../services/EmployeeService";
import {Modal,Button,Alert}   from "react-bootstrap";
import '../MyCss.css'
import styled ,{keyframes} from 'styled-components';
import { withRouter  } from "react-router-dom";

import axios from 'axios';





const URL='http://localhost:8080/employees'; 

//import {bounce,fadeIn} from 'react-animations';

//const Bounce =styled.div`animation: 2s ${keyframes `${fadeIn}`} `;
 const EmployeeRegister=(props)=>  {
    const [state,setState]=useState({
        empId:"",
        empName:"",
        empLastName:"",
        empEmail:"",
        empMobNumber:"",
        //  empSal:"",
        // empDept:"",
        loading:false,
        message:"",
          style:{backgroundColor:"white",textAlign:"center",display:"none"}
          });
  


          const [errs,setErrs]=useState({
          
            empName:"",
            empLastName:"",
            empEmail:"",
            empMobNumber:"",
            
              });
   const changeData=(e)=>{


    setErrs({...errs,[e.target.name]:""});
     if((e.target.name==='empName' || e.target.name==='empLastName' ) && e.target.value.match("^[a-zA-Z ]*$")!=null) {
        setState({...state,[e.target.name]:e.target.value});
     }
     else    
     if((e.target.name==='empMobNumber'  ) && e.target.value.length<11) {
        setState({...state,[e.target.name]:e.target.value});
     }
     else    
     if(e.target.name==='empEmail'   ) 
     {
        setState({...state,[e.target.name]:e.target.value});
     }
    };

useEffect(()=>{
    let id=props.match.params.id;
   
    if(id)
    {
        getEmployee(id);
    }
    else{
        setState(
            {message:null, 
              empId:"",
             empName:"",
             empLastName:"",
             empEmail:"",
             empMobNumber:"",
          //    empSal:"",
          //    empDept:"",
             loading:false}
           )

    }
},[]);


const getEmployee=(id)=>{
   
     return   axios.get(`${URL}/${id}`).then(
            (response)=>{  console.warn(response.data);
                setState({ empId:response.data.empId,
                    empName:response.data.empName,
                empLastName:response.data.empLastName,
                empEmail:response.data.empEmail,
                empMobNumber:response.data.empMobNumber})}
        ).
        catch(error=>{console.error("Error -"+error)});
     
 
  };

    const submitData=(e)=>{
        e.preventDefault();
      
        const empName=state.empName;
        const empLastName=state.empLastName;
        const empEmail=state.empEmail;
        const empMobNumber=state.empMobNumber;
        // const empSal=state.empSal;
        // const empDept=state.empDept;
        const data={empName,empLastName,empEmail,empMobNumber};
console.warn(data);


//let valid=true;
if(!empName){
    console.warn('name is empty')
    setErrs({...errs,
        empName: "Name should not be empty."
      });
      return;
     
}

if(!empLastName){
    console.warn('lastname is empty')
    setErrs({...errs,
        empLastName: "Surname should not be empty."
      });
    
      return;
}

if(!empEmail){
    console.warn('email is empty')
    setErrs({...errs,
        empEmail: "Email should not be empty."
      });
      return;
}

if(!empMobNumber){
    console.warn('mobnumber is empty')
    setErrs({...errs,
        empMobNumber: "Mobile No. should not be empty."
      });
      return;
}
if(empMobNumber.length!=10){
    console.warn('mobnumber  length is not 10')
    setErrs({...errs,
        empMobNumber: "Mobile No. Length should be 10."
      });
      return;
}
// if(valid===false)
// return;



               setState({...state,loading:true});
            EmployeeService.saveEmployee(data).then(response=>{
            console.log(response);
            setState({
                loading:false,
                message:response.data,
               style:{ backgroundColor:"white",textAlign:"center",display:"inline"}
            })}).catch(err=>{
                console.log(err);                
                setState({loading:false});
            });
        };
     
    

 

        const updateData=(e)=>{
            e.preventDefault();
            const empId=state.empId;
            const empName=state.empName;
            const empLastName=state.empLastName;
            const empEmail=state.empEmail;
            const empMobNumber=state.empMobNumber;
            // const empSal=state.empSal;
            // const empDept=state.empDept;
            const data={empName,empLastName,empEmail,empMobNumber};
            console.warn(data);

//let valid=true;
if(!empName){
    console.warn('name is empty')
    setErrs({...errs,
        empName: "Name should not be empty."
      });
      return;
     
}

if(!empLastName){
    console.warn('lastname is empty')
    setErrs({...errs,
        empLastName: "Surname should not be empty."
      });
    
      return;
}

if(!empEmail){
    console.warn('email is empty')
    setErrs({...errs,
        empEmail: "Email should not be empty."
      });
      return;
}

if(!empMobNumber){
    console.warn('mobnumber is empty')
    setErrs({...errs,
        empMobNumber: "Mobile No. should not be empty."
      });
      return;
}
if(empMobNumber.length!=10){
    console.warn('mobnumber  length is not 10')
    setErrs({...errs,
        empMobNumber: "Mobile No. Length should be 10."
      });
      return;
}
// if(valid===false)
// return;





    
            setState({...state,loading:true});
            axios.put(`${URL}/${empId}`,data).then(response=>{
                console.log(response);
                setState({
                    loading:false,
                    message:response.data,
                   style:{ backgroundColor:"white",textAlign:"center",display:"inline"}
                });
            setTimeout(()=>{setState({
     style:{ backgroundColor:"white",textAlign:"center",display:"none"}
                                    })},3000);


            
            
            
            }).catch(err=>{
                    console.log(err);                
                    setState({loading:false});
                });
            };
         


    const loadOrShowMsg=()=>{
        if(state.loading)
        return <p style={{backgroundColor:"white"}}>Loading..</p>
        else
        {   
          //  return <div className="alert aler-success" style={state.style}> {state.message}</div>
         
         
        //  if(state.message)
        //  document.body.style.opacity = "0.8";
        //   else
         //  document.body.style.opacity = "1";
          return ( state.message &&  <Modal.Dialog style={{marginTop: "-343px"}}>
              
            <Modal.Header  style={{backgroundColor:" #1aff1a ",opacity:"1"}} >
              <Modal.Title>Alert!</Modal.Title>
            </Modal.Header>
          
            <Modal.Body style={{ opacity: "1",backgroundColor:" #1aff1a "}}>
              <p>{state.message}</p>
            </Modal.Body>
          
            <Modal.Footer style={{backgroundColor:" #1aff1a "}}>
              <Button style={{backgroundColor:"red"}} onClick={()=>{setState(
                                                  {message:null, 
                                                    empId:"",
                                                   empName:"",
                                                   empLastName:"",
                                                   empEmail:"",
                                                   empMobNumber:"",
                                                //    empSal:"",
                                                //    empDept:"",
                                                   loading:false}
                                                 )
                                   }
                             } variant="secondary">Close </Button>

            </Modal.Footer>
          </Modal.Dialog>
          
          
          )


      
        
        
        
        
        }
       
    };
 
        return (
            <div className="container" >
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box" style={{marginTop: "10px",opacity:"0.9"}}>
                  
                    <div className="col-lg-12 login-title" style={{textShadow: "2px 2px 8px #FF0000",fontSize:"14px"}}>
                    {state.empId?"EMPLOYEE UPDATION":"EMPLOYEE REGISTRATION"}  
                    </div>
    
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={ state.empId?e=>updateData(e):e=>submitData(e)}>
                                <div className="form-group">
                                    <label className="form-control-label " style={{color:"white",backgroundColor:"blue"}}>NAME</label>
         
                                    <input  placeholder="Enter Name" className="form-control"  name="empName"  value={state.empName} onChange={e=>changeData(e)} autoComplete="off"/>
                                    
                                    {errs.empName &&
           //display an error here
          <h6 style={{color:"red"}}>{errs.empName}</h6>
        }
                                </div>

                                <div className="form-group">
                                    <label className="form-control-label " style={{color:"white",backgroundColor:"blue"}}>Surname</label>
                                    <input  placeholder="Enter Last Name" className="form-control"  name="empLastName"  value={state.empLastName} onChange={e=>changeData(e)} autoComplete="off"/>
                                    {errs.empLastName &&
           //display an error here
          <h6 style={{color:"red"}}>{errs.empLastName}</h6>
        }
                               
                                </div>

                                <div className="form-group">
                                    <label className="form-control-label " style={{color:"white",backgroundColor:"blue"}}>Email</label>
                                    <input type="email" placeholder="Enter Email" className="form-control"  name="empEmail"  value={state.empEmail} onChange={e=>changeData(e)} autoComplete="off"/>
                                    {errs.empEmail &&
           //display an error here
          <h6 style={{color:"red"}}>{errs.empEmail}</h6>
        }
                               
                               
                               
                                </div>



                                <div className="form-group">
                                    <label className="form-control-label " style={{color:"white",backgroundColor:"blue"}}>Mobile Number</label>
                                    <input type="number" placeholder="Enter Mobile Number" className="form-control"  name="empMobNumber"  value={state.empMobNumber} onChange={e=>changeData(e)} autoComplete="off"/>
                                    {errs.empMobNumber &&
           //display an error here
          <h6 style={{color:"red"}}>{errs.empMobNumber}</h6>
        }
                               
                               
                                </div>


                                {/* <div className="form-group">
                                    <label className="form-control-label" style={{color:"white",backgroundColor:"blue"}}>SALARY</label>
                                    <input type="number" placeholder="Enter Salary" className="form-control" name="empSal"  value={state.empSal} onChange={e=>changeData(e)} />
                                </div>

                               

                                <div className="form-group">
                                    <label className="form-control-label" style={{color:"white",backgroundColor:"blue"}}>DEPARTMENT</label>
                                    <input type="text"  placeholder="Enter Department" className="form-control" name="empDept"  value={state.empDept} onChange={e=>changeData(e)} />
                                </div> */}
    
                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-6 login-btm login-text">
                                     
                                    </div>
                                    <div className="col-lg-6 login-btm login-button" >
                                        <button  type="submit" className="btn btn-outline-primary">{state.empId?"Update":"Register"}</button>
                                    </div>
                                </div>
                            </form>
                           
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
<br/>
                {loadOrShowMsg()}
            </div>
    
    
            </div>
               
        );
    }


export default withRouter(EmployeeRegister)


