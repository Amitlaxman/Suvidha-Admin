import { Issue } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockIssues: Issue[] = [
  {
    id: 'IS001',
    title: 'Major Pothole on Main St',
    description: 'A large and dangerous pothole has formed in the middle of Main St, near the city square. It has already caused a flat tire.',
    category: 'Pothole',
    severity: 'Critical',
    location: '28.6139,77.2090', // Delhi
    author: 'Amit Kumar',
    authorId: 'user1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Acknowledged',
    upvotes: 42,
    isAnonymous: false,
    imageUrl: 'https://picsum.photos/seed/pothole1/800/600',
    updates: [
      {
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Issue reported by citizen.',
        status: 'Reported',
      },
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Acknowledged by Roads Department. Team assigned for inspection.',
        status: 'Acknowledged',
      },
    ],
  },
  {
    id: 'IS002',
    title: 'Street Light Outage on 5th Ave',
    description: 'The entire block of 5th Avenue is dark. All street lights are out. It is a safety concern for residents at night.',
    category: 'Street Light Outage',
    severity: 'High',
    location: '19.0760,72.8777', // Mumbai
    author: 'Priya Sharma',
    authorId: 'user2',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'In-Progress',
    upvotes: 28,
    isAnonymous: false,
    imageUrl: 'https://picsum.photos/seed/lightoutage/800/600',
    updates: [
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Issue reported.',
        status: 'Reported',
      },
      {
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Acknowledged by Electricity Dept.',
        status: 'Acknowledged',
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Repair crew is on-site. The issue is with the main transformer.',
        status: 'In-Progress',
      },
    ],
  },
  {
    id: 'IS003',
    title: 'Garbage not collected for a week',
    description: 'Garbage bins are overflowing in the Green Park area. It has been over a week since the last collection.',
    category: 'Waste',
    severity: 'Medium',
    location: '12.9716,77.5946', // Bangalore
    author: 'Citizen',
    authorId: 'user3',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Resolved',
    upvotes: 15,
    isAnonymous: true,
    imageUrl: 'https://picsum.photos/seed/waste/800/600',
    updates: [
        { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), description: 'Reported by anonymous user.', status: 'Reported' },
        { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), description: 'Assigned to sanitation crew.', status: 'Acknowledged' },
        { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Waste collection in progress.', status: 'In-Progress' },
        { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), description: 'All waste has been cleared from the area.', status: 'Resolved' },
    ],
  },
  {
    id: 'IS004',
    title: 'Bus Route 205 is always late',
    description: 'The bus on route 205 is consistently delayed by over 30 minutes every morning during peak hours.',
    category: 'Bus Delay',
    severity: 'Medium',
    location: '22.5726,88.3639', // Kolkata
    author: 'Rohan Das',
    authorId: 'user4',
    createdAt: new Date().toISOString(),
    status: 'Reported',
    upvotes: 5,
    isAnonymous: false,
    imageUrl: 'https://picsum.photos/seed/busdelay/800/600',
    updates: [
        { date: new Date().toISOString(), description: 'Issue reported.', status: 'Reported' },
    ],
  },
  {
    id: 'IS005',
    title: 'Broken pavement causing issues',
    description: 'The pavement on Park Street is broken and uneven, making it difficult for pedestrians, especially the elderly.',
    category: 'Pothole',
    severity: 'Low',
    location: '13.0827,80.2707', // Chennai
    author: 'Ananya Iyer',
    authorId: 'user5',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Irrelevant',
    upvotes: 2,
    isAnonymous: false,
    imageUrl: 'https://picsum.photos/seed/pavement/800/600',
    updates: [
        { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), description: 'Issue reported.', status: 'Reported' },
        { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), description: 'This is a pavement repair, not a pothole. Closing as miscategorized.', status: 'Irrelevant' },
    ],
  },
];
