'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
    variant?: 'card' | 'table' | 'chart' | 'list';
    count?: number;
    className?: string;
}

export function LoadingSkeleton({
    variant = 'card',
    count = 1,
    className,
}: LoadingSkeletonProps) {
    const items = Array.from({ length: count }, (_, i) => i);

    if (variant === 'card') {
        return (
            <div className={cn('grid gap-4', className)}>
                {items.map((i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-2">
                            <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/2 mb-2" />
                            <Skeleton className="h-3 w-2/3" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (variant === 'table') {
        return (
            <div className={cn('space-y-3', className)}>
                <div className="flex gap-4 px-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                {items.map((i) => (
                    <div key={i} className="flex gap-4 px-4 py-3 border-b">
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'chart') {
        return (
            <Card className={cn('animate-pulse', className)}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                </CardContent>
            </Card>
        );
    }

    // list variant
    return (
        <div className={cn('space-y-2', className)}>
            {items.map((i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
