import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      hasKaggleUsername: !!process.env.KAGGLE_USERNAME,
      hasKaggleKey: !!process.env.KAGGLE_KEY,
    },
  })
}
