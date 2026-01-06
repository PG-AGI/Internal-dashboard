// API Proxy route for all analytics endpoints
// This bypasses CORS by making requests server-side

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://prepodapi.toingg.com/api/analytics/v3';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        // In Next.js 15+, params is a Promise
        const { path } = await params;
        const pathString = path.join('/');
        const searchParams = request.nextUrl.searchParams.toString();
        const url = `${BACKEND_URL}/${pathString}${searchParams ? `?${searchParams}` : ''}`;

        console.log('[API Proxy GET]', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[API Proxy Error]', response.status, errorText);
            return NextResponse.json(
                { error: `Backend error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[API Proxy Error]', error);
        return NextResponse.json(
            { error: 'Failed to fetch from backend', details: String(error) },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        // In Next.js 15+, params is a Promise
        const { path } = await params;
        const pathString = path.join('/');
        const searchParams = request.nextUrl.searchParams.toString();
        const url = `${BACKEND_URL}/${pathString}${searchParams ? `?${searchParams}` : ''}`;

        let body = null;
        try {
            body = await request.json();
        } catch {
            // No body or invalid JSON - that's okay for some POST requests
        }

        console.log('[API Proxy POST]', url, body);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[API Proxy Error]', response.status, errorText);
            return NextResponse.json(
                { error: `Backend error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[API Proxy Error]', error);
        return NextResponse.json(
            { error: 'Failed to fetch from backend', details: String(error) },
            { status: 500 }
        );
    }
}
