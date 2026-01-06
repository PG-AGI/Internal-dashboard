// Campaign Service - Handles all campaign-related API calls

import { ENDPOINTS } from '@/config/endpoints';
import { apiClient } from './api';
import type {
    CampaignAnalyticsResponse,
    CampaignListResponse,
} from '@/types';

export interface CampaignQueryParams {
    start?: string;
    end?: string;
    granularity?: 'day' | 'week' | 'month';
}

export const campaignService = {
    /**
     * Get analytics for a specific campaign
     * @param campaignId - The campaign ID
     * @param params - Optional query parameters for date range and granularity
     */
    async getCampaignAnalytics(
        campaignId: string,
        params?: CampaignQueryParams
    ): Promise<CampaignAnalyticsResponse> {
        return apiClient.get<CampaignAnalyticsResponse>(
            ENDPOINTS.CAMPAIGN.DETAILS(campaignId, params)
        );
    },

    /**
     * Get all campaigns
     */
    async getAllCampaigns(): Promise<CampaignListResponse> {
        return apiClient.post<CampaignListResponse>(ENDPOINTS.CAMPAIGN.LIST);
    },
};
