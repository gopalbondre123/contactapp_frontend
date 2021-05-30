import logo from './logo.svg';
import './App.css';
import EmployeeListComponent from './components/EmployeeListComponent';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router,Link,NavLink,Switch, Route  } from "react-router-dom";
import { Navbar, Nav ,Form } from "react-bootstrap";

import EmployeeRegister from './components/EmployeeRegister';

import styled ,{keyframes} from 'styled-components';
//import {bounce,fadeIn,tada,merge} from 'react-animations';
import Logo from './components/images/g.jpg';
import nature from './components/images/nature2.jpg';
import DigitalClock from './services/DigitalClock';


//const tadaBounce = merge(tada, bounce);

//const Bounce =styled.div`animation: 2s ${keyframes `${bounce}`} infinite`; //continuous
//const Bounce =styled.div`animation: 2s ${keyframes `${tadaBounce}`} `;// mix of many animate

//const Bounce =styled.div`animation: 2s ${keyframes `${bounce}`} `;   //only one time



const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    float: left;
  
    color:white;
    
  }
`;

var icon = (
  <span class="logo">
    <a href="/">
      <img src="/awesome-logo.png" height="33" width="120" alt="text here" /></a>
  </span>
);

function App() {
  return (
   // <div className="App">
   <body style={{ backgroundImage:`url(${nature})` ,backgroundColor:"white"}}>
      <Router>
      <div >

      




<div style={{opacity:0.9}}>
    <Navbar bg="dark" variant="dark" >
      
    <Navbar.Brand  > 
      <Link to="/">
       <img width="70px" height="auto" className="img-responsive" src={Logo}  alt="logo" />              
      </Link> 
     </Navbar.Brand>

    <Nav className="mr-auto">
      <Nav.Link href="#home"><StyledLink exact to="/" >Home</StyledLink></Nav.Link>
      <Nav.Link href="#features"><StyledLink exact to="/view" >View </StyledLink></Nav.Link>
      <Nav.Link href="#pricing"><StyledLink exact to="/register"   >Register</StyledLink></Nav.Link>
    
    </Nav>
    


    <Form  className="mr-sm-2" inline>
    <DigitalClock />
     
    </Form>
  </Navbar>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/view">
            <EmployeeListComponent />
          </Route>
          

          <Route exact path="/register">
           <EmployeeRegister/>
          </Route>

          <Route  path="/edit/:id" render={(props)=> <EmployeeRegister/>}>
           
          </Route>

         
          <Route exact path="/">  {/* to go home page   if any wrong url enter  then remove exact  */}
            <Home />
            
          </Route>

          <Route >
            <ErrorPage />    {/*  if exact is present at other place  and for any other wrong url, go to error page */}
          </Route>   
        </Switch>
      </div>
    </Router></body>
   // </div>
  );



}

function Home() {
  return (<>
  <h2 style={{textAlign: "center",color:"blue",fontSize:"30px"}} className="glow">
  🏡 Welcome To Home🏡 </h2>;
  </>)
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function ErrorPage() {
  return <h2>Page Not Found</h2>;
}

export default App;
