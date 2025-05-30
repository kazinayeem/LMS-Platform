import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex items-center space-x-4 justify-center p-6 max-w-3xl mx-auto ">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
