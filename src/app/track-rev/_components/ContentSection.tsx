import useTitle from "@/app/track-rev/_hooks/useTitle";

export default function ContentSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { title } = useTitle();

  return (
    <div className="flex-grow">
      <div className="my-15 container relative mx-auto flex w-9/12 flex-wrap items-center justify-center rounded-lg">
        <h2 className="font-trackRevTitleFont mx-auto mb-4 mt-10 w-full text-center text-4xl font-semibold">
          {title}
        </h2>
        {children ?? <></>}
      </div>
    </div>
  );
}
