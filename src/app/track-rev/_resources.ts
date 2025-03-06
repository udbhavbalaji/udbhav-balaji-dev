// External Imports

// Internal Imports
import type { NavbarItem } from "@/types/track-rev";

export const navbarItems: NavbarItem[] = [
  {
    title: "Constructor's Championship",
    link: "/track-rev/standings/constructors",
    linkType: "route",
  },
  {
    title: "Driver's Championship",
    link: "/track-rev/standings/drivers",
    linkType: "route",
  },
  {
    title: "Season Schedule",
    link: "/track-rev/schedule",
    linkType: "route",
  },
];

export const Seasons = ["2025", "2024", "2023", "2022", "2021", "2020", "2019"];
