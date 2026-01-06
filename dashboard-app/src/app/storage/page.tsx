'use client';

import { useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { StorageTable } from '@/components/molecules/StorageTable';
import { StatCard } from '@/components/atoms/StatCard';
import { useAsync } from '@/hooks/useAsync';
import { analyticsService } from '@/services';
import { Database, HardDrive, DollarSign, Users } from 'lucide-react';

export default function StoragePage() {
    const fetchStorage = useCallback(() => analyticsService.getStorageAnalytics(), []);
    const { data, loading, error } = useAsync(fetchStorage);

    const storage = data?.result;

    const formatSize = (gb: number) => {
        if (gb >= 1) return `${gb.toFixed(2)} GB`;
        return `${(gb * 1024).toFixed(2)} MB`;
    };

    const formatCurrency = (value: number) => `$${value.toFixed(4)}`;

    return (
        <div className="min-h-screen bg-background">
            <Header title="Storage Analytics" subtitle="Storage usage breakdown by customer" />

            <div className="p-6 space-y-6">
                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                        Failed to load storage data. Please try again.
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Storage"
                        value={storage ? formatSize(storage.totalStorageGB) : '0 GB'}
                        icon={Database}
                        iconColor="text-blue-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Total Monthly Cost"
                        value={storage ? formatCurrency(storage.totalOverallCost) : '$0'}
                        icon={DollarSign}
                        iconColor="text-green-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Rate per GB"
                        value={storage ? formatCurrency(storage.storageRatePerGB) : '$0'}
                        subtitle="per month"
                        icon={HardDrive}
                        iconColor="text-purple-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Customers"
                        value={storage?.customerWiseStorage?.length ?? 0}
                        subtitle="using storage"
                        icon={Users}
                        iconColor="text-amber-500"
                        loading={loading}
                    />
                </div>

                {/* Storage Table */}
                {storage && (
                    <StorageTable
                        data={storage.customerWiseStorage}
                        totalStorageGB={storage.totalStorageGB}
                        storageRatePerGB={storage.storageRatePerGB}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}
