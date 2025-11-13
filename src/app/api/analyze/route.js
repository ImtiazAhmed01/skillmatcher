// src/app/api/analyze/route.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text || !text.trim())
            return new Response(JSON.stringify({ error: "Text is required" }), { status: 400 });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You extract key skills from resumes and suggest matching roles with a learning path. Always return strict JSON with 'skills', 'roles', and 'learning'.",
                },
                { role: "user", content: text },
            ],
            temperature: 0.2,
        });

        const raw = completion.choices[0].message.content;
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { skills: [], roles: [], learning: [] };

        return Response.json(parsed);
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "AI service error" }), { status: 500 });
    }
}
