// app/(main)/contest&dataset/layout.js
export const metadata = {
  title: "DIU | Data Science Lab - Contests & Datasets",
  description: "Contests and Datasets for the Data Science Lab of DIU",
};

export default function ContestDatasetLayout({ children }) {
  return <main className="min-h-screen w-fit">{children}</main>;
}