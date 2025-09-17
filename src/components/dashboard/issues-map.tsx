'use client';

import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Card } from '@/components/ui/card';
import { Issue } from '@/lib/types';

interface IssuesMapProps {
  issues: Issue[];
  onMarkerClick: (issue: Issue) => void;
}

export function IssuesMap({ issues, onMarkerClick }: IssuesMapProps) {
  const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

  return (
    <Card className="h-[600px] w-full overflow-hidden">
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={5}
        mapId="suvidha_map"
        gestureHandling={'greedy'}
      >
        {issues.map((issue) => {
          const [lat, lng] = issue.location.split(',').map(Number);
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <AdvancedMarker
              key={issue.id}
              position={{ lat, lng }}
              onClick={() => onMarkerClick(issue)}
            />
          );
        })}
      </Map>
    </Card>
  );
}
