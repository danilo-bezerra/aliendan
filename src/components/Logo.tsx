import { FcBarChart } from "react-icons/fc";

import LogoImg from "../assets/images/clipper2.png";

type Props = {};

export function Logo({}: Props) {
  return (
    <div className="flex items-center gap-1">
      {/* <FcBarChart size={40} /> */}
      <img src={LogoImg} alt="" className="w-10 mr-1" />
      <span className="text-4xl font-semibold  dark:text-zinc-100">
        Clipper
      </span>
    </div>
  );
}
