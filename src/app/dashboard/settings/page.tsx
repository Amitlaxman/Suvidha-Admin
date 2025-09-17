'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Account Settings</CardTitle>
          <CardDescription>Manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.displayName} />
              <AvatarFallback className="text-2xl">{getInitials(user.displayName)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <h2 className="font-headline text-2xl font-semibold">{user.displayName}</h2>
              <p className="text-sm text-muted-foreground">{user.department} Department</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" value={user.displayName} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} readOnly />
            </div>
          </div>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Sign Out</CardTitle>
          <CardDescription>Sign out of your Suvidha Insights account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
