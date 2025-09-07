package com.jt.Employee_Management.repository;

import org.springframework.data.repository.CrudRepository;
import com.jt.Employee_Management.model.Department;



public interface DepartmentRepo extends CrudRepository<Department, Integer>{

}