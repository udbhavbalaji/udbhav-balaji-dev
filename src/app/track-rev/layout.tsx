"use client";

import FooterNote from "@/app/_components//FooterNote";
import Navbar from "@/app/track-rev/_components/Navbar";
import ContentSection from "@/app/track-rev/_components/ContentSection";
import TitleProvider from "@/app/track-rev/_providers/TitleProvider";
import YearProvider from "@/app/track-rev/_providers/YearProvider";
import { TrackRevLayoutProps } from "@/types/track-rev";
import TrackRevQueryProvider from "./_providers/TrackRevQueryProvider";

export default function TrackRevLayout({
  children,
}: TrackRevLayoutProps) {
  return (
    <TitleProvider>
      <YearProvider>
        <TrackRevQueryProvider>
          <div className="font-trackRevRegularFont min-h-screen w-full bg-gray-900 text-stone-100 flex flex-col">
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
