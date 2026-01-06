// API Configuration - Centralized endpoint management
// Using local proxy routes to bypass CORS
// All requests go through /api/proxy/... which forwards to the backend

// Backend URL (used by the API proxy route server-side)
export const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://prepodapi.toingg.com/api/analytics/v3';

// Local API base URL (used by client-side code) - routes through our server-side proxy
export const API_BASE_URL = '/api/proxy';

export const ENDPOINTS = {
  ANALYTICS: {
    OVERALL: '/analytics/overall',
    STORAGE: '/analytics/storage',
    CUSTOMER: (id: string) => `/analytics/customer/${id}`,
    CUSTOMERS_LIST: '/analytics/customers/list',
  },
  CAMPAIGN: {
    DETAILS: (id: string, params?: { start?: string; end?: string; granularity?: 'day' | 'week' | 'month' }) => {
      const baseUrl = `/campaign/${id}`;
      if (!params) return baseUrl;
      const searchParams = new URLSearchParams();
      if (params.start) searchParams.append('start', params.start);
      if (params.end) searchParams.append('end', params.end);
      if (params.granularity) searchParams.append('granularity', params.granularity);
      return `${baseUrl}?${searchParams.toString()}`;
    },
    LIST: '/campaigns',
  },
  CALLS: '/calls',
} as const;

// Helper to build full URL
export const buildUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
