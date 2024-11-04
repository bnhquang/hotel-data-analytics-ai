import { useEffect, useState } from "react";
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// const data = [
//     { month: "Jan", sales: 4000, revenue: 2400 },
//     { month: "Feb", sales: 3000, revenue: 1398 },
//     { month: "Mar", sales: 2000, revenue: 9800 },
//     { month: "Apr", sales: 2780, revenue: 3908 },
//     { month: "May", sales: 1890, revenue: 4800 },
//     { month: "Jun", sales: 2390, revenue: 3800 },
//     { month: "Jul", sales: 3490, revenue: 4300 },
// ];

export default function AveragePriceByMonth() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_FAST_API_URL}/average_price_by_month`
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
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: "hsl(var(--foreground))" }}
                        tickLine={{ stroke: "hsl(var(--foreground))" }}
                    />
                    <YAxis
                        tick={{ fill: "hsl(var(--foreground))" }}
                        tickLine={{ stroke: "hsl(var(--foreground))" }}
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            {payload.map((entry) => (
                                                <div
                                                    key={entry.name}
                                                    className="flex flex-col"
                                                >
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        {entry.name}
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {entry.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="City Hotel"
                        stroke="#5A848A"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="Resort Hotel"
                        stroke="#564334"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
