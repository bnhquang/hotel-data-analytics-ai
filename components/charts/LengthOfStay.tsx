"use client";

import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

export default function LengthOfStay() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/length_of_stay_distribution"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                console.log(result);
                setData(result);
            } catch {}
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="num_nights"
                        tick={{ fill: "hsl(var(--foreground))" }}
                        tickLine={{ stroke: "hsl(var(--foreground))" }}
                    />
                    <YAxis
                        tick={{ fill: "hsl(var(--foreground))" }}
                        tickLine={{ stroke: "hsl(var(--foreground))" }}
                    />
                    <ChartTooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="font-bold text-muted-foreground">
                                            {label}
                                        </div>
                                        {payload.map((entry) => (
                                            <div
                                                key={entry.name}
                                                className="flex items-center"
                                            >
                                                <div
                                                    className="mr-2 h-2 w-2 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            entry.color,
                                                    }}
                                                />
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    {entry.name}
                                                </span>
                                                <span className="ml-2 font-bold text-muted-foreground">
                                                    {entry.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    <Bar
                        dataKey="City Hotel"
                        fill="#5A848A"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="Resort Hotel"
                        fill="#564334"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
