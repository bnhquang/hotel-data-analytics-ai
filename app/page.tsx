"use client";

import {
    Menu,
    BarChart,
    PieChart,
    LineChart,
    ScatterChart,
    Activity,
    Settings,
    HelpCircle,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import HouseCountryOfGuests from "@/components/charts/HouseCountryOfGuests";
import AverageGuestPerMonth from "@/components/charts/AverageGuestPerMonth";
import LengthOfStay from "@/components/charts/LengthOfStay";
import BoxPlotDistributionOfADR from "@/components/charts/BoxPlotDistributionOfADR";
import SunburstChart from "@/components/charts/SunburstChart";
import AveragePriceByMonth from "@/components/charts/AveragePriceByMonth";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
    const [showPieChart, setShowPieChart] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Analytics Dashboard
                    </h2>
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

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <CardTitle>
                                            Home Country of Guests
                                        </CardTitle>
                                        <CardDescription>
                                            Switch between Pie Chart and Treemap
                                        </CardDescription>
                                    </div>
                                    <Dialog
                                        open={isOpen1}
                                        onOpenChange={setIsOpen1}
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="default">
                                                Interpretation
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Personal Interpretation
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <p>
                                                    This is the main content
                                                    area of the dialog. You can
                                                    add any components or
                                                    content here.
                                                </p>
                                                <p>
                                                    For example, you could
                                                    include forms, tables, or
                                                    any other complex UI
                                                    elements.
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsOpen1(false)
                                                    }
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[500px]">
                                <HouseCountryOfGuests
                                    showPieChart={showPieChart}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>
                                        Sunburst Chart of Market Segment,
                                        Reservation Status and Customer Type
                                    </CardTitle>
                                    <Dialog
                                        open={isOpen}
                                        onOpenChange={setIsOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="default">
                                                Interpretation
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Personal Interpretation
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <p>
                                                    This is the main content
                                                    area of the dialog. You can
                                                    add any components or
                                                    content here.
                                                </p>
                                                <p>
                                                    For example, you could
                                                    include forms, tables, or
                                                    any other complex UI
                                                    elements.
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[600px]">
                                <SunburstChart />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>
                                        Average Number of Hotel Guests per Month
                                    </CardTitle>
                                    <Dialog
                                        open={isOpen2}
                                        onOpenChange={setIsOpen2}
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="default">
                                                Interpretation
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Personal Interpretation
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <p>
                                                    This is the main content
                                                    area of the dialog. You can
                                                    add any components or
                                                    content here.
                                                </p>
                                                <p>
                                                    For example, you could
                                                    include forms, tables, or
                                                    any other complex UI
                                                    elements.
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsOpen2(false)
                                                    }
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>{" "}
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <AverageGuestPerMonth />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>
                                        Room Price per Night and per Person by
                                        Month{" "}
                                    </CardTitle>
                                    <Dialog
                                        open={isOpen3}
                                        onOpenChange={setIsOpen3}
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="default">
                                                Interpretation
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Personal Interpretation
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <p>
                                                    This is the main content
                                                    area of the dialog. You can
                                                    add any components or
                                                    content here.
                                                </p>
                                                <p>
                                                    For example, you could
                                                    include forms, tables, or
                                                    any other complex UI
                                                    elements.
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsOpen3(false)
                                                    }
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <AveragePriceByMonth />
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>
                                        Length of Stay By Month{" "}
                                    </CardTitle>
                                    <Dialog
                                        open={isOpen4}
                                        onOpenChange={setIsOpen4}
                                    >
                                        <DialogTrigger asChild>
                                            <Button variant="default">
                                                Interpretation
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Personal Interpretation
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <p>
                                                    This is the main content
                                                    area of the dialog. You can
                                                    add any components or
                                                    content here.
                                                </p>
                                                <p>
                                                    For example, you could
                                                    include forms, tables, or
                                                    any other complex UI
                                                    elements.
                                                </p>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsOpen4(false)
                                                    }
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <LengthOfStay />
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Distribution of ADR</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <BoxPlotDistributionOfADR />
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
