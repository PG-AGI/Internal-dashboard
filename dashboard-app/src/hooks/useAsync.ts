'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseAsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
    refetch: () => Promise<void>;
}

export function useAsync<T>(
    asyncFunction: () => Promise<T>,
    immediate = true
): UseAsyncReturn<T> {
    const [state, setState] = useState<UseAsyncState<T>>({
        data: null,
        loading: immediate,
        error: null,
    });

    const execute = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const result = await asyncFunction();
            setState({ data: result, loading: false, error: null });
        } catch (error) {
            setState({ data: null, loading: false, error: error as Error });
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { ...state, refetch: execute };
}
