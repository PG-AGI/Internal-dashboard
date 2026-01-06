'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
    value: number;
    suffix?: string;
    showIcon?: boolean;
    className?: string;
}

export function TrendIndicator({
    value,
    suffix = '%',
    showIcon = true,
    className,
}: TrendIndicatorProps) {
    const isPositive = value > 0;
    const isNeutral = value === 0;

    const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

    return (
        <div
            className={cn(
                'inline-flex items-center gap-1 text-sm font-medium',
                isNeutral
                    ? 'text-gray-500'
                    : isPositive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400',
                className
            )}
        >
            {showIcon && <Icon className="h-4 w-4" />}
            <span>
                {isPositive ? '+' : ''}
                {value.toFixed(1)}
                {suffix}
            </span>
        </div>
    );
}
