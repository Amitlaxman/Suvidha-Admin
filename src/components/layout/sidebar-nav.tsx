'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, LayoutDashboard, List, LogOut, Settings } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/icons';
import { Separator } from '../ui/separator';

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-department', label: 'My Department', icon: List },
    ...(user?.department === 'Central Admin'
      ? [{ href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 }]
      : []),
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="text-primary" />
          <span className="font-headline text-lg font-semibold">Suvidha Insights</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard/settings" passHref>
                <SidebarMenuButton 
                  isActive={pathname === '/dashboard/settings'}
                  tooltip={{ children: 'Settings', side: 'right' }}
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} tooltip={{ children: 'Logout', side: 'right' }}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
