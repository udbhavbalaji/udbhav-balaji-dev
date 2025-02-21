// import Link from "next/link";
//
// import { HydrateClient } from "@/trpc/server";
//
// export default async function Home() {
//   return (
//     <HydrateClient>
//       <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//         <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
//           <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//             Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//           </h1>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//             <Link
//               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//               href="https://create.t3.gg/en/usage/first-steps"
//               target="_blank"
//             >
//               <h3 className="text-2xl font-bold">First Steps →</h3>
//               <div className="text-lg">
//                 Just the basics - Everything you need to know to set up your
//                 database and authentication.
//               </div>
//             </Link>
//             <Link
//               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//               href="https://create.t3.gg/en/introduction"
//               target="_blank"
//             >
//               <h3 className="text-2xl font-bold">Documentation →</h3>
//               <div className="text-lg">
//                 Learn more about Create T3 App, the libraries it uses, and how
//                 to deploy it.
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </HydrateClient>
//   );
// }
//
//
// import { redirect } from "next/navigation";
//
// export default function Home() {
//   redirect("/portfolio");
// }
//
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { navbarItems, portfolioItems } from "@/app/portfolio/_resources";
import FooterNote from "./_components/FooterNote";
import PortfolioItem from "./portfolio/_components/PortfolioItem";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 font-portfolioFont text-stone-100">
      <Navbar />
      <hr className="border-5 mx-10 my-5 border-green-400 px-4 py-3" />
      <div className="flex w-full flex-col items-center justify-center gap-12 bg-gradient-to-b from-gray-900 to-[#023020] px-4 py-16">
        <Profile />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-12 bg-gradient-to-b from-[#023020] to-gray-900 px-4 py-16">
        <Projects />
      </div>
      <FooterNote className="text-sm font-semibold text-gray-500" />
    </main>
  );
}

function Projects() {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center">
      <h2 className="mx-auto flex w-9/12 flex-row text-2xl font-bold underline decoration-4 underline-offset-8">
        Projects
      </h2>
      <div className="my-5 grid w-9/12 grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {/*}<Link
          href=""
          className="flex max-w-lg flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
        >
          <h3 className="text-2xl font-bold">Project Name: "Hello"</h3>
        </Link>
        <Link
          href=""
          className="flex max-w-lg flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
        >
          <h3 className="text-2xl font-bold">Project Name: "Hello"</h3>
        </Link>
        <Link
          href=""
          className="flex max-w-lg flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
        >
          <h3 className="text-2xl font-bold">Project Name: "Hello"</h3>
        </Link>*/}

        {portfolioItems.map((project, idx) => (
          <ProjectItem
            key={idx}
            project={project as unknown as ProjectItemProps}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectItemProps {
  title: string;
  imgUrl: string;
  stack: string;
  techSkills: string[];
  description: string;
  link: string;
}

function ProjectItem({ project }: { project: ProjectItemProps }) {
  return (
    <>
      <Link
        href={project.imgUrl}
        className="flex max-w-lg flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
      >
        <h3 className="text-2xl font-bold">{project.title}</h3>

        <p className="flex flex-wrap items-center justify-start text-xs text-green-400">
          {project.techSkills.map((skill) => (
            <span
              key={skill}
              className="mx-1 inline-flex rounded-md border-2 border-green-400 p-1"
            >
              {skill}
            </span>
          ))}
        </p>

        <p className="flex flex-wrap items-center justify-start text-sm">
          {project.description}
        </p>
      </Link>
    </>
  );
}

// function Projects() {
//   return (
//     <div className="container mx-auto flex w-full flex-wrap items-center justify-center px-6 py-20">
//       <h2 className="mx-auto flex w-9/12 flex-row text-2xl font-bold underline decoration-4 underline-offset-8">
//         Projects
//       </h2>
//       {/*<div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
//         {portfolioItems.map((project, idx) => (
//           <ProjectItem project={project} />
//         ))}
//       </div>*/}
//       <div className="lg-grid-cols-2 mt-10 grid grid-cols-1">
//         <div className="text-red-500">Items</div>
//         <div className="text-red-500">Items</div>
//         <div className="text-red-500">Items</div>
//         <div className="text-red-500">Items</div>
//         <div className="text-red-500">Items</div>
//       </div>
//     </div>
//   );
// }

function Profile() {
  // return <div></div>;
  return (
    <div className="container mx-auto my-20 flex flex-wrap items-center justify-center">
      <p className="mx-auto mb-2 w-full text-center text-lg font-semibold md:text-2xl">
        Hi there! I'm
      </p>
      <h1 className="mx-auto mb-1 w-full text-center text-8xl font-semibold md:mb-3 md:text-8xl">
        Udbhav Balaji
      </h1>
      <p className="mx-auto mb-3 w-full text-center text-lg font-medium md:text-2xl">
        Software Engineer & Data Analyst
      </p>
      {/*<p className="text-md mb-20 w-full max-w-3xl text-center font-bold">
        Welcome to my digital playground, where code meets creativity! I'm a
        software engineer who loves turning data into stories and ideas into
        reality. Whether it's building dynamic applications or uncovering
        insights hidden in data, I bring a blend of technical prowess and
        innovative thinking to every project. Explore my work, and let's connect
        to discuss exciting opportunities!
      </p>*/}
      <p className="text-md mb-20 mt-10 w-full max-w-3xl text-center font-bold">
        Welcome to my portfolio! Here are the projects I have built with my
        various technical skills. I'm always excited to learn new things and
        work on exciting projects. Check out my work and feel free to give me
        feedback!
      </p>
    </div>
  );
}

function Navbar() {
  return (
    <div className="left-0 top-0 z-20 bg-inherit pt-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="my-auto mr-3 flex items-center self-center text-2xl font-semibold">
          <a className="hover:text-white" href="">
            UB
          </a>
        </div>
        <div>
          <ul className="text-md inline-flex font-medium">
            <li className="mx-8 my-2">
              <Link href="#projects" className="hover:text-green-400">
                Projects
              </Link>
            </li>

            <li className="mx-8 my-2">
              <Link
                href="public/assets/documents/Udbhav Balaji Resume SD.pdf"
                className="hover:text-green-400"
                download="Udbhav_Balaji_Resume.pdf"
              >
                Resume
              </Link>
            </li>

            <li className="my-1 ml-8 w-full justify-between gap-4">
              <div className="mx-5 inline-flex h-6 w-6 rounded-full">
                <Link
                  href="https://github.com/udbhavbalaji"
                  className="rounded-full text-2xl hover:text-green-400"
                >
                  <FaGithub />
                </Link>
              </div>

              <div className="mx-5 inline-flex h-6 w-6 rounded-full">
                <Link
                  href="https://linkedin.com/in/udbhav-balaji"
                  className="text-2xl hover:text-green-400"
                >
                  <FaLinkedin />
                </Link>
              </div>

              <div className="ml-5 inline-flex h-6 w-6 rounded-full">
                <Link
                  href="mailto:udbhavbalaji@gmail.com"
                  className="text-2xl hover:text-green-400"
                >
                  <FaRegEnvelope />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
