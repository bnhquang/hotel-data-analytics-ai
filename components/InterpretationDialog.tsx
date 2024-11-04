"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

type Message = {
    content: string;
    sender: "user" | "ai";
};

type InterpretationDialogProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    content: string;
    title: string;
    endPoint: string;
    chartTitle: string;
};

const ChatMessage = ({ message }: { message: Message }) => (
    <div
        className={`p-2 my-2 rounded-md ${
            message.sender === "user"
                ? "bg-muted text-right"
                : "bg-primary text-primary-foreground"
        }`}
    >
        {message.content}
    </div>
);

function InterpretationDialog({
    isOpen,
    onOpenChange,
    content,
    title,
    endPoint,
    chartTitle,
}: InterpretationDialogProps) {
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(endPoint);
                const response = await fetch(
                    `http://localhost:8000${endPoint}`
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

    const handleGetRecommendation = async () => {
        const dataString = Array.isArray(data)
            ? data.map((item) => JSON.stringify(item)).join(", ")
            : JSON.stringify(data);

        // Constructing a prompt dynamically from totalResults
        let constructedMessage = `This is the customer data from the chart ${chartTitle}:\n ${dataString}`;

        // Appending the request for assessment
        constructedMessage +=
            "\nGive me some interpretation in this data, opening the message with this: \nBased on the data, here's my assessment:";

        console.log(constructedMessage);

        const initialUserMessage = {
            content: constructedMessage,
            sender: "user" as const,
        };
        setChatMessages([initialUserMessage]);

        try {
            // Sending request to the backend API to get AI recommendation
            const response = await fetch("/api/groq", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [initialUserMessage],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch AI response");
            }

            // Get the AI response
            const data = await response.json();
            const aiResponse = {
                content: data.response,
                sender: "ai" as const,
            };
            console.log(aiResponse);

            setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
            setShowRecommendation(true);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage = {
                content: "An error occurred while fetching the response.",
                sender: "ai" as const,
            };
            setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const userMessage = {
                content: inputMessage,
                sender: "user" as const,
            };
            const updatedChatMessages = [...chatMessages, userMessage];
            setChatMessages(updatedChatMessages);
            setInputMessage("");

            try {
                const response = await fetch("/api/groq", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        messages: updatedChatMessages,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch AI response");
                }

                // Get the AI response
                const data = await response.json();
                const aiResponse = {
                    content: data.response,
                    sender: "ai" as const,
                };

                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    aiResponse,
                ]);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                const errorMessage = {
                    content: "An error occurred while fetching the response.",
                    sender: "ai" as const,
                };
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    errorMessage,
                ]);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default">Interpretation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div
                    className="grid gap-4 py-4"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                {chartTitle !== "Distribution of ADR by Market Segment" && (
                    <Card className="h-[50vh]">
                        <CardHeader>
                            <CardTitle>
                                AI Further Interpretation & Chat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col h-[calc(100%-80px)]">
                            {!showRecommendation ? (
                                <Button
                                    onClick={handleGetRecommendation}
                                    className="mb-4"
                                >
                                    Get AI Recommendation
                                </Button>
                            ) : (
                                <>
                                    <ScrollArea className="flex-grow mb-4">
                                        {chatMessages
                                            .slice(1)
                                            .map((message, index) => (
                                                <ChatMessage
                                                    key={index}
                                                    message={message}
                                                />
                                            ))}
                                    </ScrollArea>
                                    <div className="flex space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Type your message..."
                                            value={inputMessage}
                                            onChange={(e) =>
                                                setInputMessage(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                handleSendMessage()
                                            }
                                        />
                                        <Button onClick={handleSendMessage}>
                                            Send
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default InterpretationDialog;
