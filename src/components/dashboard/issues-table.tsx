'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Issue, IssueSeverity, IssueStatus } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface IssuesTableProps {
  issues: Issue[];
  isLoading: boolean;
  onRowClick: (issue: Issue) => void;
}

const statusColors: Record<IssueStatus, string> = {
  Submitted: 'bg-gray-500',
  Acknowledged: 'bg-blue-500',
  'In Progress': 'bg-yellow-500 text-black',
  Resolved: 'bg-green-500',
  Irrelevant: 'bg-red-500',
};

const severityColors: Record<IssueSeverity, string> = {
    Low: 'border-green-500 text-green-500',
    Medium: 'border-yellow-500 text-yellow-500',
    High: 'border-orange-500 text-orange-500',
}

export function IssuesTable({ issues, isLoading, onRowClick }: IssuesTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upvotes</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Upvotes</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.length > 0 ? (
              issues.map((issue) => (
                <TableRow key={issue.id} onClick={() => onRowClick(issue)} className="cursor-pointer">
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{issue.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={severityColors[issue.severity]}>
                        {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[issue.status]}>{issue.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{issue.upvotes}</TableCell>
                  <TableCell className="hidden lg:table-cell">{formatDate(issue.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No issues found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
