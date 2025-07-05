import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">DIU Data Science Lab</h1>
      <Card>
        <CardContent className="p-4">
          <p>Explore our latest research, members, and projects.</p>
        </CardContent>
      </Card>
    </main>
  );
}
