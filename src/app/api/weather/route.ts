import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const apiKey = process.env.API_KEY;
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return NextResponse.json({ data: data });
}
