package com.jt.Employee_Management.service;

import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import com.jt.Employee_Management.model.Department;
import com.jt.Employee_Management.model.Employee;
import com.jt.Employee_Management.repository.EmployeeRepo;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    // count of employees
    public long getEmployeeCount() {
        return employeeRepo.count();
    }

    // fetching all employees
    public List<Employee> getAllEmployees() {
        return (List<Employee>) employeeRepo.findAll();
    }

    // fetching employee by id
    public Employee getEmployeeById(int employeeId) {
        return employeeRepo.findById(employeeId).orElse(null);
    }

    // get Employee Department details by employee id
    public Department getEmployeeDepartmentById(int employeeId) {
        Employee employee = employeeRepo.findById(employeeId).orElse(null);
        if (employee != null) {
            return employee.getDepartment();
        }
        return null;
    }

    // inserting an employee
    public void addEmployee(Employee employee) {
        System.out.println(employee.toString());
        employeeRepo.save(employee);
    }

    // update an employee by id
    public void updateEmployee(int employeeId, Employee employee) {
        if (employeeRepo.existsById(employeeId)) {
            employee.setEmployeeID(employeeId);
            employeeRepo.save(employee);
        }
    }

    // delete an employee by id
    public void deleteEmployeeById(int employeeId) {
        employeeRepo.deleteById(employeeId);
    }
}