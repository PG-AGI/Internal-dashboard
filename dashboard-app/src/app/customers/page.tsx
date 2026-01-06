'use client';

import { useCallback, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { CustomerCard } from '@/components/molecules/CustomerCard';
import { LoadingSkeleton } from '@/components/atoms/LoadingSkeleton';
import { useAsync } from '@/hooks/useAsync';
import { analyticsService } from '@/services';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCustomers = useCallback(() => analyticsService.getCustomerList(), []);
    const { data, loading, error } = useAsync(fetchCustomers);

    const customers = data?.result ?? [];

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Header title="Customers" subtitle={`${customers.length} total customers`} />

            <div className="p-6 space-y-6">
                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search customers by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                        Failed to load customers. Please try again.
                    </div>
                )}

                {loading ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <CustomerCard key={i} customer={{} as never} loading />
                        ))}
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        {searchQuery ? 'No customers match your search' : 'No customers found'}
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCustomers.map((customer) => (
                            <CustomerCard key={customer._id} customer={customer} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
