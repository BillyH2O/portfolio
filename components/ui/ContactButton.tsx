import Link from "next/link";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  rounded?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ContactButton = ({ 
  rounded = false,
  className,
  children = "Contact"
}: ContactButtonProps) => {
  const baseStyles = "bg-foreground hover:bg-foreground/95 hover:text-primary text-background px-4 py-2 cursor-pointer transition-colors duration-300 inline-flex items-center justify-center";
  const borderStyles = rounded ? "rounded-full" : "rounded-md";

  return (
    <Link 
      href="/contact" 
      className={cn(baseStyles, borderStyles, className)}
    >
      {children}
    </Link>
  );
};
