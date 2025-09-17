import { db } from './firebase';
import { collection, getDocs, doc, getDoc, updateDoc, query, where, addDoc, Timestamp } from 'firebase/firestore';
import { Issue, Department, IssueUpdate, IssueStatus } from './types';

export const getIssues = async (department?: Department): Promise<Issue[]> => {
  const issuesCollection = collection(db, 'issues');
  let q = query(issuesCollection);

  if (department && department !== 'Central Admin') {
    const categoryMap: Record<string, string> = {
      'Roads': 'Pothole',
      'Electricity': 'Street Light Outage',
      'Waste Management': 'Waste',
      'Public Transport': 'Bus Delay'
    };
    const relevantCategory = categoryMap[department];
    q = query(issuesCollection, where('category', '==', relevantCategory));
  }
  
  const issueSnapshot = await getDocs(q);
  const issues: Issue[] = [];
  issueSnapshot.forEach((doc) => {
    const data = doc.data();
    issues.push({
      id: doc.id,
      ...data,
      createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
      updates: data.updates.map((update: any) => {
        const date = update.date.toDate ? (update.date as Timestamp).toDate().toISOString() : update.date;
        return {
          ...update,
          date: date,
        }
      }),
    } as Issue);
  });
  return issues;
};

export const getIssueById = async (id: string): Promise<Issue | undefined> => {
    const issueDoc = doc(db, 'issues', id);
    const issueSnapshot = await getDoc(issueDoc);

    if (!issueSnapshot.exists()) {
        return undefined;
    }

    const data = issueSnapshot.data();
    return {
        id: issueSnapshot.id,
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
        updates: data.updates.map((update: any) => {
          const date = update.date.toDate ? (update.date as Timestamp).toDate().toISOString() : update.date;
          return {
            ...update,
            date: date,
          }
        }),
    } as Issue;
}

export const updateIssueStatus = async (
  issueId: string,
  status: IssueStatus,
  updateDescription: string
): Promise<Issue> => {
  const issueRef = doc(db, 'issues', issueId);
  const issueSnap = await getDoc(issueRef);

  if (!issueSnap.exists()) {
    throw new Error('Issue not found');
  }

  const issueData = issueSnap.data();

  const newUpdate: IssueUpdate = {
    date: new Date().toISOString(),
    description: updateDescription,
    status: status,
  };

  const currentUpdates = issueData.updates || [];

  await updateDoc(issueRef, {
    status: status,
    updates: [...currentUpdates, {
      date: Timestamp.fromDate(new Date(newUpdate.date)),
      description: newUpdate.description,
      status: newUpdate.status,
    }],
  });
  
  const updatedIssue = await getIssueById(issueId);
  if (!updatedIssue) {
    throw new Error('Failed to retrieve updated issue');
  }
  return updatedIssue;
};

export const reassignIssueDepartment = async (
    issueId: string,
    newDepartment: Department
): Promise<Issue> => {
    const categoryMap: Record<string, any> = {
        'Roads': 'Pothole',
        'Electricity': 'Street Light Outage',
        'Waste Management': 'Waste',
        'Public Transport': 'Bus Delay',
    };

    const newCategory = categoryMap[newDepartment];
    if (!newCategory) {
        throw new Error('Invalid department for reassignment');
    }
    
    const issueRef = doc(db, 'issues', issueId);
    await updateDoc(issueRef, { category: newCategory });

    const updatedIssue = await getIssueById(issueId);
    if (!updatedIssue) {
        throw new Error('Failed to retrieve updated issue');
    }
    return updatedIssue;
};

