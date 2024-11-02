import React from "react";
import Plot from "react-plotly.js";
import { ResponsiveContainer } from "recharts";

const data = [
    { marketSegment: "Direct", adr: [100, 120, 130, 140, 150, 160, 170] },
    { marketSegment: "Corporate", adr: [80, 90, 100, 110, 120, 130, 140] },
    { marketSegment: "Online TA", adr: [120, 130, 140, 150, 160, 170, 180] },
    { marketSegment: "Offline TA/TO", adr: [90, 100, 110, 120, 130, 140, 150] },
    { marketSegment: "Complementary", adr: [20, 30, 40, 50, 60, 70, 80] },
    { marketSegment: "Groups", adr: [50, 60, 70, 80, 90, 100, 110] },
    { marketSegment: "Undefined", adr: [10, 15, 20, 25, 30, 35, 40] },
    { marketSegment: "Aviation", adr: [80, 85, 90, 95, 100, 105, 110] },
];

// Process data for Plotly box plot
const boxPlotData = data.map((segment) => ({
    type: "box",
    y: segment.adr,
    name: segment.marketSegment,
    boxpoints: "outliers", // Show outliers
    marker: { color: "blue" },
}));

export default function DistributionOfAdr() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <Plot
                data={boxPlotData}
                layout={{
                    title: "Distribution of ADR by Market Segment",
                    xaxis: { title: "Market Segment" },
                    yaxis: {
                        title: "ADR (Average Daily Rate)",
                        range: [0, 500],
                    },
                    margin: { t: 50, b: 100 },
                }}
                config={{ responsive: true }}
                style={{ width: "100%", height: "100%" }}
            />
        </ResponsiveContainer>
    );
}
