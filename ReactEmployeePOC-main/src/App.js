import logo from './logo.svg';
import './App.css';
import EmployeeList from './Components/EmployeeList';
import { BrowserRouter ,Route,Routes,Link} from 'react-router-dom';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import pic from "./images/layout.png";
import Login from './Components/Login';
import { useState } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 toast.configure();


function App() {
 const [log,setLog]=useState(localStorage.getItem('Loginsuccess'));
  const Logout=()=>{
    localStorage.removeItem('Loginsuccess');
    localStorage.removeItem('Resgisterstatus');
    localStorage.removeItem('Deletestatus');
    localStorage.removeItem('Updatestatus');
    window.location.reload();
    window.location="/";
  }
  return (
    
    
    <BrowserRouter>
    
    <div className="App">
    <div className="nav">
      
      {!log &&(
        
        <>
         <ul>
                    <li className="logo"><img src={pic}></img></li>
                    <li className="logo name">AdBoard</li>
                    
                    
                   
                </ul>
        </>
       
      )}
      {log  &&(
        <>
           <ul>          
                    <li className="logo"><img src={pic}></img></li>
                    <li className="logo name">AdBoard</li>
                   
                    <Link to={"/"} className='logo1'><li className='logo2' onClick={Logout}>Logout</li>
                    </Link>
                    <li className='logo2' >Hello! {localStorage.getItem('useremailid')}</li>
                  
                   

                   
                </ul>
        </>
      )}
    
      </div>
                
            
     <Routes>
      <Route path="/viewemployee" element={<EmployeeList/>}></Route>
      <Route path="/create" element={<AddEmployee/>}></Route>
      <Route path='/update' element={<UpdateEmployee/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      
     </Routes>
       
     </div>
   
    </BrowserRouter>
    );

 }
 
 

export default App;
