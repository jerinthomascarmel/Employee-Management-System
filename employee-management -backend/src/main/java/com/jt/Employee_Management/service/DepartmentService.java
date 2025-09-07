package com.jt.Employee_Management.service;

import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import com.jt.Employee_Management.model.Department;
import com.jt.Employee_Management.repository.DepartmentRepo;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepo departmentRepo;

    // count of departments
    public long getDepartmentCount() {
        return departmentRepo.count();
    }

    // fetching all departments
    public List<Department> getAllDepartments() {
        return (List<Department>) departmentRepo.findAll();
    }

    // fetching department by id
    public Department getDepartmentById(Integer departmentId) {
        if (departmentId == null) {
            return null;
        }
        return departmentRepo.findById(departmentId).orElse(null);
    }

    // adding a department
    public void addDepartment(Department department) {
        departmentRepo.save(department);
    }

    // update a department
    public void updateDepartment(Integer departmentId, Department department) {
        if (departmentRepo.existsById(departmentId)) {
            department.setDepartmentId(departmentId);
            departmentRepo.save(department);
        }

    }

    // delete a department
    public void deleteDepartmentByID(Integer departmentId) {
        departmentRepo.deleteById(departmentId);
    }

}