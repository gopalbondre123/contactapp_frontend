import axios from 'axios';

import React, { Component } from 'react'

const URL='http://localhost:8080/employees';

export class EmployeeService extends Component {
    saveEmployee(data){
        return  axios.post(`${URL}/`,data);

         }

    getAllEmployees(){
        return  axios.get(`${URL}/`);

    }

    deleteEmployee(id){
        return  axios.delete(`${URL}/${id}`);

         }


   
}

export default new EmployeeService();
