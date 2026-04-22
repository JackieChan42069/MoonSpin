import { Skeleton } from '@/components/ui/skeleton';

export function GameCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden glass">
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-[4/3]" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4" />

        {/* Info Row Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* Bet Range Skeleton */}
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
