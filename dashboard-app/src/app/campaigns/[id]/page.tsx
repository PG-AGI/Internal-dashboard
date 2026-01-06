'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/atoms/StatCard';
import { CostBreakdownChart } from '@/components/molecules/CostBreakdownChart';
import { FunnelChart } from '@/components/molecules/FunnelChart';
import { useAsync } from '@/hooks/useAsync';
import { campaignService } from '@/services';
import {
    Phone,
    Clock,
    DollarSign,
    MessageSquare,
    Percent,
    ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CampaignDetailPage() {
    const params = useParams();
    const campaignId = params.id as string;

    const fetchCampaign = useCallback(
        () => campaignService.getCampaignAnalytics(campaignId),
        [campaignId]
    );
    const { data, loading, error } = useAsync(fetchCampaign);

    const campaign = data?.result;

    const formatCurrency = (value: number) => `$${value.toFixed(4)}`;
    const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

    return (
        <div className="min-h-screen bg-background">
            <Header
                title={campaign?.title ?? 'Campaign Details'}
                subtitle={campaign?.createdAt ? `Created: ${new Date(campaign.createdAt).toLocaleDateString()}` : undefined}
            />

            <div className="p-6 space-y-6">
                {/* Back button */}
                <Link href="/campaigns">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Campaigns
                    </Button>
                </Link>

                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                        Failed to load campaign data. Please check the campaign ID.
                    </div>
                )}

                {/* Call Metrics */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Call Metrics</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total Calls"
                            value={campaign?.callMetrics.totalCalls ?? 0}
                            icon={Phone}
                            iconColor="text-blue-500"
                            loading={loading}
                        />
                        <StatCard
                            title="Total Minutes"
                            value={campaign?.callMetrics.totalMinutes ?? 0}
                            icon={Clock}
                            iconColor="text-green-500"
                            loading={loading}
                        />
                        <StatCard
                            title="Pickup Rate"
                            value={campaign ? formatPercent(campaign.callMetrics.pickupRate) : '0%'}
                            icon={Percent}
                            iconColor="text-purple-500"
                            loading={loading}
                        />
                        <StatCard
                            title="Cost per Call"
                            value={campaign ? formatCurrency(campaign.callMetrics.costPerCall) : '$0'}
                            icon={DollarSign}
                            iconColor="text-amber-500"
                            loading={loading}
                        />
                    </div>
                </div>

                {/* Text Metrics */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Text Metrics</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatCard
                            title="Total Messages"
                            value={campaign?.textMetrics.totalMessages ?? 0}
                            icon={MessageSquare}
                            iconColor="text-blue-500"
                            loading={loading}
                        />
                        <StatCard
                            title="Reply Rate"
                            value={campaign ? formatPercent(campaign.textMetrics.replyRate) : '0%'}
                            icon={Percent}
                            iconColor="text-green-500"
                            loading={loading}
                        />
                        <StatCard
                            title="Cost per Message"
                            value={campaign ? formatCurrency(campaign.textMetrics.costPerMsg) : '$0'}
                            icon={DollarSign}
                            iconColor="text-amber-500"
                            loading={loading}
                        />
                    </div>
                </div>

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {campaign?.costBreakdown && (
                        <CostBreakdownChart
                            data={campaign.costBreakdown}
                            title="Cost Breakdown"
                            loading={loading}
                        />
                    )}
                    {campaign?.funnel && (
                        <FunnelChart
                            data={campaign.funnel}
                            title="Message Funnel"
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
