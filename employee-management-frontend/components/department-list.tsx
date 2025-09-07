"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Loader2, Building2, Search } from "lucide-react"
import { DepartmentForm } from "./department-form"
import { useToast } from "@/hooks/use-toast"

interface Department {
  departmentId: number
  shortName: string
  departmentName: string
}


export function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [localSearchQuery, setLocalSearchQuery] = useState("")
  const { toast } = useToast()

  const API_BASE = "http://localhost:8080"

  const filteredDepartments = useMemo(() => {
    const query =  localSearchQuery
    return departments.filter((department) => {
      return (
        query === "" ||
        department.departmentName.toLowerCase().includes(query.toLowerCase()) ||
        department.shortName.toLowerCase().includes(query.toLowerCase()) ||
        department.departmentId.toString().includes(query)
      )
    })
  }, [departments, localSearchQuery])

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE}/departments`)
      if (response.ok) {
        const data = await response.json()
        setDepartments(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch departments",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Error fetching departments:", error)
      toast({
        title: "Connection Error",
        description: "Could not connect to the server. Please ensure your Spring Boot API is running on localhost:8080",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this department?")) return

    try {
      const response = await fetch(`${API_BASE}/departments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setDepartments(departments.filter((dept) => dept.departmentId !== id))
        toast({
          title: "Success",
          description: "Department deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete department",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Error deleting department:", error)
      toast({
        title: "Error",
        description: "Could not delete department",
        variant: "destructive",
      })
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingDepartment(null)
    fetchDepartments()
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading departments...</span>
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
              <CardTitle>Department Management</CardTitle>
              <CardDescription>Organize your workforce by creating and managing departments</CardDescription>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search departments by name or short name..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {( localSearchQuery) && (
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredDepartments.length} of {departments.length} departments matching "
              {  localSearchQuery}"
            </div>  
          )}

          {filteredDepartments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                {departments.length === 0
                  ? "No departments found. Create your first department to organize employees."
                  : "No departments match your search criteria. Try a different search term."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Short Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.departmentId}>
                    <TableCell className="font-medium">{department.departmentId}</TableCell>
                    <TableCell>{department.departmentName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{department.shortName}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingDepartment(department)
                            setShowForm(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(department.departmentId)}
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
        <DepartmentForm
          department={editingDepartment}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingDepartment(null)
          }}
          apiBase={API_BASE}
        />
      )}
    </div>
  )
}
