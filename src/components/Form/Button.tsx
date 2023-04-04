import { HtmlHTMLAttributes } from "react";

type Props = HtmlHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({
  children,
  className = "",
  type,
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`flex gap-2 items-center justify-center bg-blue-500  h-11 w-full px-6 font-semibold text-[14px] rounded-full  transition-colors ${className} hover:bg-blue-400`}
      {...props}
    >
      {children}
    </button>
  );
}
