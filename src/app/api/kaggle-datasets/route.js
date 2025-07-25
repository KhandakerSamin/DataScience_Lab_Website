import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "hottest";
  const pageSize = 20; // Kaggle API max pageSize is 20
  const totalDatasets = parseInt(searchParams.get("totalDatasets")) || 100; // Desired total datasets

  try {
    const username = process.env.KAGGLE_USERNAME;
    const key = process.env.KAGGLE_KEY;

    if (!username || !key) {
      console.log("Kaggle credentials not found");
      throw new Error("Kaggle credentials not configured");
    }

    const credentials = Buffer.from(`${username}:${key}`).toString("base64");
    let allDatasets = [];
    let currentPage = 1;
    const maxPageSize = 20; // Kaggle API limit

    // Calculate how many pages are needed
    const pagesNeeded = Math.ceil(totalDatasets / maxPageSize);

    console.log(`Fetching up to ${totalDatasets} datasets across ${pagesNeeded} pages`);

    // Loop through pages to fetch datasets
    while (currentPage <= pagesNeeded && allDatasets.length < totalDatasets) {
      const kaggleUrl = new URL("https://www.kaggle.com/api/v1/datasets/list");
      if (search) kaggleUrl.searchParams.set("search", search);
      kaggleUrl.searchParams.set("sortBy", sortBy);
      kaggleUrl.searchParams.set("page", currentPage.toString());
      kaggleUrl.searchParams.set("pageSize", maxPageSize.toString());

      console.log(`Fetching page ${currentPage}: ${kaggleUrl.toString()}`);

      const response = await fetch(kaggleUrl.toString(), {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
          "User-Agent": "Kaggle-API-Client",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Kaggle API error on page ${currentPage}: ${response.status} - ${errorText}`);
        throw new Error(`Kaggle API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Received ${data.length} datasets on page ${currentPage}`);

      // Break if no more data is returned
      if (data.length === 0) {
        console.log("No more datasets to fetch");
        break;
      }

      // Transform the datasets
      const transformedData = data.map((dataset, index) => {
        const ref = dataset.ref || `dataset-${index}`;
        const ownerName = dataset.ownerName || "Unknown";
        const datasetName = dataset.datasetName || dataset.title || `Dataset ${index + 1}`;
        const tags = extractTags(dataset.tags);

        return {
          id: ref.replace(/[^a-zA-Z0-9-]/g, "-") || `kaggle-${index}`,
          title: dataset.title || datasetName,
          description: dataset.subtitle || dataset.description || "No description available",
          author: ownerName,
          category: getCategoryFromTags(tags),
          size: formatFileSize(dataset.totalBytes || 0),
          downloads: dataset.downloadCount || 0,
          likes: dataset.voteCount || dataset.usabilityRating || 0,
          updatedDays: calculateDaysAgo(dataset.lastUpdated),
          image: getDatasetImage(dataset, ref, tags),
          featured: dataset.medal === "gold" || dataset.isFeatured || false,
          kaggleUrl: `https://www.kaggle.com/datasets/${ref}`,
          isKaggle: true,
          fileTypes: dataset.fileTypes || [],
          license: dataset.licenseName || "Unknown",
          collaborators: dataset.collaboratorCount || 0,
          topics: tags,
        };
      });

      allDatasets = [...allDatasets, ...transformedData];
      currentPage++;

      // Optional: Add delay to respect Kaggle API rate limits (20 requests/minute)
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
    }

    // Trim to the requested number of datasets
    allDatasets = allDatasets.slice(0, totalDatasets);
    console.log(`Total datasets fetched and transformed: ${allDatasets.length}`);
    return NextResponse.json(allDatasets);
  } catch (error) {
    console.error("Error fetching Kaggle datasets:", error);
    return NextResponse.json([], {
      status: 500,
      headers: { "X-Error": error.message },
    });
  }
}

// Helper functions
function extractTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map(tag => {
      if (typeof tag === "string") return tag;
      if (tag && typeof tag === "object" && typeof tag.name === "string") return tag.name;
      return null;
    })
    .filter(Boolean);
}

function getCategoryFromTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "General";
  const categoryMap = {
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "computer vision": "Computer Vision",
    nlp: "NLP",
    "natural language processing": "NLP",
    classification: "Classification",
    healthcare: "Healthcare",
    medicine: "Healthcare",
    finance: "Finance",
    business: "Finance",
    transportation: "Transportation",
    education: "Education",
    statistics: "Statistics",
    "data visualization": "Data Visualization",
    visualization: "Data Visualization",
    "computer science": "Computer Science",
    programming: "Computer Science",
    entertainment: "Entertainment",
    games: "Entertainment",
    sports: "Entertainment",
    social: "Social Science",
    economics: "Finance",
    government: "Government",
    environment: "Environment",
    climate: "Environment",
    energy: "Environment",
  };
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase();
    if (categoryMap[lowerTag]) {
      return categoryMap[lowerTag];
    }
  }
  return tags[0] || "General";
}

function getDatasetImage(dataset, ref, tags) {
  if (dataset.thumbnailImageUrl) {
    return dataset.thumbnailImageUrl;
  }
  const title = (dataset.title || dataset.datasetName || "Dataset").substring(0, 30);
  const category = getCategoryFromTags(tags || []);
  return `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`;
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "Unknown";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function calculateDaysAgo(dateString) {
  if (!dateString) return 0;
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch {
    return 0;
  }
}