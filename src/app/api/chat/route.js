import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are "Pikachu Receptionist", a helpful, friendly, cute, and energetic 8-bit pixel art guide helper for the website "PartyUp!".
Your personality is loyal, enthusiastic, and uses gaming metaphors (like "Adventurer", "Guild", "Quest", "Loot", "Party", "Pika pika!").

YOUR KNOWLEDGE BASE:
1. About PartyUp!:
   - It is a dynamic student teammate finder and micro-networking platform for IT students.
   - Designed for the "INVENTION 2026 Web Design Competition" under the theme "Building Smarter Communities Through Digital Learning."
   - Helps students collaborate on real projects (like GEMASTIK, INVENTION, or College Assignments).

2. The 10 Software Engineering Roles:
   - Management: Product Manager (PM), Project / Scrum Master.
   - Design: UI/UX Designer, UX Researcher.
   - Engineering: Frontend Developer, Backend Developer, Full-stack Developer, Mobile App Developer.
   - Quality/Infrastructure: QA (Quality Assurance) Engineer, DevOps Engineer.

3. Website Navigation:
   - QUEST BOARD (/board): Dispatch new teammate requests or filter active quests.
   - SHOWCASE (/showcase): Display past finished projects as "Historical Archives".
   - TIMELINE (/following): Real-time community status updates.
   - GUIDE (/guide): Official Adventurer's Codex booklet (FAQ).
   - ADMIN CONTROL (/admin): Dashboard for Grandmaster Admin (USR-000) to moderate users (Ban/Unban).
`;

export async function POST(request) {
    // Deklarasikan fallbackReply di luar try block agar bisa dibaca oleh catch block
    let fallbackReply = "Pika pika! ⚡ Adventure awaits! Try asking about 'quest', 'class', 'admin', or 'gemastik'.";

    try {
        const { messages } = await request.json();
        const lastUserMsg = (messages[messages.length - 1]?.content || "").toLowerCase();

        if (lastUserMsg.includes("class") || lastUserMsg.includes("role") || lastUserMsg.includes("kelas") || lastUserMsg.includes("explain")) {
            fallbackReply = "The 10 IT Guild Classes are: 1. Product Manager, 2. Scrum Master, 3. UI/UX Designer, 4. UX Researcher, 5. Frontend Dev, 6. Backend Dev, 7. Full-stack Dev, 8. Mobile App Dev, 9. QA Engineer, and 10. DevOps Engineer!";
        } else if (lastUserMsg.includes("ai") || lastUserMsg.includes("proyek") || lastUserMsg.includes("project")) {
            fallbackReply = "Looking for an AI or Software project? Check out active missions like 'EcoSphere' or 'MediLink' on the [QUEST BOARD] tab or dispatch your own quest!";
        } else if (lastUserMsg.includes("quest") || lastUserMsg.includes("board") || lastUserMsg.includes("misi") || lastUserMsg.includes("party") || lastUserMsg.includes("join")) {
            fallbackReply = "Check out the [QUEST BOARD] tab above to inspect dispatched guild missions, filter by competition, and join active parties!";
        } else if (lastUserMsg.includes("gemastik") || lastUserMsg.includes("invention") || lastUserMsg.includes("2026")) {
            fallbackReply = "GEMASTIK & INVENTION 2026 are premier nationwide IT competitions! Form your 3-member student parties on the Quest Board now.";
        } else if (lastUserMsg.includes("admin") || lastUserMsg.includes("dashboard")) {
            fallbackReply = "Log in as 'Admin' on the Guild Gatekeeper screen to unlock the Master System Admin Panel!";
        }

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({ text: fallbackReply });
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
                temperature: 0.1,
                max_tokens: 180,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return NextResponse.json({ text: fallbackReply });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || fallbackReply;

        return NextResponse.json({ text: reply });
    } catch (error) {
        console.log("Groq API fallback active.");
        return NextResponse.json({ text: fallbackReply });
    }
}