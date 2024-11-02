"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ButtonWithDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Open Large Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Large Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the large dialog. You can add any content here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>This is the main content area of the dialog. You can add any components or content here.</p>
          <p>For example, you could include forms, tables, or any other complex UI elements.</p>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}