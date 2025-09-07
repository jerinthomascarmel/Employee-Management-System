"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

interface EmployeeFormProps {
  employee?: Employee | null
  departments: Department[]
  onSuccess: () => void
  onCancel: () => void
  apiBase: string
}

export function EmployeeForm({ employee, departments, onSuccess, onCancel, apiBase }: EmployeeFormProps) {
  const [firstName, setFirstName] = useState(employee?.firstName || "")
  const [lastName, setLastName] = useState(employee?.lastName || "")
  const [departmentId, setDepartmentId] = useState(employee?.department?.departmentId?.toString() || "none")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const employeeData = {
        firstName,
        lastName,
        departmentId: departmentId !== "none" ? Number.parseInt(departmentId) : null,
      }

      const url = employee ? `${apiBase}/employees/${employee.employeeID}` : `${apiBase}/employees`

      const method = employee ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: employee ? "Employee updated successfully" : "Employee created successfully",
        })
        onSuccess()
      } else {
        const errorText = await response.text()
        toast({
          title: "Error",
          description: errorText || "Failed to save employee",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Error saving employee:", error)
      toast({
        title: "Error",
        description: "Could not save employee",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{employee ? "Edit Employee" : "Add New Employee"}</CardTitle>
            <CardDescription>
              {employee ? "Update employee information" : "Enter employee details to add them to the system"}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={departmentId} onValueChange={setDepartmentId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a department (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Department</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.departmentId} value={dept.departmentId.toString()}>
                    {dept.departmentName} ({dept.shortName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {employee ? "Update Employee" : "Add Employee"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
