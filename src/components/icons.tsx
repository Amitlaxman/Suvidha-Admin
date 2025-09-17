import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-8", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10C27.9086 10 10 27.9086 10 50V90H50C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z"
        className="fill-primary"
      />
      <path
        d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90V10Z"
        className="fill-accent"
      />
    </svg>
  );
}
