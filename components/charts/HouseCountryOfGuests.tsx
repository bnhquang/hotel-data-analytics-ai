import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Treemap,
} from "recharts";
import { Button } from "../ui/button";

const COLORS = [
    "#1D1310",
    "#3F312A",
    "#564334",
    "#2C5357",
    "#587570",
    "#5A848A",
    "#A39986",
    "#294944",
];

const CustomizedContent = (props) => {
    const { depth, x, y, width, height, name, value, index } = props;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: COLORS[depth % COLORS.length], // Use color based on depth
                    stroke: "#fff",
                    strokeWidth: 2,
                }}
            />
            {width > 50 && height > 20 ? (
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={14}
                >
                    {name}
                </text>
            ) : null}
        </g>
    );
};

interface HouseCountryOfGuestsProps {
    showPieChart: boolean;
}

const HouseCountryOfGuests: React.FC<HouseCountryOfGuestsProps> = ({
    showPieChart,
}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/get_country_of_origin"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();

                setData(result);
            } catch {}
        };

        fetchData();
    }, []);

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                {showPieChart ? (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="font-medium">
                                                {data.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Value: {data.value}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        {/* <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                    /> */}
                    </PieChart>
                ) : (
                    <Treemap
                        data={data}
                        dataKey="value"
                        aspectRatio={3 / 4}
                        stroke="hsl(var(--background))"
                        fill="hsl(var(--primary))"
                        content={<CustomizedContent />}
                    >
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="font-medium">
                                                {data.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Value: {data.value}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </Treemap>
                )}
            </ResponsiveContainer>{" "}
        </div>
    );
};

export default HouseCountryOfGuests;
