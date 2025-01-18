'use client';

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

// Create a client
export const queryClient = new QueryClient()

export default async function QueryProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}