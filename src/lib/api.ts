import { mockIssues } from './mock-data';
import { Issue, Department, IssueUpdate, IssueStatus } from './types';

let issues: Issue[] = [...mockIssues];

export const getIssues = async (department?: Department): Promise<Issue[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  if (!department || department === 'Central Admin') {
    return issues;
  }
  
  const categoryMap: Record<string, string> = {
    'Roads': 'Pothole',
    'Electricity': 'Street Light Outage',
    'Waste Management': 'Waste',
    'Public Transport': 'Bus Delay'
  };

  const relevantCategory = categoryMap[department];
  return issues.filter(issue => issue.category === relevantCategory);
};

export const getIssueById = async (id: string): Promise<Issue | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return issues.find(issue => issue.id === id);
}

export const updateIssueStatus = async (
  issueId: string,
  status: IssueStatus,
  updateDescription: string
): Promise<Issue> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const issueIndex = issues.findIndex(i => i.id === issueId);
  if (issueIndex === -1) {
    throw new Error('Issue not found');
  }

  const newUpdate: IssueUpdate = {
    date: new Date().toISOString(),
    description: updateDescription,
    status: status,
  };

  const updatedIssue = {
    ...issues[issueIndex],
    status: status,
    updates: [...issues[issueIndex].updates, newUpdate],
  };

  issues[issueIndex] = updatedIssue;
  return updatedIssue;
};

export const reassignIssueDepartment = async (
    issueId: string,
    newDepartment: Department
): Promise<Issue> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const categoryMap: Record<string, any> = {
        'Roads': 'Pothole',
        'Electricity': 'Street Light Outage',
        'Waste Management': 'Waste',
        'Public Transport': 'Bus Delay',
        'Central Admin': 'Pothole'
    };

    const newCategory = categoryMap[newDepartment];
    const issueIndex = issues.findIndex(i => i.id === issueId);
    if (issueIndex === -1) {
        throw new Error('Issue not found');
    }

    const updatedIssue = {
        ...issues[issueIndex],
        category: newCategory,
    };

    issues[issueIndex] = updatedIssue;
    return updatedIssue;
};
