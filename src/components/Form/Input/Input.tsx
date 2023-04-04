import { HTMLAttributes, HTMLProps } from "react";
import Label from "../Label";

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, ...props }: Props) {
  const className =
    "dark:bg-gray-700 w-full  h-10 p-2 text-white rounded-[.25rem] outline outline-[2px] outline-offset-0 outline-gray-500 focus:outline-[3px]  focus:outline-blue-500 transition-colors";
  if (label) {
    return (
      <Label>
        {label}
        <input className={className} type="text" {...props} />
      </Label>
    );
  }

  return <input className={className} type="text" {...props} />;
}
