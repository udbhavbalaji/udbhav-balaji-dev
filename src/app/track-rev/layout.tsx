"use client";

// External Imports

// Internal Imports
import type { TrackRevLayoutProps } from "@/types/track-rev";
import FooterNote from "@/app/_components//FooterNote";
import Navbar from "@/app/track-rev/_components/Navbar";
import ContentSection from "@/app/track-rev/_components/ContentSection";
import TitleProvider from "@/app/track-rev/_providers/TitleProvider";
import YearProvider from "@/app/track-rev/_providers/YearProvider";
import TrackRevQueryProvider from "@/app/track-rev/_providers/TrackRevQueryProvider";

export default function TrackRevLayout({ children }: TrackRevLayoutProps) {
  return (
    <TitleProvider>
      <YearProvider>
        <TrackRevQueryProvider>
          <div className="flex min-h-screen w-full flex-col bg-gray-900 font-trackRevRegularFont text-stone-100">
            <Navbar />
            <ContentSection>
              <main>{children ?? <></>}</main>
            </ContentSection>
            <FooterNote className="relative bottom-0 mt-6 text-xs" />
          </div>
        </TrackRevQueryProvider>
      </YearProvider>
    </TitleProvider>
  );
}
