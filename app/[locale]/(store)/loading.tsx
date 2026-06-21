import { ProductCardSkeleton, StorePageSkeleton } from "@/components/ui/Skeleton";

export default function StoreLoading() {
  return (
    <StorePageSkeleton>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </StorePageSkeleton>
  );
}
