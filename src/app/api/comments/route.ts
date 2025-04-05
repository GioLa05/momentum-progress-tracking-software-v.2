import { API_URL, API_TOKEN } from "@/config/config";

export async function POST(req: Request) {
  try {
    const { taskId, text, parentId } = await req.json();

    const res = await fetch(`${API_URL}/tasks/${taskId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        text,
        parent_id: parentId || undefined,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Backend error:", error);
      return new Response("Failed to create comment", { status: 500 });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Error creating comment:", err);
    return new Response("Invalid data", { status: 400 });
  }
}
