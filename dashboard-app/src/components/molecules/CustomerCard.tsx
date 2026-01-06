'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricBadge } from '@/components/atoms/MetricBadge';
import type { CustomerListItem } from '@/types';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import {
    Phone,
    Clock,
    DollarSign,
    Mail,
    MessageSquare,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CustomerCardProps {
    customer: CustomerListItem;
    loading?: boolean;
    className?: string;
}

export function CustomerCard({
    customer,
    loading = false,
    className,
}: CustomerCardProps) {
    if (loading) {
        return (
            <Card className={cn('animate-pulse', className)}>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const initials = customer.userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    const lastActiveText = customer.lastActive
        ? formatDistanceToNow(parseISO(customer.lastActive), { addSuffix: true })
        : 'Never';

    return (
        <Link href={`/customers/${customer._id}`}>
            <Card
                className={cn(
                    'cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group',
                    className
                )}
            >
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                    {customer.userName}
                                </h3>
                                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="flex items-center gap-1.5 text-sm">
                            <Phone className="h-3.5 w-3.5 text-blue-500" />
                            <span className="font-medium">{customer.totalNumCall}</span>
                            <span className="text-muted-foreground text-xs">calls</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                            <Clock className="h-3.5 w-3.5 text-green-500" />
                            <span className="font-medium">{customer.totalMinutes}</span>
                            <span className="text-muted-foreground text-xs">min</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                            <DollarSign className="h-3.5 w-3.5 text-amber-500" />
                            <span className="font-medium">
                                {formatCurrency(customer.totalSpent)}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                            Last active: {lastActiveText}
                        </p>
                        {customer.averageCallCost > 0 && (
                            <Badge variant="secondary" className="text-xs">
                                Avg: {formatCurrency(customer.averageCallCost)}/call
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
