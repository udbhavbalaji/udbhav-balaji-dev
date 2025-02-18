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

import Link from "next/link";
import { navbarItems } from "@/app/portfolio/_resources";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 font-portfolioFont text-stone-100">
      <Navbar />
      <hr className="border-5 mx-10 my-5 border-green-400 px-4 py-3" />
      <Profile />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-12 bg-gradient-to-b from-gray-900 to-green-900 px-4 py-16">
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
        Home Page Home Page Home Page Home Page Home Page Home Page Home Page
      </div>
    </main>
  );
}

function Profile() {
  return <div></div>;
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
            {navbarItems.map((item, idx) => (
              <li key={idx} className="mx-8 my-2">
                {item.linkType === "static" ? (
                  <a
                    href={item.link}
                    download={item.downloadName}
                    title="Download my Resume!"
                    className="hover:text-green-400"
                  >
                    {item.display}
                  </a>
                ) : (
                  <a href={item.link} className="hover:text-green-400">
                    {item.display}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
