import React, { Component } from "react";
import EmployeeService from "../Services/EmployeeService";
import'./addemployee.css'
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddEmployee extends Component{
    constructor(props){
        super(props)
        this.state={
            employeeName:'',
            employeeEmailId:'',
            employeePhone :0,
            departmentId:0,
            branch:'',
            password:'', 
            confirmpassword:'',
            errors:{}   
        }

        this.empname=this.empname.bind(this);
        this.empemail=this.empemail.bind(this);
        this.empphone=this.empphone.bind(this);
        this.empdept=this.empdept.bind(this);
        this.empbranch=this.empbranch.bind(this);
        this.emppass=this.emppass.bind(this);
        this.empconfirmpass=this.empconfirmpass.bind(this);
        this.saveEmployee=this.saveEmployee.bind(this);
    } 
    
    saveEmployee=(e)=>{
        e.preventDefault();
        let errors={};
        var pattern=new RegExp( /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
        var patt=new RegExp(/\d$/);        
        let formvalidstatus=true;  
         
        if(this.state.employeeName==""){
            
         formvalidstatus=false;
         errors["name"]="*Please enter your name !";
        }       
        if(this.state.employeeEmailId=="") {            
         formvalidstatus=false;
         errors["email"]="*Please enter your email !";
        }
        else if(!pattern.test(this.state.employeeEmailId)){
          formvalidstatus=false;
          errors["email"]="*Please enter a valid email !";
        }
         if(this.state.employeePhone==""){
         formvalidstatus=false;
         errors["phone"]="*Please enter your phone number !";
        }
         else if((this.state.employeePhone).length !=10){
         formvalidstatus=false;
         errors["phone"]="*Phone number should contain 10 digits !";
        }
         else if(!patt.test(this.state.employeePhone)){
            formvalidstatus=false;
            errors["phone"]="*Phone number should only contain numbers !";
        }
         if(this.state.departmentId==""){
            formvalidstatus=false;
            errors["dept"]="*Please enter your department ID !";
           }

        else if(!patt.test(this.state.departmentId)){
            formvalidstatus=false;
            errors["dept"]="*Department Id should only contain numbers !";
        }
        else if(this.state.departmentId==""){
            formvalidstatus=false;
            errors["phone"]="*Please enter your department ID !";
           }
         
       if(this.state.branch==""){
          formvalidstatus=false;
          errors["branch"]="*Please enter your Branch !";
      }
       if((this.state.password)==""){
          
        formvalidstatus=false;
        errors["pass"]="*Please enter your password !";
    }
      else if((this.state.password).length <8){
          
          formvalidstatus=false;
          errors["pass"]="*Please enter a valid password !";
      }if(this.state.password != this.state.confirmpassword){
        formvalidstatus=false;
        errors["cpass"]="*Passwords kdo not match !";
      }
      
      this.setState({
          errors:errors
      });
      if(formvalidstatus==true){
        let employee={employeeName:this.state.employeeName,
                      employeeEmailId:this.state.employeeEmailId,
                      employeePhone:this.state.employeePhone,
                      departmentId:this.state.departmentId,
                      branch:this.state.branch,
                      password:this.state.password
                    };
                    console.log('employee=>'+JSON.stringify(employee));

                    EmployeeService.addEmployee(employee).then(res=>{
                        window.location="/viewemployee";
                        localStorage.setItem('Resgisterstatus',true);
                        
                        
                    });

    }
   }

    
     empname=(event)=>{
        this.setState({employeeName:event.target.value});
     }
     empemail=(event)=>{
        this.setState({employeeEmailId:event.target.value});
     }
     empphone=(event)=>{
        this.setState({employeePhone:event.target.value});
     }
     empdept=(event)=>{
        this.setState({departmentId:event.target.value});
     }
     empbranch=(event)=>{
        this.setState({branch:event.target.value});
     }
     emppass=(event)=>{
        this.setState({password:event.target.value});
     }
     empconfirmpass=(event)=>{
        this.setState({confirmpassword:event.target.value});
     }
     cancel(){
        window.location="/viewemployee";
     }

     render(){
        return(
            <div>
                  
            <form className="addform">
                <h3>Add Employee</h3><br></br>

                <label id="empname" >Employee Name</label>
                <input  id="empname" type="text" name="name"  onChange={(e)=> this.empname(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.name}</div>
                <label id="empemail">Employee EmailId</label>
                <input  id="empemail" type="text" name="email" onChange={(e)=> this.empemail(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.email}</div>
                <label id="empphone">Employee Phone</label>
                <input  id="empphone" type="tel" name="phone"  onChange={(e)=> this.empphone(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.phone}</div>
                <label id="empdeptid">Department Id</label>
                <input  id="empdeptid" type="number" name="dept"  onChange={(e)=>this.empdept(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.dept}</div>
                <label id="empbranch">Branch</label>
                <input  id="empbranch" type="text"  name="branch" onChange={(e)=>this.empbranch(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.branch}</div>
                <label id="emppass">Password</label>
                <input  id="emppass" type="password"  name="pass" onChange={(e)=>this.emppass(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.pass}</div>
                <label id="emppass">Confirm Password</label>
                <input  id="emppass" type="password"  name="cpass" onChange={(e)=>this.empconfirmpass(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.cpass}</div>
                <button className="btn btn-warning buttonc" onClick={this.saveEmployee}>Create</button>
                <Link to={'/'}><button className="btn btn-primary butc" type="submit" onClick={()=>{window.location='/viewemployee'}}>Back</button>
            </Link> 
            </form>
        </div>
            
        )
     }
}
export default AddEmployee