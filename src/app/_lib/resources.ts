import { ProjectItemProps } from "@/types";

export const portfolioItems: ProjectItemProps[] = [
  {
    title: "Song-Savvy",
    imgUrl: "/assets/images/song-savvy.png",
    stack: ["Python", "Jupyter Notebooks", "HTML", "CSS"],
    techSkills: ["Flask", "Machine Learning", "MLPClassifier", "pickle"],
    link: "https://github.com/udbhavbalaji/song-savvy",
    description:
      "This web application allows users to enter the link of a Spotify track and receive a prediction on whether the song will be a hit.",
  },
  {
    title: "Rubiks Cube Architecture",
    imgUrl: "/assets/images/rubiks-arch.png",
    stack: ["Python"],
    techSkills: ["Numpy", "Object-Oriented Programming"],
    link: "https://github.com/udbhavbalaji/rubiks-arch",
    description:
      "This project is an object-oriented model of a Rubik's Cube architecture, implemented in Python. It provides users with the ability to generate a virtual Rubik's Cube and perform various operations on it, including rotations, inversions, and shifts.",
  },
  {
    title: "Tracker-CLI",
    imgUrl: "/assets/images/tracker-cli.png",
    stack: ["JavaScript"],
    techSkills: ["Commander.js", "Inquirer.js", "Moment.js"],
    link: "https://github.com/udbhavbalaji/tracker-cli",
    description:
      "A simple data tracking tool, with the ability to generate reports, all from the command line.",
  },
];
