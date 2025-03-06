"use client";

// External Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Internal Imports
import type { ProviderPropsType } from "@/types/track-rev";

const TrackRevQueryProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TrackRevQueryProvider;
