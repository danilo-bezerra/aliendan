import React, { useContext, useState } from "react";
import { Logo } from "./Logo";
import { BoardsContext } from "../contexts/BoardContext";
import Modal from "./Modal";

import { MdOutlineSpaceDashboard, MdOutlineAdd } from "react-icons/md";
import { zinc, gray } from "tailwindcss/colors";
import { Input } from "./Form/Input/Input";
import Label from "./Form/Label";
import Button from "./Form/Button";
import { CreateBoardFrom } from "./Forms/CreateBoardFrom";
import { NavLink } from "react-router-dom";

type Props = {};

export function Sidebar({}: Props) {
  const { boards, selectedBoard, selectBoard } = useContext(BoardsContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <aside className="min-w-[300px] max-w-[300px] h-screen p-8 dark:bg-gray-800 text-gray-400">
      <Logo />
      <div className="my-12">
        <div className="font-semibold text-sm tracking-wide">
          ALL BOARDS ({boards.length})
        </div>
        <ul>
          <li className="flex flex-col gap-1 py-4">
            {boards.map((b) => (
              <NavLink to={b.id} key={b.id}>
                <Button
                  className={`items-start bg-transparent px-[0px] capitalize hover:bg-transparent hover:text-blue-500 h-10 ${
                    b.id === selectedBoard?.id ? "text-blue-500" : ""
                  }`}
                  onClick={() => selectBoard(b)}
                >
                  <MdOutlineSpaceDashboard
                    size={32}
                    className="group-hover:text-blue-500"
                  />
                  <span className="w-full text-left text-[16px]">
                    {b.title}
                  </span>
                </Button>
              </NavLink>
            ))}
            <button
              className="flex items-center w-full  gap-3 py-4 text-blue-300 hover:text-blue-500 group"
              onClick={() => setShowModal(true)}
            >
              <MdOutlineAdd size={20} />
              <span className="font-semibold text-[16px] ">
                Create New Board
              </span>
            </button>
          </li>
        </ul>
      </div>

      {showModal && (
        <Modal
          title="Add New Board"
          isActive={showModal}
          onClose={() => setShowModal(false)}
        >
          <CreateBoardFrom callback={() => setShowModal(false)} />
        </Modal>
      )}
    </aside>
  );
}
