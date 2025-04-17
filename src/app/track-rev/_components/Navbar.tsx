import { navbarItems } from "@/app/track-rev/_resources";
import Link from "next/link";

// LEGACY: Newer general purpose navbar being used. Keeping for reference
export default function Navbar() {
  return (
    <div className="left-0 top-0 z-20 bg-black py-8 font-trackRevTitleFont text-red-600">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="font-TrackRevWideFont mr-3 flex h-6 items-center self-center text-4xl font-semibold sm:h-9">
          <Link href="/track-rev" className="hover:text-red-700">
            TR
          </Link>
        </div>
        <div>
          <ul className="inline-flex text-sm font-medium">
            {navbarItems.map((item, index) => (
              <li key={index} className="mx-4 my-2">
                {item.linkType === "route" ? (
                  <Link href={item.link} className="hover:text-red-700">
                    {item.title}
                  </Link>
                ) : (
                  <a href={item.link} className="hover:text-red-700">
                    {item.title}
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
