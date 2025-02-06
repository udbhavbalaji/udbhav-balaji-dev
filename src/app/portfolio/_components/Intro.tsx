import { introData } from "@/app/portfolio/_resources";

export default function Intro() {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center">
      <div className="flex flex-col items-center justify-center pb-10 pt-40 text-center">
        <p className="mb-2 text-base font-semibold md:text-xl">Hi there! I'm</p>
        <h1 className="mb-1 text-4xl font-semibold md:mb-3 md:text-7xl">
          {introData.name}
        </h1>
        <p className="mb-3 text-base font-medium md:text-xl">
          {introData.roles}
        </p>
        <p className="mb-6 max-w-xl text-sm font-bold">{introData.bio}</p>
      </div>
    </div>
  );
}
