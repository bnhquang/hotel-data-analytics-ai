"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function FieldInputPageComponent() {
  const [fields, setFields] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the submission of the fields
    console.log("Submitted fields:", fields.split(",").map(field => field.trim()))
    // You can add your logic here to process the fields or send them to an API
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Input Fields</CardTitle>
          <CardDescription>Paste the fields separated by a comma</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="hotel, is_canceled, lead_time, arrival_date_year, ..."
              value={fields}
              onChange={(e) => setFields(e.target.value)}
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}