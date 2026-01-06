'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type MetricType = 'cost' | 'revenue' | 'profit' | 'neutral';

interface MetricBadgeProps {
    label: string;
    value: string | number;
    type?: MetricType;
    className?: string;
}

const typeStyles: Record<MetricType, string> = {
    cost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    revenue: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    profit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

export function MetricBadge({
    label,
    value,
    type = 'neutral',
    className,
}: MetricBadgeProps) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                'px-3 py-1 font-medium transition-all duration-200 hover:scale-105',
                typeStyles[type],
                className
            )}
        >
            <span className="mr-1 text-muted-foreground">{label}:</span>
            <span className="font-bold">{value}</span>
        </Badge>
    );
}
