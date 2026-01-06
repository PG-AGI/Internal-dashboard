'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    loading?: boolean;
    className?: string;
    iconColor?: string;
}

export function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    loading = false,
    className,
    iconColor = 'text-primary',
}: StatCardProps) {
    if (loading) {
        return (
            <Card className={cn('overflow-hidden', className)}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            className={cn(
                'overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
                className
            )}
        >
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold tracking-tight">{value}</p>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground">{subtitle}</p>
                        )}
                        {trend && (
                            <div
                                className={cn(
                                    'flex items-center text-xs font-medium',
                                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                                )}
                            >
                                <span>{trend.isPositive ? '↑' : '↓'}</span>
                                <span className="ml-1">{Math.abs(trend.value)}%</span>
                            </div>
                        )}
                    </div>
                    {Icon && (
                        <div
                            className={cn(
                                'flex h-12 w-12 items-center justify-center rounded-full bg-primary/10',
                                iconColor
                            )}
                        >
                            <Icon className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
