import { notFound } from "next/navigation";
import RouteStateCard from "@/components/RouteStateCard";

const states = {
  empty: {
    icon: "📂",
    title: "Nothing here yet",
    description: "Your workspace is ready for its first item.",
    body: "This state gives the next step enough space without inventing content.",
  },
  error: {
    icon: "⚠️",
    title: "Something went wrong",
    description: "We could not load this item.",
    body: "Your work is still saved. Return to the previous screen and try again.",
  },
};

export default async function RouteStateFixture({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { state = "empty" } = await searchParams;
  if (state !== "empty" && state !== "error") notFound();

  return (
    <main>
      <RouteStateCard {...states[state]} href="/internal/style-guide" ctaLabel="Back to style guide" />
    </main>
  );
}
