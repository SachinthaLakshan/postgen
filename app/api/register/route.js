import { NextResponse } from "next/server";
import { connectToDB } from "../../../utils/mongo";

export async function POST(req) {
  const { email, password } = await req.json();
  const client = await connectToDB();
  const db = client.db();
  const exists = await db.collection("users").findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  await db.collection("users").insertOne({ email, password });
  // Set a session cookie
  const res = NextResponse.json({ success: true }, { status: 201 });
  res.cookies.set("session", email, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
} 