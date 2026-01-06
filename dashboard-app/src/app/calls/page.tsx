'use client';

import { useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { CallLogTable } from '@/components/molecules/CallLogTable';
import { StatCard } from '@/components/atoms/StatCard';
import { useAsync } from '@/hooks/useAsync';
import { callService } from '@/services';
import { Phone, Clock, DollarSign, CheckCircle } from 'lucide-react';

export default function CallsPage() {
    const fetchCalls = useCallback(() => callService.getCallLogs(), []);
    const { data, loading, error } = useAsync(fetchCalls);

    const calls = data?.result ?? [];

    // Calculate summary metrics
    const totalCalls = calls.length;
    const answeredCalls = calls.filter((c) => c.callStatus === 'ANSWERED').length;
    const totalMinutes = calls.reduce((sum, c) => sum + c.callElapseTtime, 0);
    const totalCost = calls.reduce((sum, c) => sum + c.callCost, 0);

    const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

    return (
        <div className="min-h-screen bg-background">
            <Header title="Call Logs" subtitle="Detailed view of all calls" />

            <div className="p-6 space-y-6">
                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                        Failed to load call logs. Please try again.
                    </div>
                )}

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Calls"
                        value={totalCalls}
                        icon={Phone}
                        iconColor="text-blue-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Answered"
                        value={answeredCalls}
                        subtitle={`${((answeredCalls / totalCalls) * 100 || 0).toFixed(1)}% pickup rate`}
                        icon={CheckCircle}
                        iconColor="text-green-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Total Minutes"
                        value={totalMinutes}
                        icon={Clock}
                        iconColor="text-purple-500"
                        loading={loading}
                    />
                    <StatCard
                        title="Total Cost"
                        value={formatCurrency(totalCost)}
                        icon={DollarSign}
                        iconColor="text-amber-500"
                        loading={loading}
                    />
                </div>

                {/* Call Logs Table */}
                <CallLogTable calls={calls} loading={loading} />
            </div>
        </div>
    );
}
