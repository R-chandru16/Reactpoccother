import React from "react";
import EmployeeService from "../Services/EmployeeService";
import './employeelist.css'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 

 
class EmployeeList extends React.Component{

     
    constructor(props){
        super(props)
        this.state={
            employees:[],
            currentPage:1,
            employeesPerPage:5
        }
        this.addEmployee=this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
        this.deleteButton=this.deleteButton.bind(this);
        this.searchItems=this.searchItems.bind(this);
        
    }
    deleteButton(id)
    {
        confirmAlert({
            title:'Delete Confirmation',
            message:'Are you sure you want to delete this ?',
            buttons:[
                {
                    label:'Delete',
                    className:'but1',
                    onClick:()=> this.deleteEmployee(id)
                },
                {
                    label:'Cancel',
                    onClick:()=>window.location='/viewemployee'
                }
            ]

          });
        
    }
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res=>{
            this.setState({employees:this.state.employees.filter(employee=>employee.id!==id)});
        });
        window.location='/viewemployee';
        localStorage.setItem('Deletestatus',true);
       
    }
   

    editEmployee(id){
     localStorage.setItem('userid',id);
      window.location='/update';
      
    }
    addEmployee(){
        window.location="/create";
    }
    displayToast=()=>{
        if(localStorage.getItem('Deletestatus'))  {
            toast('Deleted Successfully',{
                position:toast.POSITION.BOTTOM_CENTER,
                type:toast.TYPE.SUCCESS,
                toastId:'del'
             })      
             
           
          
           }
           if(localStorage.getItem('Resgisterstatus'))  {
                toast('Added Successfully',{
                    position:toast.POSITION.BOTTOM_CENTER,
                    type:toast.TYPE.SUCCESS,
                    toastId:'add',

                 })      
                 
                
            
                  
               }
               if(localStorage.getItem('Updatestatus'))  {
                toast('Updated Successfully ',{
                    position:toast.POSITION.BOTTOM_CENTER,
                    type:toast.TYPE.SUCCESS,
                    toastId:'update',
                 })      
                   
                 
            
                 
               }
               
    }
    clearData=()=>{
        localStorage.removeItem('Resgisterstatus');
        localStorage.removeItem('Deletestatus');
        localStorage.removeItem('Updatestatus');
    }
 
    componentDidMount(){
       
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees:res.data});
             
        this.displayToast(); 
        this.clearData();
        });
         
        
    }
    searchItems=(event)=>{
        let searchval=event.target.value.toLowerCase();
         
        let res=this.state.employees.filter(employee=>{ 
            return(((employee.employeeId.toString()).indexOf(searchval)!==-1)||
            ((employee.employeeName.toLowerCase()).indexOf(searchval)!==-1)||
            ((employee.employeeEmailId.toLowerCase()).indexOf(searchval)!==-1)||
            ((employee.employeePhone.toString()).indexOf(searchval)!==-1)||
            ((employee.branch.toLowerCase()).indexOf(searchval)!==-1))

        })
        if(res==""||searchval==""){
           
           if(res==""){
            toast("Searched value not found",
            {
                position:toast.POSITION.BOTTOM_CENTER,
                type: toast.TYPE.WARNING,
                toastId:'search',
                autoClose:1000,
                onClose:function(){
                  window.location.reload();
                }
                
            })
        
           }
           else{
            window.location.reload();
           }
           
          
            
        }
        else{
            this.setState({
                employees:res
            })
        }
       
       
    }
    
 
    render(){
      
     const indexOfLastEmpolyee=this.state.currentPage * this.state.employeesPerPage;
     const indexOfFirstEmployee=indexOfLastEmpolyee-this.state.employeesPerPage;
     const currentEmployees=this.state.employees.slice(indexOfFirstEmployee,indexOfLastEmpolyee);
     const pageNumbers=[];
     
     for(let i=1;i<=Math.ceil(this.state.employees.length/this.state.employeesPerPage);i++){
        pageNumbers.push(i);
     }
    const setPage=(pageNum)=>{
        this.setState({currentPage:pageNum})
    }

        return(
            <div className="container">
               
                <div className="addbtn">
                    <button className="add" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="addbtn">
                       <input type="text" placeholder="Search here" onChange={(e)=>this.searchItems(e)}/>
                </div>
               
                <br></br>
                 
                <h3>Employee Details</h3>
                    <table className="table">
                       
                    <thead className="dark">
                     <tr>
                         <th>Id</th>
                         <th>Name</th>
                         <th>Email Id</th>
                         <th>Phone number</th>
                         <th>Branch</th>
                         <th></th>
                         <th></th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                     currentEmployees.map(items=>(
                         <tr key={items.employeeId}>
                             <td>{items.employeeId}</td>
                             <td>{items.employeeName}</td>
                             <td>{items.employeeEmailId}</td>
                             <td>{items.employeePhone}</td>
                             <td>{items.branch}</td>
                             <td><button className="btn btn-primary" onClick={()=>this.editEmployee(items.employeeId)}>Edit</button></td>
                             <td><button className="btn btn-danger"  onClick={()=>this.deleteButton(items.employeeId)}>Delete</button></td>
                             <td></td>
                         </tr>
                     ))}
                 </tbody>
                    </table>
                    <div className="pagination">
                     {
                        pageNumbers.map((pageNum,index)=>(
                            <span key={index}   onClick={()=>{setPage(pageNum)}}>
                                {pageNum}
                            </span>
                        ))
                     }
                    </div>
                
                </div>
               
        )
    }
}
export default EmployeeList