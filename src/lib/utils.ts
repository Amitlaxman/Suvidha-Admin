import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Department } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDepartmentFromEmail(email: string): Department | null {
  const domain = email.split('@')[1];
  switch (domain) {
    case 'roads.com':
      return 'Roads';
    case 'electricity.com':
      return 'Electricity';
    case 'wastemanagement.com':
      return 'Waste Management';
    case 'publictransport.com':
      return 'Public Transport';
    case 'central.com':
      return 'Central Admin';
    default:
      return null;
  }
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
