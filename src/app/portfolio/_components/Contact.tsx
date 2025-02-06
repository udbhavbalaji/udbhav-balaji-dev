import Title from "@/app/_components/ui/Title";
import { contactItems } from "@/app/portfolio/_resources";
import ContactItem from "@/app/portfolio/_components/ContactItem";

export default function Contact() {
  return (
    <div>
      <div className="container relative mx-auto my-16 flex flex-wrap items-center justify-center">
        <div className="absolute top-0 w-full py-1">
          <Title
            id="contact"
            className={
              "mx-auto w-9/12 text-2xl font-bold underline decoration-4 underline-offset-8"
            }
          >
            Contact
          </Title>
        </div>
        <div className="my-24 inline-grid w-9/12 grid-cols-3 items-center justify-between">
          {contactItems.map((item, index) => (
            <ContactItem
              title={item.title}
              link={item.link}
              type={item.type}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
