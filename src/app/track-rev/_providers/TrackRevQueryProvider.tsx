"use client";

import { ProviderPropsType } from "@/types/track-rev";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const TrackRevQueryProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TrackRevQueryProvider;
