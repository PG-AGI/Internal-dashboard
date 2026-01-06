'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Funnel } from '@/types';
import {
    Send,
    CheckCircle,
    Eye,
    MessageCircle,
    ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunnelChartProps {
    data: Funnel;
    title?: string;
    loading?: boolean;
    className?: string;
}

export function FunnelChart({
    data,
    title = 'Message Funnel',
    loading = false,
    className,
}: FunnelChartProps) {
    if (loading) {
        return (
            <Card className={className}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-around">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 w-20 rounded-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const steps = [
        {
            label: 'Sent',
            value: data.sent,
            icon: Send,
            color: 'text-blue-500',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            label: 'Delivered',
            value: data.delivered,
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            label: 'Read',
            value: data.read,
            icon: Eye,
            color: 'text-purple-500',
            bg: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            label: 'Replied',
            value: data.replied,
            icon: MessageCircle,
            color: 'text-amber-500',
            bg: 'bg-amber-100 dark:bg-amber-900/30',
        },
    ];

    const getRate = (current: number, previous: number) => {
        if (previous === 0) return 0;
        return ((current / previous) * 100).toFixed(1);
    };

    return (
        <Card className={cn('transition-all duration-300 hover:shadow-lg', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-around py-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === steps.length - 1;
                        const previousValue = index > 0 ? steps[index - 1].value : null;

                        return (
                            <div key={step.label} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={cn(
                                            'w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110',
                                            step.bg
                                        )}
                                    >
                                        <Icon className={cn('h-6 w-6', step.color)} />
                                    </div>
                                    <p className="mt-2 text-2xl font-bold">{step.value}</p>
                                    <p className="text-xs text-muted-foreground">{step.label}</p>
                                    {previousValue !== null && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            ({getRate(step.value, previousValue)}%)
                                        </p>
                                    )}
                                </div>
                                {!isLast && (
                                    <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
