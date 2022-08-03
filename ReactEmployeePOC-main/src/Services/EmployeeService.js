import axios from "axios";

const Employee_Baseurl="https://localhost:44342/api/loginRegister";

class EmployeeService{
    getEmployees(){
        return axios.get(Employee_Baseurl+"/ViewAdmins");
    }
   
    login(employee){
        return axios.post(Employee_Baseurl+"/Login",employee);
    }

    addEmployee(employee){
        return axios.post(Employee_Baseurl+"/Register",employee);
    }

    getEmployeeById(employeeID){
        return axios.get(Employee_Baseurl+"/GetUserByID?id="+employeeID);
    }

    updateEmployee(employee){
        return axios.put(Employee_Baseurl+"/EditAdmin",employee);
    }

    deleteEmployee(employeeID)
    {
        return axios.delete(Employee_Baseurl+"/DeleteAdmin?id="+employeeID);
    }

}

export default new EmployeeService()