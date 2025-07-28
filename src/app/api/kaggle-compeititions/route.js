import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "datasets"

  try {
    console.log(`=== KAGGLE ${type.toUpperCase()} API START ===`)

    const username = process.env.KAGGLE_USERNAME
    const key = process.env.KAGGLE_KEY

    if (!username || !key) {
      console.log("❌ Missing Kaggle credentials")
      return NextResponse.json({ error: "Missing Kaggle credentials" }, { status: 500 })
    }

    const auth = Buffer.from(`${username}:${key}`).toString("base64")

    if (type === "competitions") {
      console.log("🏆 Fetching competitions from Kaggle API...")

      const response = await fetch("https://www.kaggle.com/api/v1/competitions/list", {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          "User-Agent": "DataScienceLab/1.0",
        },
      })

      console.log("Competitions API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Competitions API Error:", errorText)
        return NextResponse.json(
          { error: `Kaggle API error: ${response.status}`, details: errorText },
          { status: response.status },
        )
      }

      const competitions = await response.json()
      console.log(`✅ Fetched ${competitions.length} competitions from Kaggle`)

      // Transform competitions data
      const transformed = competitions.map((comp, index) => ({
        id: comp.id || comp.ref || `comp-${index}`,
        title: comp.title || "Untitled Competition",
        description: comp.description || comp.subtitle || "No description available",
        organizationName: comp.organizationName || comp.hostSegmentTitle || "Kaggle",
        category: comp.category || comp.competitionTypeDescription || "General",
        reward: comp.reward || comp.totalPrize || "Knowledge",
        totalTeams: comp.totalTeams || 0,
        totalSubmissions: comp.totalSubmissions || 0,
        deadline: comp.deadline || comp.submissionDeadline,
        url: `https://www.kaggle.com/c/${comp.ref || comp.id}`,
        tags: comp.tags || [],
        status: comp.enabledDate ? "active" : "upcoming",
        maxTeamSize: comp.maxTeamSize || 1,
        evaluationMetric: comp.evaluationMetric || "Unknown",
        isKernelsOnly: comp.isKernelsOnly || false,
        submissionsDisabled: comp.submissionsDisabled || false,
      }))

      console.log(`✅ Transformed ${transformed.length} competitions`)
      return NextResponse.json(transformed)
    } else {
      // Your existing datasets logic
      console.log("📊 Fetching datasets from Kaggle API...")

      let allDatasets = []
      const maxPages = 5
      const pageSize = 20

      for (let page = 1; page <= maxPages; page++) {
        console.log(
          `Fetching page ${page}: https://www.kaggle.com/api/v1/datasets/list?sortBy=hottest&page=${page}&pageSize=${pageSize}`,
        )

        const response = await fetch(
          `https://www.kaggle.com/api/v1/datasets/list?sortBy=hottest&page=${page}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Basic ${auth}`,
              "Content-Type": "application/json",
            },
          },
        )

        if (!response.ok) {
          console.error(`Error fetching page ${page}:`, response.status, response.statusText)
          break
        }

        const pageData = await response.json()
        console.log(`Received ${pageData.length} datasets on page ${page}`)

        if (pageData.length === 0) {
          console.log(`No more data on page ${page}, stopping`)
          break
        }

        allDatasets = [...allDatasets, ...pageData]
      }

      console.log(`Total datasets fetched and transformed: ${allDatasets.length}`)
      return NextResponse.json(allDatasets)
    }
  } catch (error) {
    console.error(`❌ Error in kaggle-datasets API (${type}):`, error)
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 })
  }
}
