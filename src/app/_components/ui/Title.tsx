import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Title({ children, id, className }: TitleProps) {
  return (
    <h1 key={id} className={className ?? "text-3xl font-bold"}>
      {children}
    </h1>
  );
}
