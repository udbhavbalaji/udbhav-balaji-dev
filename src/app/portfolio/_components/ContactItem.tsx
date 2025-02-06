import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { ContactItem } from "@/types/portfolio";
import { HiOutlineMail } from "react-icons/hi";

export default function ({
  title,
  link,
  type,
  index,
}: ContactItem & { index: number }) {
  return (
    <a
      href={link}
      className="mx-auto w-full text-stone-500 hover:text-black hover:dark:text-stone-200"
      key={index}
    >
      <div className="mx-auto flex h-8 w-11/12 items-center border border-stone-500 text-center hover:border-black dark:border-stone-500 hover:dark:border-stone-200">
        <span className="mx-auto flex items-center">
          <span className="mr-1 px-1 py-1">
            {type === "github" ? (
              <FaGithub />
            ) : type === "email" ? (
              <HiOutlineMail />
            ) : (
              <FaLinkedin />
            )}
          </span>{" "}
          <p className="mx-auto">{title}</p>
        </span>
      </div>
    </a>
  );
}
