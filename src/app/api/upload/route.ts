// src/app/api/upload/route.ts (Optional)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return new NextResponse("ფაილის ზომა არ უნდა აღემატებოდეს 2MB-ს", { status: 413 });
    }

    console.log("Uploading file:", file.name, file.size, file.type);

    const uploadRes = await fetch("https://momentum.redberryinternship.ge/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer 9e8fd40a-1bc6-42ab-9deb-26ff41262121`,
      },
      body: formData,
    });

    const responseText = await uploadRes.text();
    console.log("API Response:", uploadRes.status, responseText);

    if (!uploadRes.ok) {
      return new NextResponse(responseText, { status: uploadRes.status });
    }

    const result = JSON.parse(responseText);
    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Upload Proxy Error:", err);
    return new NextResponse("Upload proxy failed", { status: 500 });
  }
}