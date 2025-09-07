package com.jt.Employee_Management.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;


@Entity 
public class Employee {

    @Id
	@Column(name="employee_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int employeeID;
	private String firstName;
	private String lastName;
	
    
	@ManyToOne
    @JoinColumn(name="department_id")
	private Department department;


    
    public Employee() {
    }

    public Employee(int employeeID, String firstName, String lastName, Department department) {
        this.employeeID = employeeID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
    }

    // public Employee(String firstName, String lastName, Department department) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.department = department;
    // }


    public int getEmployeeID() {
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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @Override 
    public String toString() {
        return "Employee [employeeID=" + employeeID + ", firstName=" + firstName + ", lastName=" + lastName
                + ", department=" + department + "]";
    }

}

