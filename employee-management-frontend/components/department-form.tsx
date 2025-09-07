"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Department {
  departmentId: number
  shortName: string
  departmentName: string
}

interface DepartmentFormProps {
  department?: Department | null
  onSuccess: () => void
  onCancel: () => void
  apiBase: string
}

export function DepartmentForm({ department, onSuccess, onCancel, apiBase }: DepartmentFormProps) {
  const [departmentName, setDepartmentName] = useState(department?.departmentName || "")
  const [shortName, setShortName] = useState(department?.shortName || "")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const departmentData = {
        departmentName,
        shortName,
      }

      const url = department ? `${apiBase}/departments/${department.departmentId}` : `${apiBase}/departments`

      const method = department ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: department ? "Department updated successfully" : "Department created successfully",
        })
        onSuccess()
      } else {
        const errorText = await response.text()
        toast({
          title: "Error",
          description: errorText || "Failed to save department",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Error saving department:", error)
      toast({
        title: "Error",
        description: "Could not save department",
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
            <CardTitle>{department ? "Edit Department" : "Add New Department"}</CardTitle>
            <CardDescription>
              {department ? "Update department information" : "Create a new department to organize employees"}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="departmentName">Department Name</Label>
            <Input
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
              placeholder="Enter department name (e.g., Human Resources)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortName">Short Name</Label>
            <Input
              id="shortName"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              required
              placeholder="Enter short name (e.g., HR)"
              maxLength={10}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {department ? "Update Department" : "Add Department"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
