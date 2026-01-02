"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Save, X, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SearchFilter {
  field: string
  operator: string
  value: string
}

export function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilter[]>([])
  const [savedSearches, setSavedSearches] = useState([
    { id: "1", name: "High Value Exceptions", query: "amount > 100000" },
    { id: "2", name: "Critical Open Items", query: "severity:critical status:open" },
  ])

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "equals", value: "" }])
  }

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index))
  }

  const updateFilter = (index: number, updates: Partial<SearchFilter>) => {
    const newFilters = [...filters]
    newFilters[index] = { ...newFilters[index], ...updates }
    setFilters(newFilters)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Advanced Search</CardTitle>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Saved Searches
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Saved Searches</DialogTitle>
                  <DialogDescription>
                    Load or manage your saved search queries
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  {savedSearches.map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{search.name}</div>
                        <div className="text-sm text-muted-foreground">{search.query}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Load
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Search Query</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all fields..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Filters</Label>
            <Button variant="outline" size="sm" onClick={addFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Add Filter
            </Button>
          </div>
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-2">
              <Select
                value={filter.field}
                onValueChange={(value) => updateFilter(index, { field: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="severity">Severity</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filter.operator}
                onValueChange={(value) => updateFilter(index, { operator: value })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="greater">Greater than</SelectItem>
                  <SelectItem value="less">Less than</SelectItem>
                  <SelectItem value="between">Between</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={filter.value}
                onChange={(e) => updateFilter(index, { value: e.target.value })}
                placeholder="Value"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFilter(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="outline" onClick={() => {
            setSearchQuery("")
            setFilters([])
          }}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

