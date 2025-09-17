import { Timestamp } from 'firebase/firestore';

export type Department =
  | 'Roads'
  | 'Electricity'
  | 'Waste Management'
  | 'Public Transport'
  | 'Water Supply'
  | 'Other'
  | 'Central Admin';

export const Departments: Department[] = [
  'Roads',
  'Electricity',
  'Waste Management',
  'Public Transport',
  'Water Supply',
  'Other',
  'Central Admin',
];

export const DepartmentEmails: Record<string, Department> = {
  'admin@roads.com': 'Roads',
  'admin@electricity.com': 'Electricity',
  'admin@wastemanagement.com': 'Waste Management',
  'admin@publictransport.com': 'Public Transport',
  'admin@central.com': 'Central Admin',
  // Assuming new departments might have admin emails
  'admin@watersupply.com': 'Water Supply',
  'admin@other.com': 'Other',
};

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  department: Department;
}

export type IssueStatus =
  | 'Submitted'
  | 'Acknowledged'
  | 'In Progress'
  | 'Resolved'
  | 'Irrelevant'; // 'Irrelevant' is from the admin app, not in the provided schema, but useful.

export type IssueSeverity = 'Low' | 'Medium' | 'High';

export type IssueCategory =
  | 'Roads'
  | 'Water Supply'
  | 'Electricity'
  | 'Waste Management'
  | 'Public Transport'
  | 'Other';

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
  location: string; // e.g., "lat,lng" or address
  author: string;
  authorId: string;
  createdAt: string; // ISO 8601 format
  status: IssueStatus;
  upvotes: number;
  isAnonymous: boolean;
  imageUrl?: string;
  mediaDataUri?: string;
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
    imageUrl?: string;
    mediaDataUri?: string;
    updates: {
        date: Timestamp;
        description: string;
        status: IssueStatus;
    }[];
}
