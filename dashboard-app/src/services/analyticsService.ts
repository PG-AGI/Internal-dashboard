// Analytics Service - Handles all analytics-related API calls

import { ENDPOINTS } from '@/config/endpoints';
import { apiClient } from './api';
import type {
    OverallAnalyticsResponse,
    StorageAnalyticsResponse,
    CustomerSummaryResponse,
    CustomerListResponse,
} from '@/types';

export const analyticsService = {
    /**
     * Get overall analytics for the current day
     */
    async getOverallAnalytics(): Promise<OverallAnalyticsResponse> {
        return apiClient.get<OverallAnalyticsResponse>(ENDPOINTS.ANALYTICS.OVERALL);
    },

    /**
     * Get storage analytics with customer-wise breakdown
     */
    async getStorageAnalytics(): Promise<StorageAnalyticsResponse> {
        return apiClient.get<StorageAnalyticsResponse>(ENDPOINTS.ANALYTICS.STORAGE);
    },

    /**
     * Get complete summary for a single customer
     * @param customerId - The customer ID
     */
    async getCustomerSummary(customerId: string): Promise<CustomerSummaryResponse> {
        return apiClient.get<CustomerSummaryResponse>(
            ENDPOINTS.ANALYTICS.CUSTOMER(customerId)
        );
    },

    /**
     * Get list of all customers with metrics
     */
    async getCustomerList(): Promise<CustomerListResponse> {
        return apiClient.post<CustomerListResponse>(ENDPOINTS.ANALYTICS.CUSTOMERS_LIST);
    },
};
