"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Loader2, Search, Filter } from "lucide-react"
import { EmployeeForm } from "./employee-form"
import { useToast } from "@/hooks/use-toast"
import { Users } from "lucide-react"

interface Employee {
  employeeID: number
  firstName: string
  lastName: string
  department: {
    departmentId: number
    shortName: string
    departmentName: string
  } | null
}

interface Department {
  departmentId: number
  shortName: string
  departmentName: string
}



export function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [localSearchQuery, setLocalSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const { toast } = useToast()

  const API_BASE = "http://localhost:8080"

  const filteredEmployees = useMemo(() => {
    const query =  localSearchQuery
    return employees.filter((employee) => {
      const matchesSearch =
        query === "" ||
        employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(query.toLowerCase()) ||
        employee.department?.departmentName.toLowerCase().includes(query.toLowerCase()) ||
        employee.department?.shortName.toLowerCase().includes(query.toLowerCase())

      const matchesDepartment =
        departmentFilter === "all" ||
        (departmentFilter === "none" && !employee.department) ||
        employee.department?.departmentId.toString() === departmentFilter

      return matchesSearch && matchesDepartment
    })
  }, [employees, localSearchQuery, departmentFilter])

  useEffect(() => {
    fetchEmployees()
    fetchDepartments()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE}/employees`)
      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch employees",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Error fetching employees:", error)
      toast({
        title: "Connection Error",
        description: "Could not connect to the server. Please ensure your Spring Boot API is running on localhost:8080",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE}/departments`)
      if (response.ok) {
        const data = await response.json()
        setDepartments(data)
      }
    } catch (error) {
      console.log("[v0] Error fetching departments:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return

    try {
      const response = await fetch(`${API_BASE}/employees/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.employeeID !== id))
        toast({
          title: "Success",
          description: "Employee deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete employee",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Error deleting employee:", error)
      toast({
        title: "Error",
        description: "Could not delete employee",
        variant: "destructive",
      })
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingEmployee(null)
    fetchEmployees()
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading employees...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Manage your organization's employees and their department assignments</CardDescription>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees by name or department..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="none">No Department</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.departmentId} value={dept.departmentId.toString()}>
                      {dept.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {( localSearchQuery || departmentFilter !== "all") && (
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredEmployees.length} of {employees.length} employees
              {( localSearchQuery) && ` matching "${localSearchQuery}"`}
              {departmentFilter !== "all" &&
                ` in ${departmentFilter === "none" ? "no department" : departments.find((d) => d.departmentId.toString() === departmentFilter)?.departmentName}`}
            </div>
          )}

          {filteredEmployees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                {employees.length === 0
                  ? "No employees found. Add your first employee to get started."
                  : "No employees match your search criteria. Try adjusting your filters."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.employeeID}>
                    <TableCell className="font-medium">{employee.employeeID}</TableCell>
                    <TableCell>
                      {employee.firstName} {employee.lastName}
                    </TableCell>
                    <TableCell>
                      {employee.department ? (
                        <Badge variant="secondary">{employee.department.departmentName}</Badge>
                      ) : (
                        <Badge variant="outline">No Department</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingEmployee(employee)
                            setShowForm(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(employee.employeeID)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          departments={departments}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingEmployee(null)
          }}
          apiBase={API_BASE}
        />
      )}
    </div>
  )
}
