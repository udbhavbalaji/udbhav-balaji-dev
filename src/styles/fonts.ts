import localFont from "next/font/local";
import { Source_Sans_3, Ubuntu_Mono } from "next/font/google";

const f1DisplayRegular = localFont({
  src: [
    {
      path: "../fonts/Formula1-Regular.otf",
    },
  ],
  variable: "--font-f1-regular",
  display: "auto",
});

const f1DisplayBold = localFont({
  src: [
    {
      path: "../fonts/Formula1-Bold.otf",
    },
  ],
  variable: "--font-f1-bold",
  display: "auto",
});

const f1DisplayWide = localFont({
  src: [
    {
      path: "../fonts/Formula1-Wide.otf",
    },
  ],
  variable: "--font-f1-wide",
  display: "auto",
});

const quiklistTitleFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
});

const quiklistMonoFont = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export {
  f1DisplayWide,
  f1DisplayBold,
  f1DisplayRegular,
  quiklistTitleFont,
  quiklistMonoFont,
};
