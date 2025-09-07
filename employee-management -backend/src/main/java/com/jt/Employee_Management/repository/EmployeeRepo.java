package com.jt.Employee_Management.repository;

import org.springframework.data.repository.CrudRepository;
import com.jt.Employee_Management.model.Employee;


// interface extending crud repository
public interface EmployeeRepo extends CrudRepository<Employee, Integer>{
	
}