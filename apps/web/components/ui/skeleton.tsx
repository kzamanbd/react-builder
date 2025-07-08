import { classNames } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={classNames("animate-pulse rounded-md bg-gray-200", className)} {...props} />
  );
}

export { Skeleton };
