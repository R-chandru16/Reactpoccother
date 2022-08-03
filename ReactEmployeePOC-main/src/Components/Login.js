import React, { Component } from "react";
import EmployeeService from "../Services/EmployeeService";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';



class Login extends Component{
    
    constructor(props){
        super(props)
        this.state={
            employeeEmailId:'',
            password:'',
            errors:{}           
            
        }
        this.empemail=this.empemail.bind(this);
        this.emppass=this.emppass.bind(this);
        this.login=this.login.bind(this);
        
    }
   
    
    login=(e)=>{
        
        e.preventDefault();
        let errors={};
        var pattern=new RegExp( /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
        let formvalidstatus=true;  
          
        if(this.state.employeeEmailId=="") {
            
           formvalidstatus=false;
           errors["email"]="*Please enter your email !";
        }
        else if(!pattern.test(this.state.employeeEmailId)){
            
            formvalidstatus=false;
            errors["email"]="*Please enter a valid email !";
        }
         if(this.state.password==""){
            formvalidstatus=false;
            errors["pass"]="*Please enter your password !";
        }
        else  if((this.state.password).length <8){
            
            formvalidstatus=false;
            errors["pass"]="*Please enter a valid password !";
         }
        //else{
        //     formvalidstatus=true;
        // }
        this.setState({
            errors:errors
        });
        if(formvalidstatus==true){
            let employee={employeeEmailId:this.state.employeeEmailId,
                password:this.state.password};
                
                
                console.log('employee=>'+JSON.stringify(employee));
                EmployeeService.login(employee).then(res=>{
                    
                    if(res['status']==200)
                    {
                        localStorage.setItem('useremailid',this.state.employeeEmailId);
                        localStorage.setItem('Loginsuccess',true); 
                        
                        window.location='/viewemployee';
                       
                        
                    }else{
                        toast('Login Failed',{
                            position:toast.POSITION.BOTTOM_CENTER,
                            type:toast.TYPE.ERROR,
                         })      
                         toast.show();        
                        localStorage.removeItem('useremailid');
                        window.location='/';
                    }
                    
                });
        }
        
    }


 

    empemail=(event)=>{
        
        this.setState({employeeEmailId:event.target.value});
       
        
       
    }
    emppass=(event)=>{
        this.setState({password:event.target.value});
    }

     

    render(){
        return(
            <div>
                <form className="addform"   >
                <h3>Login</h3><br></br>
                 <label id="empemail">Username</label>
                <input  id="empemail" type="email" name="email"  value={this.state.employeeEmailId} onChange={(e)=> this.empemail(e)} ></input><br></br>
                <div className="errorMsg">{this.state.errors.email}</div>
                 <label id="emppassw">Password</label>
                <input  id="emppassw" type="password" name="pass"    value={this.state.password}  onChange={(e)=>this.emppass(e)}></input><br></br>
                <div className="errorMsg">{this.state.errors.pass}</div>
                <button className="btn btn-warning buttonc" onClick={this.login}>Login</button>
                 
            </form>
            </div>
        )
    }
   
}
export default Login