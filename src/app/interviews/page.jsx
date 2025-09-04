import { Interviews } from "@/components/pages/Interviews";
import { Suspense } from "react";

export default async function InterviewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Interviews />
    </Suspense>
  );
}
