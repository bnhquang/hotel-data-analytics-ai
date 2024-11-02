import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ResponsiveContainer } from "recharts";
import "./SunburstChart.css";

export default function SunburstChart() {
    const containerRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [data, setData] = useState({ name: "root", children: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/get_hierarchy_sunburst"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                console.log("sunburst", result);
                setData(result);
            } catch {}
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Only execute D3 code on the client side
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return; // Ensure D3 runs only on the client

        // // Sample data for the sunburst chart
        // const data = {
        //     name: "root",
        //     children: [
        //         {
        //             name: "Category 1",
        //             children: [
        //                 { name: "Subcategory 1", value: 100 },
        //                 { name: "Subcategory 2", value: 300 },
        //             ],
        //         },
        //         {
        //             name: "Category 2",
        //             children: [
        //                 { name: "Subcategory 3", value: 200 },
        //                 { name: "Subcategory 4", value: 400 },
        //             ],
        //         },
        //     ],
        // };

        // Set dimensions and radius
        const width = 500;
        const height = width;
        const radius = width / 8;

        const categoryColors = {
            Aviation: "#1D1310",
            Complementary: "#3F312A",
            Direct: "#564334",
            Groups: "#2C5357",
            "Offline TA/TO": "#587570",
            "Online TA": "#5A848A",
            Undefined: "#A39986",
            Corporate: "#294944",
        };

        // Clear any existing SVG when component mounts
        d3.select(containerRef.current).select("svg").remove();

        // Create the color scale
        const color = d3.scaleOrdinal(
            d3.quantize(d3.interpolateRainbow, data.children.length + 1)
        );

        // Compute the layout
        const hierarchy = d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value);
        const root = d3.partition().size([2 * Math.PI, hierarchy.height + 1])(
            hierarchy
        );
        root.each((d) => (d.current = d));

        // Create the arc generator
        const arc = d3
            .arc()
            .startAngle((d) => d.x0)
            .endAngle((d) => d.x1)
            .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius((d) => d.y0 * radius)
            .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1));

        // Create the SVG container
        const svg = d3
            .select(containerRef.current)
            .append("svg")
            .attr("viewBox", [-width / 2, -height / 2, width, width])
            .style("font", "10px sans-serif");

        // Append the arcs
        const path = svg
            .append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", (d) => {
                while (d.depth > 1) d = d.parent;
                return color(d.data.name);
            })
            .attr("fill-opacity", (d) =>
                arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0
            )
            .attr("pointer-events", (d) =>
                arcVisible(d.current) ? "auto" : "none"
            )
            .attr("d", (d) => arc(d.current));

        // Make them clickable if they have children
        path.filter((d) => d.children)
            .style("cursor", "pointer")
            .on("click", clicked);

        const format = d3.format(",d");
        path.append("title").text((d) => {
            const percentage = ((d.value / root.value) * 100).toFixed(2); // Calculate percentage
            return `${d
                .ancestors()
                .map((d) => d.data.name)
                .reverse()
                .join("/")}\n${percentage}%`; // Display percentage
        });
        const label = svg
            .append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", (d) => +labelVisible(d.current))
            .attr("transform", (d) => labelTransform(d.current))
            .text((d) => d.data.name);

        const parent = svg
            .append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked);

        // Zoom on click
        function clicked(event, p) {
            parent.datum(p.parent || root);

            root.each(
                (d) =>
                    (d.target = {
                        x0:
                            Math.max(
                                0,
                                Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))
                            ) *
                            2 *
                            Math.PI,
                        x1:
                            Math.max(
                                0,
                                Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))
                            ) *
                            2 *
                            Math.PI,
                        y0: Math.max(0, d.y0 - p.depth),
                        y1: Math.max(0, d.y1 - p.depth),
                    })
            );

            const t = svg.transition().duration(750);

            path.transition(t)
                .tween("data", (d) => {
                    const i = d3.interpolate(d.current, d.target);
                    return (t) => (d.current = i(t));
                })
                .attr("fill-opacity", (d) =>
                    arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0
                )
                .attr("pointer-events", (d) =>
                    arcVisible(d.target) ? "auto" : "none"
                )
                .attrTween("d", (d) => () => arc(d.current));

            label
                .transition(t)
                .attr("fill-opacity", (d) => +labelVisible(d.target))
                .attrTween("transform", (d) => () => labelTransform(d.current));
        }

        function arcVisible(d) {
            return d.y1 <= radius && d.y0 >= 0;
        }

        function labelVisible(d) {
            return (
                d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
            );
        }

        function labelTransform(d) {
            const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
            const y = ((d.y0 + d.y1) / 2) * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${
                x < 180 ? 0 : 180
            })`;
        }
    }, [isClient, data]);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <div
                    ref={containerRef}
                    style={{ width: "100%", height: "100%" }}
                ></div>
            </ResponsiveContainer>
        </div>
    );
}
