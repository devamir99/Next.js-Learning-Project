import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

function CircleSkeleton({ size = "h-16 w-16" }: { size?: string }) {
  return <Skeleton className={`${size} shrink-0 rounded-full`} />;
}

function CompactProductSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div>
      <section className="border-b border-border bg-card py-4">
        <Container>
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex w-[4.5rem] shrink-0 flex-col items-center gap-2">
                <CircleSkeleton />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-4">
        <Container>
          <Skeleton className="aspect-[21/8] min-h-[160px] w-full rounded-2xl" />
        </Container>
      </section>

      <section className="border-b border-border bg-card py-4">
        <Container>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <CircleSkeleton size="h-12 w-12 sm:h-14 sm:w-14" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Skeleton className="h-44 w-full rounded-2xl sm:h-52" />
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[3/2] rounded-xl" />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card py-6">
        <Container>
          <Skeleton className="mb-6 h-8 w-40" />
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <CircleSkeleton />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <Skeleton className="mb-6 h-8 w-48" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CompactProductSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
