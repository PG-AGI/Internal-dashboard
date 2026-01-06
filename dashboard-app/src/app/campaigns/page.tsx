'use client';

import { useCallback, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CampaignCard } from '@/components/molecules/CampaignCard';
import { useAsync } from '@/hooks/useAsync';
import { campaignService } from '@/services';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CampaignsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCampaigns = useCallback(() => campaignService.getAllCampaigns(), []);
    const { data, loading, error } = useAsync(fetchCampaigns);

    const campaigns = data?.result ?? [];

    const filteredCampaigns = campaigns.filter(
        (campaign) =>
            campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Header title="Campaigns" subtitle={`${campaigns.length} total campaigns`} />

            <div className="p-6 space-y-6">
                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search campaigns by title or language..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                        Failed to load campaigns. Please try again.
                    </div>
                )}

                {loading ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <CampaignCard key={i} campaign={{} as never} loading />
                        ))}
                    </div>
                ) : filteredCampaigns.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        {searchQuery ? 'No campaigns match your search' : 'No campaigns found'}
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCampaigns.map((campaign) => (
                            <CampaignCard key={campaign._id} campaign={campaign} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
