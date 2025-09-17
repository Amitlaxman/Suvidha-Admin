'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Search, Table } from 'lucide-react';
import { IssuesTable } from './issues-table';
import { IssuesMap } from './issues-map';
import { IssueDetailSheet } from './issue-detail-sheet';
import { getIssues } from '@/lib/api';
import { Issue, IssueStatus } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

type SortOption = 'newest' | 'oldest' | 'severity' | 'upvotes';

export function IssuesView({ isDepartmentView = false }: { isDepartmentView?: boolean }) {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      const department = isDepartmentView ? user?.department : 'Central Admin';
      const fetchedIssues = await getIssues(department);
      setIssues(fetchedIssues);
      setLoading(false);
    };

    if (user) {
      fetchIssues();
    }
  }, [user, isDepartmentView]);

  const filteredAndSortedIssues = useMemo(() => {
    return issues
      .filter((issue) => {
        const matchesSearch =
          issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'severity':
            const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
          case 'upvotes':
            return b.upvotes - a.upvotes;
          case 'newest':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [issues, searchTerm, statusFilter, sortOption]);

  const handleIssueSelect = (issue: Issue) => {
    setSelectedIssue(issue);
  };
  
  const handleIssueUpdate = (updatedIssue: Issue) => {
    setIssues(prevIssues => prevIssues.map(i => i.id === updatedIssue.id ? updatedIssue : i));
    setSelectedIssue(updatedIssue);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, keyword, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Reported">Reported</SelectItem>
            <SelectItem value="Acknowledged">Acknowledged</SelectItem>
            <SelectItem value="In-Progress">In-Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Irrelevant">Irrelevant</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOption} onValueChange={(value) => setSortOption(value as any)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="severity">Most Severe</SelectItem>
            <SelectItem value="upvotes">Most Upvoted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="table"><Table className="mr-2"/> Table View</TabsTrigger>
          <TabsTrigger value="map"><Map className="mr-2"/> Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <IssuesTable
            issues={filteredAndSortedIssues}
            isLoading={loading}
            onRowClick={handleIssueSelect}
          />
        </TabsContent>
        <TabsContent value="map">
          <IssuesMap issues={filteredAndSortedIssues} onMarkerClick={handleIssueSelect} />
        </TabsContent>
      </Tabs>
      
      <IssueDetailSheet
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
        onIssueUpdate={handleIssueUpdate}
      />
    </div>
  );
}
