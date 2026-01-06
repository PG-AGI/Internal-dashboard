'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { CostBreakdown } from '@/types';

interface CostBreakdownChartProps {
    data: CostBreakdown;
    title?: string;
    loading?: boolean;
}

const COLORS = {
    asr: '#3b82f6', // blue
    tts: '#8b5cf6', // purple
    llm: '#f59e0b', // amber
    storage: '#10b981', // emerald
    total: '#6b7280', // gray
};

const LABELS = {
    asr: 'ASR (Speech Recognition)',
    tts: 'TTS (Text-to-Speech)',
    llm: 'LLM (Language Model)',
    storage: 'Storage',
};

export function CostBreakdownChart({
    data,
    title = 'Cost Breakdown',
    loading = false,
}: CostBreakdownChartProps) {
    if (loading) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[200px] w-full rounded-full mx-auto max-w-[200px]" />
                </CardContent>
            </Card>
        );
    }

    const chartData = Object.entries(data)
        .filter(([key]) => key !== 'total')
        .map(([key, value]) => ({
            name: LABELS[key as keyof typeof LABELS] || key,
            value: Number(value) || 0,
            key,
        }))
        .filter((item) => item.value > 0);

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value: number) => `$${value.toFixed(4)}`;

    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={800}
                            >
                                {chartData.map((entry) => (
                                    <Cell
                                        key={entry.key}
                                        fill={COLORS[entry.key as keyof typeof COLORS]}
                                        className="transition-all duration-200 hover:opacity-80"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null;
                                    const item = payload[0].payload;
                                    const percentage = ((item.value / total) * 100).toFixed(1);
                                    return (
                                        <div className="bg-background border rounded-lg shadow-lg p-3">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatCurrency(item.value)} ({percentage}%)
                                            </p>
                                        </div>
                                    );
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value) => (
                                    <span className="text-sm text-foreground">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-2xl font-bold">{formatCurrency(total)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
