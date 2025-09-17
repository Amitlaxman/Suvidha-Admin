'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { usePathname } from 'next/navigation';

const getTitleFromPathname = (pathname: string) => {
  if (pathname.startsWith('/dashboard/analytics')) return 'Analytics';
  if (pathname.startsWith('/dashboard/my-department')) return 'My Department Issues';
  if (pathname.startsWith('/dashboard/settings')) return 'Settings';
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  return 'Suvidha Insights';
}

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="font-headline text-xl font-semibold">{title}</h1>
      <div className="ml-auto">
        <UserNav />
      </div>
    </header>
  );
}
