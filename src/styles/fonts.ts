import localFont from "next/font/local";

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

export { f1DisplayWide, f1DisplayBold, f1DisplayRegular };
