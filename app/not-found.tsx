import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container className="py-16 text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/fa"
          className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Go Home
        </Link>
      </Container>
    </div>
  );
}
