import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SessionCardProps {
  title: string;
  description?: string;
  link: string;
  variant?: "oral" | "poster" | "vision" | "industry";
  icon?: React.ReactNode;
}

const variantStyles = {
  oral: "bg-[hsl(217,91%,95%)] border-primary/30 hover:border-primary",
  poster: "bg-[hsl(142,76%,95%)] border-[hsl(142,76%,50%)]/30 hover:border-[hsl(142,76%,50%)]",
  vision: "bg-[hsl(35,100%,95%)] border-accent/30 hover:border-accent",
  industry: "bg-[hsl(340,82%,95%)] border-[hsl(340,82%,50%)]/30 hover:border-[hsl(340,82%,50%)]",
};

export function SessionCard({
  title,
  description,
  link,
  variant = "oral",
  icon,
}: SessionCardProps) {
  return (
    <Link
      to={link}
      className={cn(
        "group flex flex-col rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-lg",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-sm">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
