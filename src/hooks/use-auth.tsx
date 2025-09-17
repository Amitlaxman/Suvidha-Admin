"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser, Department } from '@/lib/types';
import { getDepartmentFromEmail } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: Record<string, Omit<AdminUser, 'department'>> = {
  'admin@roads.com': { uid: '1', email: 'admin@roads.com', displayName: 'Roads Admin' },
  'admin@electricity.com': { uid: '2', email: 'admin@electricity.com', displayName: 'Electricity Admin' },
  'admin@wastemanagement.com': { uid: '3', email: 'admin@wastemanagement.com', displayName: 'Waste Mgmt. Admin' },
  'admin@publictransport.com': { uid: '4', email: 'admin@publictransport.com', displayName: 'Transport Admin' },
  'admin@central.com': { uid: '5', email: 'admin@central.com', displayName: 'Central Admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('suvidha-admin-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('suvidha-admin-user');
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    const department = getDepartmentFromEmail(email);
    if (department && mockUsers[email]) {
      const newUser: AdminUser = {
        ...mockUsers[email],
        department,
      };
      setUser(newUser);
      localStorage.setItem('suvidha-admin-user', JSON.stringify(newUser));
      router.push('/dashboard');
    } else {
      setLoading(false);
      throw new Error('Invalid credentials or unauthorized domain.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('suvidha-admin-user');
    router.push('/login');
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
