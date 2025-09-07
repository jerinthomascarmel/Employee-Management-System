package com.jt.Employee_Management.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;


@Entity 
public class Department {
    
  @Id
  @Column(name="department_id")
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer departmentId;
  private String shortName;
  private String departmentName;


  public Department() {
  }

  
  public Integer getDepartmentId() {
    return departmentId;
  }

  public void setDepartmentId(Integer departmentId) {
    this.departmentId = departmentId;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }

  public String getShortName() {
    return shortName;
  }

  public void setDepartmentName(String departmentName) {
    this.departmentName = departmentName;
  }

  public String getDepartmentName() {
    return departmentName;
  }

  @Override
  public String toString() {
    return "Department [departmentId=" + departmentId + ", shortName=" + shortName + ", departmentName="
        + departmentName + "]";
  }
}

