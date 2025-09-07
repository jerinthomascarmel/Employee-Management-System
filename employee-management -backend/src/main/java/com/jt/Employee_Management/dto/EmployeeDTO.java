package com.jt.Employee_Management.dto;

import com.jt.Employee_Management.model.Employee;

public class EmployeeDTO {
    private Integer employeeID;
    private String firstName;
    private String lastName;
    private Integer departmentId;

    public EmployeeDTO() {
    }

    public EmployeeDTO(int employeeID, String firstName, String lastName, int departmentId) {
        this.employeeID = employeeID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.departmentId = departmentId;
    }

    public Integer getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public Employee toEntity() {
        Employee emp = new Employee();
        if (this.employeeID != null) {
            emp.setEmployeeID(this.employeeID);
        }
        emp.setFirstName(this.firstName);
        emp.setLastName(this.lastName);
        return emp;
    }

    @Override
    public String toString() {
        return "EmployeeDTO [employeeID=" + employeeID + ", firstName=" + firstName + ", lastName=" + lastName
                + ", departmentId=" + departmentId + "]";
    }

}