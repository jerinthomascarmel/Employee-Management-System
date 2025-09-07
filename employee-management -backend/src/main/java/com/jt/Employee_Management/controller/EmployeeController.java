package com.jt.Employee_Management.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.jt.Employee_Management.model.Employee;
import com.jt.Employee_Management.model.Department;
import com.jt.Employee_Management.service.EmployeeService;
import com.jt.Employee_Management.service.DepartmentService;
import com.jt.Employee_Management.dto.EmployeeDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private DepartmentService departmentService;


	//count of employees 
	@GetMapping("/employees/count")
	public ResponseEntity<Long> getEmployeeCount() {
		long count = employeeService.getEmployeeCount();
		return ResponseEntity.ok(count);
	}

	// displaying list of all employees
	@GetMapping("/employees")
	public ResponseEntity<List<Employee>> getAllEmployee() {
		return ResponseEntity.ok(employeeService.getAllEmployees());
	}

	// displaying employee by id
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable int id) {
		Employee emp = employeeService.getEmployeeById(id);
		if (emp == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(emp);
	}

	// adding an employee
	@PostMapping("/employees")
	public ResponseEntity<String> addEmployee(@RequestBody EmployeeDTO empDTO) {
		Department dept = departmentService.getDepartmentById(empDTO.getDepartmentId());

		Employee emp = empDTO.toEntity();
		if (dept != null){
			emp.setDepartment(dept);
		}

		employeeService.addEmployee(emp);
		return new ResponseEntity<>("Employee created", HttpStatus.CREATED);
	}

	// updating an employee by id
	@PutMapping("/employees/{id}")
	public ResponseEntity<String> updateEmployee(@PathVariable int id, @RequestBody EmployeeDTO empDTO) {
		Department dept = departmentService.getDepartmentById(empDTO.getDepartmentId());

		Employee emp = empDTO.toEntity();
		if (dept != null) {
			emp.setDepartment(dept);
		}
	
		employeeService.updateEmployee(id, emp);
		return new ResponseEntity<>("Employee updated", HttpStatus.OK);
	}

	// deleting an employee by id
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
		employeeService.deleteEmployeeById(id);
		return new ResponseEntity<>("Employee deleted", HttpStatus.OK);
	}

}