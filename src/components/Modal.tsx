import React, { MouseEvent, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  isActive: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({
  title,
  onClose,
  className = "",
  children,
}: Props) {
  return (
    <div
      className="fixed top-0 left-0 flex items-center w-screen h-screen overflow-y-scroll bg-zinc-700/30 p-8 z-10"
      onClick={onClose}
    >
      <section
        id="modal"
        className={
          "max-w-[480px] w-full max-h-max mx-auto p-8 rounded-md dark:bg-neutral-800 dark:text-zinc-100 " +
          className
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-xl ">{title}</h2>
          <button
            className="text-gray-400 hover:text-red-500 text-2xl transition-colors"
            onClick={onClose}
          >
            X
          </button>
        </header>

        {children}
      </section>
    </div>
  );
}
