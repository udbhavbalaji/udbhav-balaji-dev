import { navbarItems } from "@/app/portfolio/_resources";

export type ThemeOptions = "light" | "dark";

interface NavbarProps {
  theme: ThemeOptions;
  themeSwitcher: () => void;
}

export default function Navbar({ theme, themeSwitcher }: NavbarProps) {
  const sun = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );

  const moon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );

  return (
    <div className="left-0 top-0 z-20 bg-inherit pt-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="mr-3 flex h-6 items-center self-center text-2xl font-semibold sm:h-9">
          <a className="hover:text-white" href="">
            UB
          </a>
          .
        </div>
        <div>
          <ul className="text-md inline-flex font-medium">
            {navbarItems.map((option, index) => (
              <li key={index} className="mx-4 my-2">
                {option.linkType === "static" ? (
                  <a
                    href={option.link}
                    download={option.downloadName}
                    title="Download my Resume!"
                  >
                    {option.display}
                  </a>
                ) : (
                  <a href={option.link}>{option.display}</a>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={themeSwitcher}
                className="mx-4 my-2 rounded-md bg-transparent text-xl text-stone-900 hover:bg-stone-300 hover:text-stone-900 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {theme === "dark" ? sun : moon}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
