import { quiklistMonoFont, quiklistTitleFont } from "@/styles/fonts";

export default function QuiklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      // className={`min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950 text-white ${quiklistTitleFont.className}`}
      // className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900 ${quiklistTitleFont.className}`}
      // className={`min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-yellow-950 text-white ${quiklistTitleFont.className}`}
      className={`min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950 text-white ${quiklistTitleFont.className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          {/* <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-600 opacity-10 mix-blend-multiply blur-3xl filter"></div>
          <div className="opacity-8 absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-blue-600 mix-blend-multiply blur-3xl filter delay-1000"></div>
          <div className="opacity-6 delay-2000 absolute bottom-1/4 left-1/2 h-80 w-80 animate-pulse rounded-full bg-indigo-600 mix-blend-multiply blur-3xl filter"></div> */}
          {/* <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-orange-400 opacity-10 mix-blend-multiply blur-3xl filter"></div>
          <div className="opacity-8 absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-amber-400 mix-blend-multiply blur-3xl filter delay-1000"></div>
          <div className="opacity-6 delay-2000 absolute bottom-1/4 left-1/2 h-80 w-80 animate-pulse rounded-full bg-yellow-400 mix-blend-multiply blur-3xl filter"></div> */}
          {/* <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-orange-600 opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="opacity-8 absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-amber-600 mix-blend-multiply blur-3xl filter delay-1000"></div>
          <div className="opacity-6 delay-2000 absolute bottom-1/4 left-1/2 h-80 w-80 animate-pulse rounded-full bg-yellow-600 mix-blend-multiply blur-3xl filter"></div> */}
          {/* <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-slate-700 opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="opacity-8 absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-gray-700 mix-blend-multiply blur-3xl filter delay-1000"></div>
          <div className="opacity-6 delay-2000 absolute bottom-1/4 left-1/2 h-80 w-80 animate-pulse rounded-full bg-slate-800 mix-blend-multiply blur-3xl filter"></div> */}
          <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-600 opacity-20 mix-blend-multiply blur-3xl filter"></div>
          <div className="opacity-8 absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-cyan-600 mix-blend-multiply blur-3xl filter delay-1000"></div>
          <div className="opacity-6 delay-2000 absolute bottom-1/4 left-1/2 h-80 w-80 animate-pulse rounded-full bg-indigo-600 mix-blend-multiply blur-3xl filter"></div>
        </div>
      </div>

      {children}
    </div>
  );
}
