import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLLabelElement> & {};

export default function Label({ children, className = "", ...props }: Props) {
  return (
    <label
      className={
        "flex flex-col gap-1 dark:text-gray-400 font-semibold " + className
      }
      {...props}
    >
      {children}
    </label>
  );
}
