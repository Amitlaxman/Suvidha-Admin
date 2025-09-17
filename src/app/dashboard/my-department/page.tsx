import { IssuesView } from "@/components/dashboard/issues-view";
import { Suspense } from "react";

export default function MyDepartmentPage() {
  return (
    <div className="h-full w-full">
        <h1 className="text-3xl font-headline font-bold tracking-tight mb-6">
            My Department's Issues
        </h1>
        <Suspense fallback={<div>Loading issues...</div>}>
            <IssuesView isDepartmentView={true} />
        </Suspense>
    </div>
  );
}
