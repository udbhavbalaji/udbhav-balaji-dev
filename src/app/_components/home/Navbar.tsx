import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="left-0 top-0 z-20 bg-inherit pt-8">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="my-auto mr-3 flex items-center self-center text-2xl font-semibold">
          <Link className="hover:text-green-400" href="/">
            UB
          </Link>
        </div>
        <div>
          <ul className="text-md inline-flex font-medium">
            <li className="mx-8 my-2">
              <Link href="#projects" className="hover:text-green-400">
                Projects
              </Link>
            </li>

            <li className="mx-8 my-2">
              <a
                href="assets/documents/Udbhav Balaji Resume SD.pdf"
                className="hover:text-green-400"
                download="Udbhav_Balaji_Resume.pdf"
              >
                Resume
              </a>
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

export default Navbar;
