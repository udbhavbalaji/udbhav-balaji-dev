import type { ProjectItemProps } from "@/types";

export const portfolioItems: ProjectItemProps[] = [
  {
    title: "Spotify Hit Predictor",
    imgUrl: "",
    stack: ["Python", "Jupyter Notebooks", "pickle", "scikit-learn"],
    techSkills: ["Machine Learning", "Neural networks"],
    link: "https://github.com/udbhavbalaji/spotify-hit-predictor",
    descriptions: [
      "Built an AI-powered model that predicts a song's success using Spotify's track data and insights.",
      "Achieved an impressive 90% accuracy by training on a dataset of 25,000 songs.",
      "Explored music trends across three decades, uncovering patterns in hits from the 1990s, 2000s, and 2010s.",
    ],
  },
  {
    title: "Rubiks Cube Architecture",
    imgUrl: "/assets/images/rubiks-arch.png",
    stack: ["Python"],
    techSkills: ["Numpy", "Object-Oriented Programming"],
    link: "https://github.com/udbhavbalaji/rubiks-arch",
    descriptions: [
      "This project presents an object-oriented architecture for a Rubik's Cube, seamlessly implemented in Python to deliver robust functionality and efficient design.",
      "Users can generate a virtual Rubik's Cube and easily execute a variety of operations, including rotations, inversions, and shifts, all within an intuitive interface.",
    ],
  },
  {
    title: "Tracker-CLI",
    imgUrl: "/assets/images/tracker-cli.png",
    stack: ["JavaScript"],
    techSkills: ["Commander.js", "Inquirer.js", "Moment.js"],
    link: "https://github.com/udbhavbalaji/tracker-cli",
    descriptions: [
      "Tracker CLI is a command-line application built with Node.js that allows users to track items efficiently.",
      "The application supports creation, configuration and deletion of datasets. Each dataset can contain any number of fields, which can be of types 'text', 'number', 'date', 'flag' or 'enum'.",
      "Within each dataset, records can be added and deleted. Filtered reports can be generated for each dataset based on the fields contained in the dataset.",
    ],
  },
  {
    title: "Logify",
    imgUrl: "/assets/images/tracker-cli.png",
    stack: ["TypeScript"],
    techSkills: ["NPM Package", "Logging", "Debugging"],
    link: "https://github.com/udbhavbalaji/logify",
    descriptions: [
      "A utility package, written in TS, for advanced, formatted logging while debugging.",
      "Allows function and method inspection for functions with advanced logging for better error identification in JS.",
      "Has a built in Error Logger and Handler to handle errors in a type-safe manner.",
    ],
  },
  {
    title: "Track-Rev",
    imgUrl: "",
    stack: ["TypeScript", "React"],
    techSkills: ["Full Stack App", "Next.js", "Tailwind CSS"],
    link: "https://github.com/udbhavbalaji/udbhav-balaji-dev",
    descriptions: [
      "Formula 1 web app that offers an immersive experience, allowing users to explore current and historical standings for drivers and constructors.",
      "Access comprehensive season schedules for both the current year and previous years, keeping you up-to-date with all the racing action.",
      "Stay tuned as the race details, race results, and dedicated pages for constructors and drivers are in development.",
    ],
  },
];
