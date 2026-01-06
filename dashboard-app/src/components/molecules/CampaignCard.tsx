'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { CampaignListItem } from '@/types';
import { format, parseISO } from 'date-fns';
import {
    Phone,
    Clock,
    DollarSign,
    Globe,
    Mic,
    ChevronRight,
    Zap,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CampaignCardProps {
    campaign: CampaignListItem;
    loading?: boolean;
    className?: string;
}

export function CampaignCard({
    campaign,
    loading = false,
    className,
}: CampaignCardProps) {
    if (loading) {
        return (
            <Card className={cn('animate-pulse', className)}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-2/3" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
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

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    const createdDate =
        campaign.createdAt && campaign.createdAt !== '1970-01-01T00:00:00Z'
            ? format(parseISO(campaign.createdAt), 'MMM dd, yyyy')
            : 'N/A';

    return (
        <Link href={`/campaigns/${campaign._id}`}>
            <Card
                className={cn(
                    'cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group h-full',
                    className
                )}
            >
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                                {campaign.title}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                                Created: {createdDate}
                            </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        <Badge variant="secondary" className="text-xs">
                            <Globe className="h-3 w-3 mr-1" />
                            {campaign.language}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            <Mic className="h-3 w-3 mr-1" />
                            {campaign.voice}
                        </Badge>
                        {campaign.isFreeflow && (
                            <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Freeflow
                            </Badge>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                            <Phone className="h-4 w-4 text-blue-500 mb-1" />
                            <span className="font-semibold text-sm">
                                {campaign.totalNumCall}
                            </span>
                            <span className="text-[10px] text-muted-foreground">Calls</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                            <Clock className="h-4 w-4 text-green-500 mb-1" />
                            <span className="font-semibold text-sm">
                                {campaign.totalCallTime}
                            </span>
                            <span className="text-[10px] text-muted-foreground">Minutes</span>
                        </div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                            <DollarSign className="h-4 w-4 text-amber-500 mb-1" />
                            <span className="font-semibold text-sm">
                                {formatCurrency(campaign.totalSpent)}
                            </span>
                            <span className="text-[10px] text-muted-foreground">Spent</span>
                        </div>
                    </div>

                    {campaign.averageCallCost > 0 && (
                        <div className="mt-3 text-center">
                            <span className="text-xs text-muted-foreground">
                                Avg Cost: {formatCurrency(campaign.averageCallCost)}/call
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
