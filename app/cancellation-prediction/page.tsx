"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CancellationPrediction() {
    const [fields, setFields] = useState("");
    const [prediction, setPrediction] = useState(null); // State for storing the prediction result
    const [loading, setLoading] = useState(false); // Loading state for the API call

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true); // Set loading to true before the API call
        setPrediction(null); // Clear any previous prediction

        // Send fields to the API as a comma-separated string
        try {
            const response = await fetch(
                "http://localhost:8000/predict_cancellation",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ fields: fields }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            setPrediction(data.prediction); // Assuming the API response has a key "prediction"
        } catch (error) {
            console.error("Error fetching prediction:", error);
            setPrediction("An error occurred while fetching the prediction.");
        } finally {
            setLoading(false); // Stop loading after the API call
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Input Fields</CardTitle>
                    <CardDescription>
                        Paste the fields separated by a comma
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Textarea
                            placeholder="hotel, lead_time, arrival_date_year, ..."
                            value={fields}
                            onChange={(e) => setFields(e.target.value)}
                            className="min-h-[200px]"
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                    </CardFooter>
                </form>
                {prediction && (
                    <CardContent className="mt-4">
                        <CardTitle>Prediction Result</CardTitle>
                        <CardDescription>
                            {typeof prediction === "string"
                                ? prediction
                                : `The cancellation probability is ${(
                                      prediction * 100
                                  ).toFixed(2)}%`}
                        </CardDescription>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
