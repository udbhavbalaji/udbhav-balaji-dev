"use client";

import { useState } from "react";
import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

import type { UpdatedNavbarProps } from "@/types";

function Navbar(props: UpdatedNavbarProps) {
  // function Navbar(props: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // NOTE: When trying to customize the styles for other websites, add the stringed version as well here so that the compiler has it in memory
  return (
    <>
      {/* Main Navbar */}
      {/*<nav className="fixed top-0 z-50 w-full bg-white shadow-lg">*/}
      <nav className={`left-0 top-0 z-20 bg-${props.styling.bg} py-8`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href={props.title.href}
              className={`font-${props.styling.title.font ?? "inherit"} text-2xl font-bold transition-colors duration-200 text-${props.styling.title.text} hover:text-${props.styling.title.hover}`}
            // className={`text-2xl font-bold text-spotifyGreen`}
            >
              {props.title.label}
              {/*props.title.label*/}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden space-x-8 md:flex">
              {props.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-${props.styling.item.font ?? "inherit"} mt-2 transition-colors duration-200 text-${props.styling.item.text} hover:text-${props.styling.item.hover}`}
                // className="mt-2 text-white transition-colors duration-200 hover:text-stone-100"
                >
                  {item.label}
                </Link>
              ))}

              {props.includeSocials && (
                <ul
                  className={`text-md inline-flex font-medium text-${props.styling.icon.text}`}
                >
                  <li className="my-1 ml-8 w-full justify-between gap-4">
                    <div className="mx-5 inline-flex h-6 w-6 rounded-full">
                      <Link
                        href="https://github.com/udbhavbalaji"
                        // className="rounded-full text-2xl text-stone-100 transition-colors duration-200 hover:text-red-600"
                        className={`rounded-full text-2xl transition-colors duration-200 hover:text-${props.styling.icon.hover}`}
                      >
                        <FaGithub />
                      </Link>
                    </div>

                    <div className="mx-5 inline-flex h-6 w-6 rounded-full">
                      <Link
                        href="https://linkedin.com/in/udbhav-balaji"
                        className={`rounded-full text-2xl transition-colors duration-200 hover:text-${props.styling.icon.hover}`}
                      >
                        <FaLinkedin />
                      </Link>
                    </div>

                    <div className="ml-5 inline-flex h-6 w-6 rounded-full">
                      <Link
                        href="mailto:udbhavbalaji@gmail.com"
                        className={`rounded-full text-2xl transition-colors duration-200 hover:text-${props.styling.icon.hover}`}
                      >
                        <FaRegEnvelope />
                      </Link>
                    </div>
                  </li>
                </ul>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`transition-colors duration-200 text-${props.styling.icon.text} hover:text-${props.styling.icon.hover} md:hidden`}
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-70"
          onClick={toggleSidebar}
        />

        {/* Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full w-64 transform bg-inherit transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close Button */}
          <button
            className={`absolute right-4 top-4 transition-colors duration-200 text-${props.styling.icon.text} hover:text-${props.styling.icon.hover}`}
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Sidebar Navigation */}
          <nav className="mt-16 p-4">
            <div className="flex flex-col space-y-4">
              {props.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg text-${props.styling.item.text} transition-colors duration-200 hover:text-${props.styling.item.hover}`}
                  onClick={toggleSidebar}
                >
                  {item.label}
                </Link>
              ))}

              {props.includeSocials && (
                <ul className="text-md absolute bottom-5 inline-flex font-medium">
                  <li className="my-1 ml-8 w-full justify-between gap-4">
                    <div className="mx-5 inline-flex h-6 w-6 rounded-full">
                      <Link
                        href="https://github.com/udbhavbalaji"
                        className={`rounded-full text-2xl transition-colors duration-200 text-${props.styling.icon.text} hover:text-${props.styling.icon.hover}`}
                      >
                        <FaGithub />
                      </Link>
                    </div>

                    <div className="mx-5 inline-flex h-6 w-6 rounded-full">
                      <Link
                        href="https://linkedin.com/in/udbhav-balaji"
                        className={`rounded-full text-2xl transition-colors duration-200 text-${props.styling.icon.text} hover:text-${props.styling.icon.hover}`}
                      >
                        <FaLinkedin />
                      </Link>
                    </div>

                    <div className="ml-5 inline-flex h-6 w-6 rounded-full">
                      <Link
                        href="mailto:udbhavbalaji@gmail.com"
                        className={`rounded-full text-2xl transition-colors duration-200 text-${props.styling.icon.text} hover:text-${props.styling.icon.hover}`}
                      >
                        <FaRegEnvelope />
                      </Link>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="left-0 top-0 z-20 bg-inherit pt-8">
  //     <div className="container mx-auto flex flex-wrap items-center justify-between">
  //       <div className="my-auto mr-3 flex items-center self-center text-2xl font-semibold">
  //         <Link className="hover:text-green-400" href={props.titleHref}>
  //           {props.title}
  //         </Link>
  //       </div>
  //       <div>
  //         <ul className="text-md inline-flex font-medium">
  //           {items.map((item) => (
  //             <li key={item.label} className="mx-8 my-2">
  //               {item.download ? (
  //                 <a
  //                   href={item.href}
  //                   className="hover:text-green-400"
  //                   download={item.downloadName ?? "Download"}
  //                 >
  //                   {item.label}
  //                 </a>
  //               ) : (
  //                 <Link href={item.href} className="hover:text-green-400">
  //                   {item.label}
  //                 </Link>
  //               )}
  //             </li>
  //           ))}
  //
  //           {props.includeSocials ? (
  //             <li className="my-1 ml-8 w-full justify-between gap-4">
  //               <div className="mx-5 inline-flex h-6 w-6 rounded-full">
  //                 <Link
  //                   href="https://github.com/udbhavbalaji"
  //                   className="rounded-full text-2xl hover:text-green-400"
  //                 >
  //                   <FaGithub />
  //                 </Link>
  //               </div>
  //
  //               <div className="mx-5 inline-flex h-6 w-6 rounded-full">
  //                 <Link
  //                   href="https://linkedin.com/in/udbhav-balaji"
  //                   className="text-2xl hover:text-green-400"
  //                 >
  //                   <FaLinkedin />
  //                 </Link>
  //               </div>
  //
  //               <div className="ml-5 inline-flex h-6 w-6 rounded-full">
  //                 <Link
  //                   href="mailto:udbhavbalaji@gmail.com"
  //                   className="text-2xl hover:text-green-400"
  //                 >
  //                   <FaRegEnvelope />
  //                 </Link>
  //               </div>
  //             </li>
  //           ) : (
  //             <></>
  //           )}
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Navbar;

// LEGACY: Need to keep this code to reference what I have done
//
// function Navbar() {
//   return (
//     <div className="left-0 top-0 z-20 bg-inherit pt-8">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         <div className="my-auto mr-3 flex items-center self-center text-2xl font-semibold">
//           <Link className="hover:text-green-400" href="/">
//             UB
//           </Link>
//         </div>
//         <div>
//           <ul className="text-md inline-flex font-medium">
//             <li className="mx-8 my-2">
//               <Link href="#projects" className="hover:text-green-400">
//                 Projects
//               </Link>
//             </li>
//
//             <li className="mx-8 my-2">
//               <a
//                 href="assets/documents/Udbhav Balaji Resume SD.pdf"
//                 className="hover:text-green-400"
//                 download="Udbhav_Balaji_Resume.pdf"
//               >
//                 Resume
//               </a>
//             </li>
//
//             <li className="my-1 ml-8 w-full justify-between gap-4">
//               <div className="mx-5 inline-flex h-6 w-6 rounded-full">
//                 <Link
//                   href="https://github.com/udbhavbalaji"
//                   className="rounded-full text-2xl hover:text-green-400"
//                 >
//                   <FaGithub />
//                 </Link>
//               </div>
//
//               <div className="mx-5 inline-flex h-6 w-6 rounded-full">
//                 <Link
//                   href="https://linkedin.com/in/udbhav-balaji"
//                   className="text-2xl hover:text-green-400"
//                 >
//                   <FaLinkedin />
//                 </Link>
//               </div>
//
//               <div className="ml-5 inline-flex h-6 w-6 rounded-full">
//                 <Link
//                   href="mailto:udbhavbalaji@gmail.com"
//                   className="text-2xl hover:text-green-400"
//                 >
//                   <FaRegEnvelope />
//                 </Link>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
