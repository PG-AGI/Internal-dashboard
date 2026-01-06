'use client';

import { useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/atoms/StatCard';
import { InfrastructureCostChart } from '@/components/molecules/InfrastructureCostChart';
import { useAsync } from '@/hooks/useAsync';
import { analyticsService } from '@/services';
import {
  Clock,
  DollarSign,
  TrendingUp,
  Percent,
  Activity,
} from 'lucide-react';

export default function DashboardPage() {
  const fetchOverall = useCallback(() => analyticsService.getOverallAnalytics(), []);
  const { data: overallData, loading, error } = useAsync(fetchOverall);

  const formatCurrency = (value: number) => `$${value.toFixed(4)}`;
  const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`;

  const overall = overallData?.result;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Dashboard" subtitle="Overview of today's analytics" />

      <div className="p-6 space-y-6">
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
            Failed to load analytics data. Please try again.
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Minutes"
            value={overall?.totalMinutes?.toLocaleString() ?? '0'}
            icon={Clock}
            iconColor="text-blue-500"
            loading={loading}
          />
          <StatCard
            title="Total Cost"
            value={overall ? formatCurrency(overall.totalCost) : '$0'}
            icon={DollarSign}
            iconColor="text-red-500"
            loading={loading}
          />
          <StatCard
            title="Total Revenue"
            value={overall ? formatCurrency(overall.totalRevenue) : '$0'}
            icon={TrendingUp}
            iconColor="text-green-500"
            loading={loading}
          />
          <StatCard
            title="Margin"
            value={overall ? formatCurrency(overall.margin) : '$0'}
            subtitle={overall ? `(${formatPercent(overall.margin / overall.totalRevenue || 0)})` : ''}
            icon={Percent}
            iconColor="text-purple-500"
            loading={loading}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Cost Per Minute"
            value={overall ? formatCurrency(overall.costPerMinute) : '$0'}
            icon={Activity}
            iconColor="text-amber-500"
            loading={loading}
          />
          {overall?.infrastructureCostAllocation && (
            <InfrastructureCostChart
              data={overall.infrastructureCostAllocation}
              loading={loading}
            />
          )}
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="/customers"
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-lg mb-2">Customers</h3>
            <p className="text-sm text-muted-foreground">
              View all customers and their usage metrics
            </p>
          </a>
          <a
            href="/campaigns"
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-lg mb-2">Campaigns</h3>
            <p className="text-sm text-muted-foreground">
              Monitor campaign performance and analytics
            </p>
          </a>
          <a
            href="/calls"
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-lg mb-2">Call Logs</h3>
            <p className="text-sm text-muted-foreground">
              Browse detailed call transcriptions and costs
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
