import { ContactItem, JourneyItem, PortfolioItem } from "@/types/portfolio";

type NavbarItem = {
  display: string;
  link: string;
  linkType: "regular" | "static";
  downloadName?: string;
};

export const navbarItems: NavbarItem[] = [
  {
    display: "Projects",
    link: "#projects",
    linkType: "regular",
  },
  {
    display: "Resume",
    link: "public/assets/documents/Udbhav Balaji Resume SD.pdf",
    linkType: "static",
    downloadName: "Udbhav_Balaji_Resume.pdf",
  },
  {
    display: "Contact",
    link: "#contact",
    linkType: "regular",
  },
];

export const introData = {
  name: "Udbhav Balaji",
  bio: "Welcome to my digital playground, where code meets creativity! I'm a software engineer who loves turning data into stories and ideas into reality. Whether it's building dynamic applications or uncovering insights hidden in data, I bring a blend of technical prowess and innovative thinking to every project. Explore my work, and let's connect to discuss exciting opportunities!",
  roles: "Software Engineer & Data Analyst",
};

// todo: need to update current project
export const currentProject = {
  title: "Formula 1 Dashboard with TypeScript & React",
  imgUrl: "/assets/images/track-rev.png",
  stack: ["React", "TypeScript", "Node.js", "Express.js", "Axios"],
  newSkills: ["React", "TypeScript", "Express"],
  description: [
    "Building Formula 1 dashboard to view details about the current F1 season.",
    "Built REST API endpoints with Typescript to serve data to the front-end.",
    "Future Features: I want to allow users to see real-time updated data with the Open F1 API.",
  ],
  link: "https://github.com/udbhavbalaji/f1-dash/tree/project-init",
};

export const journeyItems: JourneyItem[] = [
  {
    title: "First Coding Lesson!",
    year: "2017",
    type: "Class",
    details:
      "I began my programming journey in High School, where In learnt Java & MySQL.",
    techStack: ["Java", "NetBeans", "MySQL"],
  },
  {
    title: "High School Project",
    year: "2019",
    type: "Project",
    details:
      "I added additional features to an existing inventory management software being used in my hostel.",
    techStack: ["Java", "NetBeans", "MySQL"],
  },
  {
    title: "Pseudo-Machine Learning Model",
    year: "2019",
    type: "Assignment",
    details:
      "For our first challenging assignment, we were tasked to create a model that would predict if a person has an income of greater than $50,000 (based on provided data of ~10,000 rows).",
    techStack: ["Python"],
  },
  {
    title: "Spotify Hit Predictor",
    year: "2022",
    type: "Project",
    details:
      "In a challenging Advanced Data Analytics course, for the final project, we were required to create a supervised learning model from interesting data we find.",
    techStack: [
      "Python",
      "Jupyter Notebooks",
      "XGBoost Classifier",
      "Flask",
      "HTML",
    ],
  },
  {
    title: "Web Development Final Project",
    year: "2024",
    type: "Project",
    details:
      "Given a specification, designed the ER diagrams, translated ER Diagram to SQL DDL commands & created simple front-end to perform CRUD operations.",
    techStack: ["MySQL", "HTML", "CSS", "PHP"],
  },
];

export const portfolioItems: PortfolioItem[] = [
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

export const contactItems: ContactItem[] = [
  {
    title: "GitHub",
    link: "https://github.com/udbhavbalaji",
    type: "github",
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/udbhav-balaji",
    type: "linkedin",
  },
  {
    title: "Email",
    link: "mailto:udbhavbalaji@gmail.com",
    type: "email",
  },
];
