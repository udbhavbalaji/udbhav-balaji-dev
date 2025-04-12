import Navbar from "@/app/_components/home/Navbar";
import Profile from "@/app/_components/home/Profile";
import Projects from "@/app/_components/home/Projects";
import FooterNote from "@/app/_components/FooterNote";
import { NavbarItem } from "@/types";

const navItems: NavbarItem[] = [
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Resume",
    href: "assets/documents/Udbhav Balaji Resume SD.pdf",
    download: true,
    downloadName: "Udbhav_Balaji_Resume.pdf",
  },
];

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 font-portfolioFont text-stone-100">
      <Navbar
        title={{
          label: "UB",
          href: "/",
        }}
        styling={{
          title: {
            text: "white",
            hover: "green-400",
          },
          bg: "inherit",
          item: {
            text: "white",
            hover: "green-400",
          },
          icon: {
            text: "white",
            hover: "green-400",
          },
        }}
        navItems={navItems}
        includeSocials={true}
      />
      <hr className="border-5 mx-10 border-green-400 px-4" />
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
