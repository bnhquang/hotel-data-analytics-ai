import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const BoxPlotDistributionOfADR = () => {
    // Reference to the chart container
    const chartRef = useRef(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_FAST_API_URL}/dist_of_adr_by_market_segment`
                );
                console.log(
                    "calling",
                    `${process.env.NEXT_PUBLIC_FAST_API_URL}/dist_of_adr_by_market_segment`
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

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        if (!chartRef.current) return;

        // Extract adr arrays from the fetched data
        const adrData = data.map((item) => item.adr);
        const labels = data.map((item) => item.marketSegment);
        console.log(adrData);
        console.log(labels);

        // Initialize chart
        const myChart = echarts.init(chartRef.current);

        // Define the chart option
        const option = {
            title: [
                {
                    // text: "Michelson-Morley Experiment",
                    left: "center",
                },
                // {
                //     text: "upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR",
                //     borderColor: "#999",
                //     borderWidth: 1,
                //     textStyle: {
                //         fontWeight: "normal",
                //         fontSize: 14,
                //         lineHeight: 20,
                //     },
                //     left: "10%",
                //     top: "90%",
                // },
            ],
            dataset: [
                {
                    source: adrData,
                },
                {
                    transform: {
                        type: "boxplot",
                        config: {
                            itemNameFormatter: function (params) {
                                return labels[Number(params.value)];
                            },
                        },
                    },
                },
                {
                    fromDatasetIndex: 1,
                    fromTransformResult: 1,
                },
            ],
            tooltip: {
                trigger: "item",
                axisPointer: {
                    type: "shadow",
                },
                formatter: function (params) {
                    const stats = params.data;
                    return `
                        <div><strong>${labels[params.dataIndex]}</strong></div>
                        <div>Lower Fence: ${stats[1]}</div>
                        <div>Q1 (25th percentile): ${stats[2]}</div>
                        <div>Median (Q2): ${stats[3]}</div>
                        <div>Q3 (75th percentile): ${stats[4]}</div>
                        <div>Upper Fence: ${stats[5]}</div>
                    `;
                },
            },
            grid: {
                left: "10%",
                right: "10%",
                bottom: "15%",
            },
            xAxis: {
                type: "category",
                boundaryGap: true,
                nameGap: 30,
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: {
                type: "value",
                name: "ADR Value",
                splitArea: {
                    show: true,
                },
            },
            series: [
                {
                    name: "boxplot",
                    type: "boxplot",
                    datasetIndex: 1,
                },
                {
                    name: "outlier",
                    type: "scatter",
                    datasetIndex: 2,
                },
            ],
        };

        // Set the option on the chart instance
        myChart.setOption(option);

        // Cleanup function to dispose of the chart instance when the component unmounts
        return () => {
            myChart.dispose();
        };
    }, [data]);

    return <div ref={chartRef} style={{ height: "400px", width: "100%" }} />;
};

export default BoxPlotDistributionOfADR;
