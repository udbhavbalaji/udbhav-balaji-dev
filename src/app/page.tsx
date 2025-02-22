import Navbar from "@/app/_components/home/Navbar";
import Profile from "@/app/_components/home/Profile";
import Projects from "@/app/_components/home/Projects";
import FooterNote from "./_components/FooterNote";

export default async function Home() {
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
