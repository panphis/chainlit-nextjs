"use client";

import { Fragment } from "react";
import type { FC } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ChainlitAPI, ChainlitContext } from '@/lib/chain-lit-react-client';
import { NEXT_PUBLIC_CHAINLIT_SERVER_URL, NEXT_PUBLIC_BASE_PATH } from '@/lib/constants';


import { SessionProvider } from "next-auth/react";

const sessionBasePath = NEXT_PUBLIC_BASE_PATH ? `${NEXT_PUBLIC_BASE_PATH}/api/auth` : "/api/auth";
export function NextAuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider basePath={sessionBasePath}>{children}</SessionProvider>
    );
}



const apiClient = new ChainlitAPI(NEXT_PUBLIC_CHAINLIT_SERVER_URL, 'webapp');


type Props = {
    children: React.ReactNode;
}

export const Provider: FC<Props> = ({ children }) => {
    const queryClient = new QueryClient();
    return (<Fragment>
        <QueryClientProvider client={queryClient}>
            <NextAuthProvider>
                <ChainlitContext.Provider value={apiClient}>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </ChainlitContext.Provider>
            </NextAuthProvider>
        </QueryClientProvider>
    </Fragment>);
};