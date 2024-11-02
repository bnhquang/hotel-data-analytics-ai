'use client'

import { Menu, BarChart, PieChart, LineChart, ScatterChart, Activity, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Analytics Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Link
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <BarChart className="mr-3 h-5 w-5" />
            Chart 1
          </Link>
          <Link
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <PieChart className="mr-3 h-5 w-5" />
            Chart 2
          </Link>
          <Link
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <LineChart className="mr-3 h-5 w-5" />
            Chart 3
          </Link>
          <Link
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            href="#"
          >
            <ScatterChart className="mr-3 h-5 w-5" />
            Chart 4
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Activity className="h-4 w-4" />
              <span className="sr-only">Activity</span>
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Chart grid */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Chart placeholders */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center"
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Chart {i + 1}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}