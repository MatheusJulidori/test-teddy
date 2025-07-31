import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

export function ReactQueryProvider({ children }: { children: ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
