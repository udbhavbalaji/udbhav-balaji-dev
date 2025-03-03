export type ThemeOptions = "light" | "dark";
export type JourneyItem = {
  title: string;
  year: string;
  type: "Class" | "Project" | "Assignment";
  details: string;
  techStack: string[];
};
export type PortfolioItem = {
  title: string;
  imgUrl: string;
  stack: string[];
  techSkills: string[];
  link: string;
  description: string;
};
export type ContactItem = {
  title: string;
  link: string;
  type: "github" | "linkedin" | "email";
};
export interface FooterNoteProps {
  className?: string;
}
