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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import HouseCountryOfGuests from "@/components/charts/HouseCountryOfGuests";
import AverageGuestPerMonth from "@/components/charts/AverageGuestPerMonth";
import LengthOfStay from "@/components/charts/LengthOfStay";
import BoxPlotDistributionOfADR from "@/components/charts/BoxPlotDistributionOfADR";
import SunburstChart from "@/components/charts/SunburstChart";
import AveragePriceByMonth from "@/components/charts/AveragePriceByMonth";
import InterpretationDialog from "@/components/InterpretationDialog";
import interpretations from "@/public/chartInterpretations.json";

export default function Dashboard() {
    const [showPieChart, setShowPieChart] = useState(true);
    const [dialogOpenState, setDialogOpenState] = useState(
        Array(interpretations.graphs.length).fill(false)
    );

    const handleDialogOpenChange = (index, isOpen) => {
        setDialogOpenState((prev) => {
            const newState = [...prev];
            newState[index] = isOpen;
            return newState;
        });
    };

    const renderChart = (index) => {
        switch (index) {
            case 0:
                return <HouseCountryOfGuests showPieChart={showPieChart} />;
            case 1:
                return <SunburstChart />;
            case 2:
                return <AverageGuestPerMonth />;
            case 3:
                return <AveragePriceByMonth />;
            case 4:
                return <LengthOfStay />;
            case 5:
                return <BoxPlotDistributionOfADR />;
            default:
                return <div>No Chart Available</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
                {interpretations.graphs.map((graph, index) => (
                    <Card
                        key={index}
                        className={`${
                            graph.title.includes("Length") ||
                            graph.title.includes("Distribution")
                                ? "col-span-2"
                                : "col-span-1"
                        }`}
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{graph.title}</CardTitle>
                                <InterpretationDialog
                                    isOpen={dialogOpenState[index]}
                                    onOpenChange={(isOpen) =>
                                        handleDialogOpenChange(index, isOpen)
                                    }
                                    title="Personal Interpretation"
                                    content={graph.content}
                                    endPoint={graph.api_endpoint}
                                    chartTitle={graph.title}
                                />
                            </div>
                        </CardHeader>
                        <CardContent
                            className={`${
                                graph.title.includes("Sunburst")
                                    ? "h-[600px]"
                                    : "h-[400px]"
                            }`}
                        >
                            {renderChart(index)}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
