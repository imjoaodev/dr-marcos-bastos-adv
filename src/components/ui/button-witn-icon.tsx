import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonWithIcon({ children, className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <Button
      asChild
      size={null}
      className={cn(
        "group relative min-h-12 w-fit cursor-pointer overflow-hidden rounded-full ps-6 pe-14 font-semibold",
        "motion-safe:transition-all motion-safe:duration-500",
        "motion-safe:hover:ps-14 motion-safe:hover:pe-6 motion-safe:focus-visible:ps-14 motion-safe:focus-visible:pe-6",
        className,
      )}
    >
      <a {...props}>
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden="true"
          className="absolute right-1 flex size-10 items-center justify-center rounded-full bg-background text-foreground motion-safe:transition-all motion-safe:duration-500 motion-safe:group-hover:right-[calc(100%-44px)] motion-safe:group-hover:rotate-45 motion-safe:group-focus-visible:right-[calc(100%-44px)] motion-safe:group-focus-visible:rotate-45"
        >
          <ArrowUpRight size={16} />
        </span>
      </a>
    </Button>
  );
}
