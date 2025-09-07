"use client"

import {  useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, UserPlus } from "lucide-react"
import { EmployeeList } from "./employee-list"
import { DepartmentList } from "./department-list"

export function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const API_BASE = "http://localhost:8080"


  const [employeeCount , setEmpCount] = useState(null);
  const [departmentCount , setDeptCount] = useState(null);

  useEffect(()=>{
    const fetchCounts = async () => {
      if(activeTab !== "dashboard") return;
      try {
        const [employeeRes, departmentRes] = await Promise.all([
          fetch(`${API_BASE}/employees/count`),
          fetch(`${API_BASE}/departments/count`)
        ]);
        
        if (employeeRes.ok) {
          const empData = await employeeRes.json();
          console.log(empData);
          setEmpCount(empData);
        } else {
          console.error("Failed to fetch employee count");
        }
        if (departmentRes.ok) {
          const deptData = await departmentRes.json();
          setDeptCount(deptData);
        } else {
          console.error("Failed to fetch department count");
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();  
  },[activeTab])
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Employee Management System</h1>
              <p className="text-muted-foreground">Manage your workforce efficiently</p>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Professional Edition
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Departments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
          

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employeeCount ? employeeCount : "--"}</div>
                  <p className="text-xs text-muted-foreground">Active workforce</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Departments</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{departmentCount ? departmentCount : "--"}</div>
                  <p className="text-xs text-muted-foreground">Active departments</p>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-muted-foreground">Recent additions</p>
                </CardContent>
              </Card> */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Online</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Welcome to Employee Management</CardTitle>
                <CardDescription>
                  Use the tabs above to manage employees and departments. All data is synchronized with your Spring Boot
                  backend.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Actions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Add new employees to your organization</li>
                      <li>• Create and manage departments</li>
                      <li>• Update employee information</li>
                      <li>• View comprehensive employee listings</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">API Integration</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Connected to Spring Boot backend</li>
                      <li>• Real-time data synchronization</li>
                      <li>• Professional CRUD operations</li>
                      <li>• Secure data management</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeList  />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
