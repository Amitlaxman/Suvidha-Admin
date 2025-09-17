'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Issue,
  IssueStatus,
  IssueSeverity,
  Department,
  Departments,
} from '@/lib/types';
import { formatDate } from '@/lib/utils';
import {
  updateIssueStatus,
  reassignIssueDepartment,
} from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import {
  Calendar,
  ChevronRight,
  MapPin,
  MessageSquare,
  RefreshCw,
  Tag,
  ThumbsUp,
  User,
  Zap,
} from 'lucide-react';
import { summarizeIssueUpdates } from '@/ai/flows/summarize-issue-updates';

interface IssueDetailSheetProps {
  issue: Issue | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onIssueUpdate: (issue: Issue) => void;
}

const statusColors: Record<IssueStatus, string> = {
  Reported: 'bg-gray-500',
  Acknowledged: 'bg-blue-500',
  'In-Progress': 'bg-yellow-500 text-black',
  Resolved: 'bg-green-500',
  Irrelevant: 'bg-red-500',
};

const severityColors: Record<IssueSeverity, string> = {
  Low: 'border-green-500 text-green-500',
  Medium: 'border-yellow-500 text-yellow-500',
  High: 'border-orange-500 text-orange-500',
  Critical: 'border-red-500 text-red-500',
};

export function IssueDetailSheet({
  issue,
  isOpen,
  onOpenChange,
  onIssueUpdate,
}: IssueDetailSheetProps) {
  const { user } = useAuth();
  const [newStatus, setNewStatus] = useState<IssueStatus | ''>('');
  const [newDepartment, setNewDepartment] = useState<Department | ''>('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleStatusUpdate = async () => {
    if (!issue || !newStatus || !updateDescription) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a new status and provide a description.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const updatedIssue = await updateIssueStatus(
        issue.id,
        newStatus,
        updateDescription
      );
      onIssueUpdate(updatedIssue);
      toast({ title: 'Success', description: 'Issue status updated.' });
      setNewStatus('');
      setUpdateDescription('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update the issue status.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReassign = async () => {
    if (!issue || !newDepartment) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a department to reassign to.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const updatedIssue = await reassignIssueDepartment(
        issue.id,
        newDepartment
      );
      onIssueUpdate(updatedIssue);
      toast({
        title: 'Success',
        description: `Issue reassigned to ${newDepartment}.`,
      });
      setNewDepartment('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Reassign Failed',
        description: 'Could not reassign the issue.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!issue || issue.updates.length === 0) return;
    setIsSummaryLoading(true);
    try {
      const result = await summarizeIssueUpdates({ updates: issue.updates });
      setSummary(result.summary);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: 'Could not generate AI summary.',
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };
  
  if (!issue) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <ScrollArea className="h-full pr-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-headline text-2xl">{issue.title}</SheetTitle>
            <SheetDescription>
              Issue ID: {issue.id}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Category:</span> {issue.category}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Severity:</span>
                <Badge variant="outline" className={severityColors[issue.severity]}>{issue.severity}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Status:</span>
                <Badge className={statusColors[issue.status]}>{issue.status}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Reporter:</span>
                {issue.isAnonymous ? 'Anonymous' : issue.author}
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Upvotes:</span> {issue.upvotes}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Reported:</span>
                {formatDate(issue.createdAt)}
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    Description
                </h3>
                <p className="text-muted-foreground">{issue.description}</p>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Location
                </h3>
                <p className="text-muted-foreground">{issue.location}</p>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src={issue.imageUrl}
                alt={issue.title}
                fill
                className="object-cover"
                data-ai-hint="urban problem"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center justify-between">
                  Updates Timeline
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSummarize}
                    disabled={isSummaryLoading}
                  >
                    {isSummaryLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    ) : (
                      <Zap className="mr-2 h-4 w-4" />
                    )}
                    AI Summary
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSummaryLoading && <p className="text-sm text-muted-foreground">Generating summary...</p>}
                {summary && (
                  <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                    <p className="font-bold">Summary:</p>
                    <p>{summary}</p>
                  </div>
                )}
                <ul className="space-y-4">
                  {issue.updates.slice().reverse().map((update, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                        {index < issue.updates.length - 1 && (
                          <div className="w-px flex-1 bg-border"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">
                          Status changed to{' '}
                          <Badge className={statusColors[update.status]}>
                            {update.status}
                          </Badge>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(update.date)}
                        </p>
                        <p className="mt-1 text-sm">{update.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Update Status</h4>
                  <Select value={newStatus} onValueChange={(val) => setNewStatus(val as IssueStatus)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="In-Progress">In-Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Irrelevant">Irrelevant</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Add an update description for the reporter..."
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  />
                  <Button
                    onClick={handleStatusUpdate}
                    disabled={isLoading || !newStatus || !updateDescription}
                  >
                    {isLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>}
                    Submit Update
                  </Button>
                </div>
                {user?.department === 'Central Admin' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-semibold">Reassign Department</h4>
                      <Select value={newDepartment} onValueChange={(val) => setNewDepartment(val as Department)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                          {Departments.filter(d => d !== 'Central Admin').map(dep => (
                            <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleReassign}
                        disabled={isLoading || !newDepartment}
                        variant="secondary"
                      >
                         {isLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>}
                        Reassign
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
