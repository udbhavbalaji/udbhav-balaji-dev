import { FooterNoteProps } from "@/types/portfolio";

export default function FooterNote({ className }: FooterNoteProps) {
  return (
    <div className="flex items-center justify-center">
      <p className={className}>© 2024 Udbhav Balaji</p>
    </div>
  );
}
