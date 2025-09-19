'use client';

import { Card } from '@/components/ui/card';
import { Issue } from '@/lib/types';
import { MapPinOff } from 'lucide-react';

interface IssuesMapProps {
  issues: Issue[];
  onMarkerClick: (issue: Issue) => void;
}

export function IssuesMap({ issues, onMarkerClick }: IssuesMapProps) {
  return (
    <Card className="h-[600px] w-full overflow-hidden flex flex-col items-center justify-center bg-muted/50">
      <MapPinOff className="h-16 w-16 text-muted-foreground" />
      <h2 className="mt-4 font-headline text-xl font-semibold">Map Unavailable</h2>
      <p className="text-muted-foreground">Google Maps API key is not configured.</p>
    </Card>
  );
}
