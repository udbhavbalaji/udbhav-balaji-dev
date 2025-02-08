"use client";

import FooterNote from "@/app/_components//FooterNote";
import Navbar from "@/app/track-rev/_components/Navbar";
import ContentSection from "@/app/track-rev/_components/ContentSection";
import TitleProvider from "@/app/track-rev/_providers/TitleProvider";
import YearProvider from "@/app/track-rev/_providers/YearProvider";
import { TrackRevLayoutProps } from "@/types/track-rev";
// import ErgastProvider from "./_providers/ErgastProvider";
// import ErgastProvider from "../_providers/track-rev/ErgastProvider";
import TrackRevQueryProvider from "./_providers/TrackRevQueryProvider";

export default function TrackRevLayout({
  children,
  title,
}: TrackRevLayoutProps) {
  return (
    <TitleProvider>
      <YearProvider>
        {/* <ErgastProvider> */}
        <TrackRevQueryProvider>
          <div className="font-trackRevRegularFont min-h-screen w-full bg-gray-900 text-stone-100">
            <Navbar />
            <ContentSection>
              <main>{children ?? <></>}</main>
            </ContentSection>
            <FooterNote className="absolute bottom-0 mt-6 text-xs" />
          </div>
          {/* </ErgastProvider> */}
        </TrackRevQueryProvider>
      </YearProvider>
    </TitleProvider>
  );
}
