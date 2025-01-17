import { forwardRef, HTMLAttributes } from "react";

import { c } from "../utils";

export const CVEntryContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CVEntryContent({ children, className = "", ...props }, ref) {
  return (
    <div ref={ref} className={c("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
});

export const CVEntryContentTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CVEntryContentTitle({ children, className = "", ...props }, ref) {
  return (
    <p
      ref={ref}
      className={c("text-xl uppercase font-semibold", className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const CVEntryContentSmall = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CVEntryContentSmall({ children, className = "", ...props }, ref) {
  return (
    <p
      ref={ref}
      className={c("text-sm text-gray-700 italic font-light", className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const CVEntryList = forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(function CVEntryList({ children, className = "", ...props }, ref) {
  return (
    <ul ref={ref} className={c("list-disc list-inside", className)} {...props}>
      {children}
    </ul>
  );
});

export * from "./CVTemplate";
