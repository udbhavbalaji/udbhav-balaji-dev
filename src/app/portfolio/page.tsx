"use client";

import { ThemeOptions } from "@/types/portfolio";
import { useEffect, useState } from "react";
import Navbar from "./_components/Navbar";
import Intro from "./_components/Intro";
import CurrentProject from "./_components/CurrentProject";
import Journey from "./_components/Journey";
import Portfolio from "./_components/Portfolio";
import Contact from "./_components/Contact";
import FooterNote from "../_components/FooterNote";

export default function PortfolioApp() {
  const [theme, setTheme] = useState<ThemeOptions | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!theme) {
    return (
      <div className="text-red-500">Something went wrong with the theme</div>
    );
  }

  return (
    <div className="font-portfolioFont w-full bg-stone-100 px-4 py-2 text-stone-900 dark:bg-gray-900 dark:text-stone-100">
      <Navbar theme={theme} themeSwitcher={handleThemeSwitch} />
      <Intro />
      <CurrentProject />
      <hr className="mx-auto my-16 h-px w-9/12 border-0 bg-gray-600" />
      <Journey />
      <hr
        id="projects"
        className="mx-auto my-16 h-px w-9/12 border-0 bg-gray-600"
      />
      <Portfolio />
      <hr
        id="contact"
        className="mx-auto my-16 h-px w-9/12 border-0 bg-gray-600"
      />
      <Contact />
      <FooterNote className="text-sm font-light text-gray-500" />
    </div>
  );
}
