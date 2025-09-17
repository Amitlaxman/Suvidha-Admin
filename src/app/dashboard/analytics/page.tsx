'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BarChart, Donut, ListChecks } from 'lucide-react';
import { AnalyticsCharts } from '@/components/analytics/charts';
import { mockIssues } from '@/lib/mock-data';
import { Issue, Department } from '@/lib/types';

const calculateAnalytics = (issues: Issue[]) => {
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;
  const inProgressIssues = issues.filter(i => i.status === 'In-Progress').length;
  const resolutionRate = totalIssues > 0 ? (resolvedIssues / totalIssues) * 100 : 0;

  const issuesByCategory = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const issuesBySeverity = issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalIssues,
    resolvedIssues,
    inProgressIssues,
    resolutionRate,
    issuesByCategory: Object.entries(issuesByCategory).map(([name, value]) => ({ name, value })),
    issuesBySeverity: Object.entries(issuesBySeverity).map(([name, value]) => ({ name, value })),
  };
};

export default function AnalyticsPage() {
  const { user } = useAuth();

  if (user?.department !== 'Central Admin') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-card p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h2 className="font-headline text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">
          You do not have permission to view the analytics page.
        </p>
      </div>
    );
  }

  const analytics = calculateAnalytics(mockIssues);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalIssues}</div>
            <p className="text-xs text-muted-foreground">All reported issues</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.resolvedIssues}</div>
            <p className="text-xs text-muted-foreground">{analytics.resolutionRate.toFixed(1)}% resolution rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues by Category</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.issuesByCategory.length}</div>
            <p className="text-xs text-muted-foreground">Active issue categories</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues by Severity</CardTitle>
            <Donut className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.issuesBySeverity.length}</div>
            <p className="text-xs text-muted-foreground">Active severity levels</p>
          </CardContent>
        </Card>
      </div>
      <AnalyticsCharts data={analytics} />
    </div>
  );
}
