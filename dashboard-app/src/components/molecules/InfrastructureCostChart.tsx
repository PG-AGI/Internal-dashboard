'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { InfrastructureCostAllocation } from '@/types';

interface InfrastructureCostChartProps {
    data: InfrastructureCostAllocation;
    title?: string;
    loading?: boolean;
}

const COLORS = {
    asr: '#3b82f6', // blue
    tts: '#8b5cf6', // purple
    llm: '#f59e0b', // amber
};

const LABELS = {
    asr: 'ASR',
    tts: 'TTS',
    llm: 'LLM',
};

export function InfrastructureCostChart({
    data,
    title = 'Infrastructure Costs',
    loading = false,
}: InfrastructureCostChartProps) {
    if (loading) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-40" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[200px] w-full" />
                </CardContent>
            </Card>
        );
    }

    const chartData = Object.entries(data).map(([key, value]) => ({
        name: LABELS[key as keyof typeof LABELS] || key.toUpperCase(),
        value: Number(value) || 0,
        key,
    }));

    const formatCurrency = (value: number) => `$${value.toFixed(4)}`;

    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis
                                type="number"
                                tickFormatter={formatCurrency}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                width={40}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null;
                                    const item = payload[0].payload;
                                    return (
                                        <div className="bg-background border rounded-lg shadow-lg p-3">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Cost: {formatCurrency(item.value)}
                                            </p>
                                        </div>
                                    );
                                }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[0, 4, 4, 0]}
                                animationDuration={800}
                            >
                                {chartData.map((entry) => (
                                    <Cell
                                        key={entry.key}
                                        fill={COLORS[entry.key as keyof typeof COLORS]}
                                        className="transition-all duration-200 hover:opacity-80"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
