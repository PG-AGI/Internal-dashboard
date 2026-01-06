'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Phone,
    Database,
    Menu,
    X,
    BarChart3,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
    { name: 'Call Logs', href: '/calls', icon: Phone },
    { name: 'Storage', href: '/storage', icon: Database },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile toggle button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </Button>

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300 ease-in-out',
                    collapsed ? 'w-0 md:w-16' : 'w-64',
                    'md:translate-x-0',
                    collapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div
                        className={cn(
                            'flex h-16 items-center border-b px-4',
                            collapsed && 'md:justify-center md:px-2'
                        )}
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <BarChart3 className="h-5 w-5" />
                            </div>
                            <span
                                className={cn(
                                    'font-bold text-lg transition-opacity duration-200',
                                    collapsed && 'md:hidden'
                                )}
                            >
                                Analytics
                            </span>
                        </Link>
                        {/* Desktop collapse button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto hidden md:flex"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <ScrollArea className="flex-1 px-3 py-4">
                        <nav className="space-y-1">
                            {navigation.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href));
                                const Icon = item.icon;

                                return (
                                    <Link key={item.name} href={item.href}>
                                        <div
                                            className={cn(
                                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                                isActive
                                                    ? 'bg-primary text-primary-foreground shadow-md'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                                collapsed && 'md:justify-center md:px-2'
                                            )}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" />
                                            <span
                                                className={cn(
                                                    'transition-opacity duration-200',
                                                    collapsed && 'md:hidden'
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </ScrollArea>

                    {/* Footer */}
                    <div
                        className={cn(
                            'border-t p-4',
                            collapsed && 'md:p-2'
                        )}
                    >
                        <p
                            className={cn(
                                'text-xs text-muted-foreground text-center',
                                collapsed && 'md:hidden'
                            )}
                        >
                            © 2025 Analytics Dashboard
                        </p>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {!collapsed && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setCollapsed(true)}
                />
            )}
        </>
    );
}
