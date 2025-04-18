"use client";

// External Imports

// Internal Imports
import type { TrackRevLayoutProps } from "@/types/track-rev";
import FooterNote from "@/app/_components//FooterNote";
import ContentSection from "@/app/track-rev/_components/ContentSection";
import TitleProvider from "@/app/track-rev/_providers/TitleProvider";
import YearProvider from "@/app/track-rev/_providers/YearProvider";
import TrackRevQueryProvider from "@/app/track-rev/_providers/TrackRevQueryProvider";
import Navbar from "@/app/_components/home/Navbar";
import { f1DisplayBold, f1DisplayRegular, f1DisplayWide } from "@/styles/fonts";

const navItems = [
  {
    label: "Constructor Standings",
    href: "/track-rev/standings/constructors",
  },
  {
    label: "Driver Standings",
    href: "/track-rev/standings/drivers",
  },
  {
    label: "Season Schedule",
    href: "/track-rev/schedule",
  },
];

export default function TrackRevLayout({ children }: TrackRevLayoutProps) {
  return (
    <TitleProvider>
      <YearProvider>
        <TrackRevQueryProvider>
          <main
            className={`${f1DisplayBold.variable} ${f1DisplayWide.variable} ${f1DisplayRegular.variable}`}
          >
            <div className="flex min-h-screen w-full flex-col bg-gray-900 font-trackRevRegularFont text-stone-100">
              <Navbar
                title={{
                  label: "TR",
                  href: "/track-rev",
                }}
                styling={{
                  // NOTE: When adding the styles here, add the stringed version as well to the Navbar so that the compiler has it in memory
                  title: {
                    text: "red-600",
                    hover: "stone-100",
                    font: "trackRevTitleFont",
                  },
                  bg: "black",
                  item: {
                    text: "red-600",
                    hover: "stone-100",
                    font: "trackRevRegularFont",
                  },
                  icon: {
                    text: "stone-100",
                    hover: "red-600",
                  },
                }}
                navItems={navItems}
                includeSocials={false}
              // need to add a styling property storing the colors and hover colors for the title, labels, icons
              />
              {/*<Navbar />*/}
              <ContentSection>{children ?? <></>}</ContentSection>
              <FooterNote className="relative bottom-0 mt-6 text-xs" />
            </div>
          </main>
        </TrackRevQueryProvider>
      </YearProvider>
    </TitleProvider>
  );
}
