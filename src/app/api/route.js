// app/routes/hello.js (or any other desired location)
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const name = req.nextUrl.searchParams.get("name") || "World";
  
    return NextResponse.json({ message: `Hello, ${name}!` });
}
  