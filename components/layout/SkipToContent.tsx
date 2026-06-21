import Link from "next/link";

type SkipToContentProps = {
  label: string;
};

export function SkipToContent({ label }: SkipToContentProps) {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      {label}
    </Link>
  );
}
