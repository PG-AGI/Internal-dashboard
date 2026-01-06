// Call Service - Handles call logs API

import { ENDPOINTS } from '@/config/endpoints';
import { apiClient } from './api';
import type { CallLogsResponse } from '@/types';

export const callService = {
    /**
     * Get all raw call log data
     */
    async getCallLogs(): Promise<CallLogsResponse> {
        return apiClient.post<CallLogsResponse>(ENDPOINTS.CALLS);
    },
};
