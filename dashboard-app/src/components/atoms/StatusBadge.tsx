'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
    status: string;
    type?: StatusType;
    className?: string;
}

const statusTypeMap: Record<string, StatusType> = {
    ANSWERED: 'success',
    COMPLETED: 'success',
    NO_ANSWER: 'warning',
    BUSY: 'warning',
    FAILED: 'error',
    STARTED: 'info',
    PENDING: 'info',
};

const typeStyles: Record<StatusType, string> = {
    success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
    error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    default: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
};

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
    const resolvedType = type || statusTypeMap[status.toUpperCase()] || 'default';

    return (
        <Badge
            variant="outline"
            className={cn(
                'px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide',
                typeStyles[resolvedType],
                className
            )}
        >
            {status}
        </Badge>
    );
}
