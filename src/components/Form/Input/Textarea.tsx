import { HTMLAttributes, HTMLProps } from "react";
import Label from "../Label";

type Props = HTMLProps<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, ...props }: Props) {
  const className =
    "dark:bg-gray-700 w-full  h-32 p-2 text-white rounded-[.25rem] outline outline-[2px] outline-offset-0 outline-gray-500 focus:outline-[3px]  focus:outline-blue-500 transition-colors";
  if (label) {
    return (
      <Label>
        {label}
        <textarea className={className} {...props} />
      </Label>
    );
  }

  return <textarea className={className} {...props} />;
}
