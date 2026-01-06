'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/atoms/StatCard';
import { CostBreakdownChart } from '@/components/molecules/CostBreakdownChart';
import { UsageChart } from '@/components/molecules/UsageChart';
import { TopCampaignsTable } from '@/components/molecules/TopCampaignsTable';
import { useAsync } from '@/hooks/useAsync';
import { analyticsService } from '@/services';
import {
    DollarSign,
    TrendingUp,
    Clock,
    MessageSquare,
    ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CustomerDetailPage() {
    const params = useParams();
    const customerId = params.id as string;

    const fetchCustomer = useCallback(
        () => analyticsService.getCustomerSummary(customerId),
        [customerId]
    );
    const { data, loading, error } = useAsync(fetchCustomer);

    const customer = data?.result;

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
        <div className="min-h-screen bg-background">
            <Header
                title={customer?.userName ?? 'Customer Details'}
                subtitle={customer?.email}
            />

            <div className="p-6 space-y-6">
                {/* Back button */}
                <Link href="/customers">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Customers
                    </Button>
                </Link>

                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                        Failed to load customer data. Please check the customer ID.
                    </div>
                )}

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Revenue"
                        value={customer ? formatCurrency(customer.revenue) : '$0'}
                        icon={TrendingUp}
                        iconColor="text-green-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Total Cost"
                        value={customer ? formatCurrency(customer.totalCost) : '$0'}
                        icon={DollarSign}
                        iconColor="text-red-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Profit"
                        value={customer ? formatCurrency(customer.profit) : '$0'}
                        icon={DollarSign}
                        iconColor="text-blue-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Total Minutes"
                        value={customer?.totalMinutes ?? 0}
                        icon={Clock}
                        iconColor="text-purple-500"
                        loading={loading}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {customer?.costBreakdown && (
                        <CostBreakdownChart
                            data={customer.costBreakdown}
                            title="Cost Breakdown"
                            loading={loading}
                        />
                    )}
                    {customer && (
                        <UsageChart
                            usage7d={customer.usage7d}
                            usage30d={customer.usage30d}
                            usage90d={customer.usage90d}
                            title="Usage Trend"
                            valueLabel="Minutes"
                            loading={loading}
                        />
                    )}
                </div>

                {/* Top Campaigns */}
                {customer?.top5Campaigns && (
                    <TopCampaignsTable
                        campaigns={customer.top5Campaigns}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}
