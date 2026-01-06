'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { UsageData } from '@/types';
import { format, parseISO } from 'date-fns';

interface UsageChartProps {
    usage7d: UsageData[];
    usage30d: UsageData[];
    usage90d: UsageData[];
    title?: string;
    loading?: boolean;
    valueLabel?: string;
}

export function UsageChart({
    usage7d,
    usage30d,
    usage90d,
    title = 'Usage Trend',
    loading = false,
    valueLabel = 'Usage',
}: UsageChartProps) {
    if (loading) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <Skeleton className="h-[200px] w-full" />
                </CardContent>
            </Card>
        );
    }

    const formatData = (data: UsageData[]) =>
        data.map((item) => ({
            ...item,
            formattedDate: item.date
                ? format(parseISO(item.date), 'MMM dd')
                : item.date,
        }));

    const renderChart = (data: UsageData[]) => {
        const formattedData = formatData(data);
        return (
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData}>
                        <defs>
                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis
                            dataKey="formattedDate"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value.toLocaleString()}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;
                                return (
                                    <div className="bg-background border rounded-lg shadow-lg p-3">
                                        <p className="font-medium">{label}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {valueLabel}: {payload[0].value?.toLocaleString()}
                                        </p>
                                    </div>
                                );
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#colorUsage)"
                            animationBegin={0}
                            animationDuration={800}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="7d" className="w-full">
                    <TabsList className="grid w-full max-w-[300px] grid-cols-3 mb-4">
                        <TabsTrigger value="7d" className="transition-all duration-200">
                            7 Days
                        </TabsTrigger>
                        <TabsTrigger value="30d" className="transition-all duration-200">
                            30 Days
                        </TabsTrigger>
                        <TabsTrigger value="90d" className="transition-all duration-200">
                            90 Days
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="7d" className="mt-0">
                        {renderChart(usage7d)}
                    </TabsContent>
                    <TabsContent value="30d" className="mt-0">
                        {renderChart(usage30d)}
                    </TabsContent>
                    <TabsContent value="90d" className="mt-0">
                        {renderChart(usage90d)}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
