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
import { Progress } from '@/components/ui/progress';
import type { CustomerStorage } from '@/types';
import { HardDrive, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StorageTableProps {
    data: CustomerStorage[];
    totalStorageGB: number;
    storageRatePerGB: number;
    loading?: boolean;
    className?: string;
}

export function StorageTable({
    data,
    totalStorageGB,
    storageRatePerGB,
    loading = false,
    className,
}: StorageTableProps) {
    if (loading) {
        return (
            <Card className={className}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const formatSize = (gb: number) => {
        if (gb >= 1) return `${gb.toFixed(2)} GB`;
        return `${(gb * 1024).toFixed(2)} MB`;
    };

    const formatCurrency = (value: number) => `$${value.toFixed(4)}`;

    return (
        <Card className={cn('transition-all duration-300', className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Storage by Customer
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                        Rate: {formatCurrency(storageRatePerGB)}/GB
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="hidden md:table-cell">Usage</TableHead>
                                <TableHead className="text-right">Monthly Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No storage data found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => {
                                    const percentage = (item.totalSizeGB / totalStorageGB) * 100;
                                    return (
                                        <TableRow
                                            key={item._id}
                                            className="transition-colors hover:bg-muted/50"
                                        >
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                                                    {item.userName}
                                                </div>
                                            </TableCell>
                                            <TableCell>{formatSize(item.totalSizeGB)}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <Progress
                                                        value={percentage}
                                                        className="h-2 w-[100px]"
                                                    />
                                                    <span className="text-xs text-muted-foreground w-12">
                                                        {percentage.toFixed(1)}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatCurrency(item.estimatedMonthlyCost)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
