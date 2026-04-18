import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function AddTaskForm({ addTask }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [notes, setNotes] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim()) return

    addTask({
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      category,
      notes,
      completed: false,
      createdAt: new Date().toISOString(),
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
    setCategory("")
    setNotes("")
  }

  return (
    <Card className="max-w-md mx-auto shadow-lg rounded-2xl">
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Add Task
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}