import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    try {
        const { messages } = await req.json(); // Use req.json() to parse the body

        // Map 'sender' to 'role' and prepare messages for the AI model
        const mappedMessages = messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content,
        }));

        const chatCompletion = await groq.chat.completions.create({
            messages: mappedMessages,
            model: "llama-3.1-70b-versatile",
        });

        const responseMessage =
            chatCompletion.choices[0]?.message?.content || "No response";

        // Return the response with appropriate status and headers
        return new Response(JSON.stringify({ response: responseMessage }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in POST /api/groq:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
