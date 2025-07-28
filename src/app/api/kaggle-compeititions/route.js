import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "datasets"

  try {
    const username = process.env.KAGGLE_USERNAME
    const key = process.env.KAGGLE_KEY

    if (!username || !key) {
      return NextResponse.json({ error: "Missing Kaggle credentials" }, { status: 500 })
    }

    const auth = Buffer.from(`${username}:${key}`).toString("base64")

    // Choose endpoint based on type parameter
    const endpoint =
      type === "competitions"
        ? "https://www.kaggle.com/api/v1/competitions/list"
        : "https://www.kaggle.com/api/v1/datasets/list?sortBy=hottest"

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Kaggle API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()

    if (type === "competitions") {
      // Transform competitions
      const transformed = data.map((comp, index) => ({
        id: comp.id || comp.ref || `comp-${index}`,
        title: comp.title || "Untitled Competition",
        description: comp.description || comp.subtitle || "No description available",
        organizationName: comp.organizationName || "Kaggle",
        category: comp.category || "General",
        reward: comp.reward || comp.totalPrize || "Knowledge",
        totalTeams: comp.totalTeams || 0,
        deadline: comp.deadline,
        url: `https://www.kaggle.com/c/${comp.ref || comp.id}`,
      }))
      return NextResponse.json(transformed)
    } else {
      // Return datasets as-is (your existing logic)
      return NextResponse.json(data)
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 })
  }
}
