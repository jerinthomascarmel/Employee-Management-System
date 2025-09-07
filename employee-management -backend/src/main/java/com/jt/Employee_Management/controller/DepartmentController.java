package com.jt.Employee_Management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jt.Employee_Management.service.DepartmentService;
import com.jt.Employee_Management.model.Department;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;


    //count of departments
    @GetMapping("/departments/count")
    public ResponseEntity<Long> getDepartmentCount() {
        long count = departmentService.getDepartmentCount();
        return ResponseEntity.ok(count);
    }

    // displaying list of all departments
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    // displaying department by id
    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable int id) {
        Department d = departmentService.getDepartmentById(id);
        if (d == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(d);
    }

    // adding a department
    @PostMapping("/departments")
    public ResponseEntity<String> addDepartment(@RequestBody Department department) {
        departmentService.addDepartment(department);
        return new ResponseEntity<>("department created ", HttpStatus.CREATED);
    }

    // updating a department by id
    @PutMapping("/departments/{id}")
    public ResponseEntity<String> updateDepartment(@PathVariable int id, @RequestBody Department department) {
        departmentService.updateDepartment(id, department);
        return new ResponseEntity<>("department updated ", HttpStatus.OK);
    }

    // deleting a department by id
    @DeleteMapping("/departments/{id}")
    public ResponseEntity<String> deleteDepartmentByID(@PathVariable int id) {
        departmentService.deleteDepartmentByID(id);
        return new ResponseEntity<>("department deleted ", HttpStatus.OK);
    }

}