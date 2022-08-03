import React from "react";
import EmployeeService from "../Services/EmployeeService";
import './addemployee.css'
 
import{Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UpdateEmployee extends React.Component{

    constructor(props){
        super(props)
        this.state={
             
            employeeID:'',
            employeeName:'',
            employeeEmailId:'',
            employeePhone :0,
            departmentId:0,
            branch:'',
            password:'',
            
            errors:{}  
        }
         
        this.empid=this.empid.bind(this);
        this.empname=this.empname.bind(this);
        this.empemail=this.empemail.bind(this);
        this.empphone=this.empphone.bind(this);
        this.empdept=this.empdept.bind(this);
        this.empbranch=this.empbranch.bind(this);
        this.emppass=this.emppass.bind(this);
         
        this.UpdateEmployee=this.UpdateEmployee.bind(this);
        this.cancel=this.cancel.bind(this);
    }

    componentDidMount(){
        
        EmployeeService.getEmployeeById(localStorage.getItem('userid')).then((res)=>{
            let employee=res.data;
            this.setState({
                employeeID:localStorage.getItem('userid')
                ,employeeName:employee.employeeName,
                employeeEmailId: employee.employeeEmailId,
                employeePhone:employee.employeePhone,
              departmentId:employee.departmentId,
               branch:employee.branch,
               password:employee.password
            });
        });
    }

    UpdateEmployee=(e)=>{
        e.preventDefault();
        let errors={};
        var pattern=new RegExp( /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
        var patt=new RegExp(/\d$/);        
        let formvalidstatus=true;  
         
        if(this.state.employeeName==""){
            
         formvalidstatus=false;
         errors["name"]="*Please enter your name !";
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
      
      
    this.setState({
        errors:errors
    });
    if(formvalidstatus==true){
        let employee={
            employeeID:this.state.employeeID,
            employeeName:this.state.employeeName,
            employeeEmailId:this.state.employeeEmailId,
            employeePhone:this.state.employeePhone,
          departmentId:this.state.departmentId,
           branch:this.state.branch,
           password:this.state.password
          };
          console.log('employee=>'+JSON.stringify(employee));

          EmployeeService.updateEmployee(employee).then(res=>{
            
             window.location="/viewemployee";
             localStorage.setItem('Updatestatus',true);
            
          })
    }
}
    empid(event){
        this.setState({employeeID:event.target.value});
     }
    empname(event){
        this.setState({employeeName:event.target.value});
     }
     empemail(event){
        this.setState({employeeEmailId:event.target.value});
     }
     empphone(event){
        this.setState({employeePhone:event.target.value});
     }
     empdept(event){
        this.setState({departmentId:event.target.value});
     }
     empbranch(event){
        this.setState({branch:event.target.value});
     }
     emppass(event){
        this.setState({password:event.target.value});
     }
     cancel(){
       alert( window.location.replace('http://localhost:3000/'))
     }
      
     render(){
        
        return(
            <div>
                  
            <form className="addform">
                <h3>Update Employee</h3><br></br>
               
                <input  id="empid" type="hidden" value={this.state.employeeID} onChange={this.empid}></input><br></br>
               <label id="empname" >Name</label>
                <input  id="empname" type="text" name="name" value={this.state.employeeName} onChange={this.empname}></input><br></br>
                <div className="errorMsg">{this.state.errors.name}</div>
                <label id="empemail">Email Id</label>
                <input  id="empemail" name="email" type="text" disabled="true"  value={this.state.employeeEmailId} onChange={ this.empemail}></input><br></br>
                <label id="empphone">Phone number</label>
                <input  id="empphone" type="tel" name="phone"  value={this.state.employeePhone}  onChange={this.empphone}></input><br></br>
                <div className="errorMsg">{this.state.errors.phone}</div>
                <label id="empdeptid">Department Id</label>
                <input  id="empdeptid" type="number" name="dept"  value={this.state.departmentId}  onChange={ this.empdept}></input><br></br>
                <div className="errorMsg">{this.state.errors.dept}</div>
                <label id="empbranch">Branch</label>
                <input  id="empbranch" type="text" name="branch"  value={this.state.branch} onChange={ this.empbranch}></input><br></br>
                <div className="errorMsg">{this.state.errors.branch}</div>
                <label id="emppass">Password</label>
                <input  id="emppass" type="password" name="pass"   disabled="true" value={this.state.password}  onChange={ this.emppass}></input><br></br>
                <button className="btn btn-warning buttonc " onClick={(e)=>this.UpdateEmployee(e)}>Update</button>
              <Link to={'/'}><button className="btn btn-primary butc" type="submit" onClick={()=>{window.location='/viewemployee'}}>Back</button>
            </Link>   
            </form>
        </div>
            
        )
     }

}
export default UpdateEmployee