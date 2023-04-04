import React from "react";
import { Input } from "../components/Form/Input/Input";
import { Textarea } from "../components/Form/Input/Textarea";
import { CreateBoardFrom } from "../components/Forms/CreateBoardFrom";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

type Props = {};

export function Home({}: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
