'use client';

import { format } from 'date-fns';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    const today = format(new Date(), 'EEEE, MMMM d, yyyy');

    return (
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b">
            <div className="flex h-16 items-center justify-between px-6">
                <div>
                    <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {/* Date display */}
                    <p className="hidden md:block text-sm text-muted-foreground">
                        {today}
                    </p>

                    {/* Search */}
                    <div className="hidden md:flex relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 w-[200px] lg:w-[300px]"
                        />
                    </div>

                    {/* Actions */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
