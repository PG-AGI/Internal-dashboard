'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { CallLog } from '@/types';
import { format, parseISO } from 'date-fns';
import {
    Phone,
    Clock,
    DollarSign,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallLogTableProps {
    calls: CallLog[];
    loading?: boolean;
    className?: string;
}

function CallDetailRow({ call }: { call: CallLog }) {
    const [expanded, setExpanded] = useState(false);

    const formatTime = (isoString: string) => {
        if (!isoString || isoString === '1970-01-01T00:00:00Z') return 'N/A';
        try {
            return format(parseISO(isoString), 'MMM dd, HH:mm');
        } catch {
            return 'N/A';
        }
    };

    const formatCurrency = (value: number) => `$${value.toFixed(4)}`;

    return (
        <>
            <TableRow
                className={cn(
                    'cursor-pointer transition-colors hover:bg-muted/50',
                    expanded && 'bg-muted/30'
                )}
                onClick={() => setExpanded(!expanded)}
            >
                <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[120px]">{call.name}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <span className="text-sm text-muted-foreground truncate max-w-[140px] block">
                        {call.phoneNumber}
                    </span>
                </TableCell>
                <TableCell>
                    <StatusBadge status={call.callStatus} />
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{call.callElapseTtime} min</span>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            {formatCurrency(call.callCost)}
                        </span>
                    </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                    {formatTime(call.callStartTtime)}
                </TableCell>
                <TableCell>
                    <Button variant="ghost" size="sm" className="p-1">
                        {expanded ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </TableCell>
            </TableRow>
            {expanded && (
                <TableRow>
                    <TableCell colSpan={7} className="bg-muted/20 p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Transcription
                                </h4>
                                <ScrollArea className="h-[150px] rounded-md border p-3 bg-background">
                                    <p className="text-sm whitespace-pre-wrap">
                                        {call.transcription || 'No transcription available'}
                                    </p>
                                </ScrollArea>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    Call Details
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="p-2 rounded bg-background border">
                                        <span className="text-muted-foreground">ASR Cost:</span>
                                        <span className="ml-2 font-medium">
                                            {formatCurrency(call.extraInfo.asrCost)}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-background border">
                                        <span className="text-muted-foreground">TTS Cost:</span>
                                        <span className="ml-2 font-medium">
                                            {formatCurrency(call.extraInfo.ttsCost)}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-background border">
                                        <span className="text-muted-foreground">LLM Cost:</span>
                                        <span className="ml-2 font-medium">
                                            {formatCurrency(call.extraInfo.gptCost)}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-background border">
                                        <span className="text-muted-foreground">Twilio:</span>
                                        <span className="ml-2 font-medium">
                                            {formatCurrency(call.extraInfo.twilioCost)}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded bg-background border col-span-2">
                                        <span className="text-muted-foreground">Model:</span>
                                        <span className="ml-2 font-medium">
                                            {call.extraInfo.gptModel || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                {call.success !== null && (
                                    <div className="mt-2">
                                        <Badge variant={call.success ? 'default' : 'secondary'}>
                                            {call.success ? 'Successful' : 'Unsuccessful'}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}

export function CallLogTable({
    calls,
    loading = false,
    className,
}: CallLogTableProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    if (loading) {
        return (
            <Card className={className}>
                <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const totalPages = Math.ceil(calls.length / pageSize);
    const paginatedCalls = calls.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    return (
        <Card className={cn('transition-all duration-300', className)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                        Call Logs ({calls.length})
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedCalls.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No call logs found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedCalls.map((call) => (
                                    <CallDetailRow key={call._id} call={call} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                            Page {currentPage + 1} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                                }
                                disabled={currentPage === totalPages - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
