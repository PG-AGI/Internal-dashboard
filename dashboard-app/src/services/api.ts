// Base API client with error handling

import { API_BASE_URL } from '@/config/endpoints';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private buildUrl(endpoint: string, params?: Record<string, string>): string {
        // For relative URLs (local proxy), build path directly
        const fullPath = `${this.baseUrl}${endpoint}`;
        if (!params || Object.keys(params).length === 0) {
            return fullPath;
        }
        const searchParams = new URLSearchParams(params);
        return `${fullPath}?${searchParams.toString()}`;
    }

    async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        const { params, ...fetchOptions } = options || {};
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions?.headers,
            },
            ...fetchOptions,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
        const { params, ...fetchOptions } = options || {};
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions?.headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            ...fetchOptions,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
