import { Timestamp } from 'firebase/firestore';

export type Department =
  | 'Roads'
  | 'Electricity'
  | 'Waste Management'
  | 'Public Transport'
  | 'Central Admin';

export const Departments: Department[] = [
  'Roads',
  'Electricity',
  'Waste Management',
  'Public Transport',
  'Central Admin',
];

export const DepartmentEmails: Record<string, Department> = {
  'admin@roads.com': 'Roads',
  'admin@electricity.com': 'Electricity',
  'admin@wastemanagement.com': 'Waste Management',
  'admin@publictransport.com': 'Public Transport',
  'admin@central.com': 'Central Admin',
};

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  department: Department;
}

export type IssueStatus =
  | 'Reported'
  | 'Acknowledged'
  | 'In-Progress'
  | 'Resolved'
  | 'Irrelevant';

export type IssueSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IssueCategory =
  | 'Pothole'
  | 'Street Light Outage'
  | 'Waste'
  | 'Bus Delay';

export interface IssueUpdate {
  date: string; // ISO 8601 format
  description: string;
  status: IssueStatus;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  severity: IssueSeverity;
  location: string; // e.g., "lat,lng"
  author: string;
  authorId: string;
  createdAt: string; // ISO 8601 format
  status: IssueStatus;
  upvotes: number;
  isAnonymous: boolean;
  imageUrl: string;
  updates: IssueUpdate[];
}

export interface FirestoreIssue {
    id: string;
    title: string;
    description: string;
    category: IssueCategory;
    severity: IssueSeverity;
    location: string;
    author: string;
    authorId: string;
    createdAt: Timestamp;
    status: IssueStatus;
    upvotes: number;
    isAnonymous: boolean;
    imageUrl: string;
    updates: {
        date: Timestamp;
        description: string;
        status: IssueStatus;
    }[];
}
