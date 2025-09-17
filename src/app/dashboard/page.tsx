import { IssuesView } from "@/components/dashboard/issues-view";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="h-full w-full">
        <h1 className="text-3xl font-headline font-bold tracking-tight mb-6">
            Issues Overview
        </h1>
        <Suspense fallback={<div>Loading issues...</div>}>
          <IssuesView />
        </Suspense>
    </div>
  );
}
