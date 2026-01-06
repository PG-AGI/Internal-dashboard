'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { TopCampaign } from '@/types';
import { Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TopCampaignsTableProps {
    campaigns: TopCampaign[];
    loading?: boolean;
    className?: string;
}

const rankColors = [
    'text-amber-500', // 1st - gold
    'text-gray-400', // 2nd - silver
    'text-amber-700', // 3rd - bronze
    'text-muted-foreground',
    'text-muted-foreground',
];

export function TopCampaignsTable({
    campaigns,
    loading = false,
    className,
}: TopCampaignsTableProps) {
    if (loading) {
        return (
            <Card className={className}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-36" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
        <Card className={cn('transition-all duration-300', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Top Campaigns
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Rank</TableHead>
                                <TableHead>Campaign</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campaigns.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No campaign data
                                    </TableCell>
                                </TableRow>
                            ) : (
                                campaigns.map((campaign, index) => (
                                    <TableRow
                                        key={campaign.id}
                                        className="transition-colors hover:bg-muted/50"
                                    >
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    'font-bold text-lg',
                                                    rankColors[index] || 'text-muted-foreground'
                                                )}
                                            >
                                                #{index + 1}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/campaigns/${campaign.id}`}
                                                className="font-medium hover:text-primary transition-colors"
                                            >
                                                {campaign.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                                <span className="font-semibold">
                                                    {formatCurrency(campaign.value)}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
