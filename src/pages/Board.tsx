import { useContext, useEffect, useState } from "react";

import { BoardsContext } from "../contexts/BoardContext";
import Button from "../components/Form/Button";
import BoardColumn from "../components/BoardColumn";

import { MdOutlineSpaceDashboard, MdOutlineAdd } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../components/Modal";
import { BoardFrom } from "../components/Forms/BoardForm";
import { TaskForm } from "../components/Forms/TaskForm";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

export default function Board({}: Props) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>()

  const { selectedBoard, selectBoard, getBoardById } =
    useContext(BoardsContext);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const b = getBoardById(id!);
    if (b) {
      console.log("achei");
      selectBoard(b);
    } else {
      navigate("/");
    }
  }, []);

  console.log(selectedBoard);

  return (
    <div className="grid grid-cols-1">
      <header className="flex  justify-between items-center  bg-gray-800 p-4 border border-zinc-600 max-h-[80px]">
        <h2 className="font-semibold text-2xl">{selectedBoard?.title}</h2>
        <div className="flex items-center gap-2">
          <Button
            className="max-w-max "
            onClick={() => setShowAddTaskForm(true)}
          >
            Add New Task
          </Button>
          <Button className="bg-transparent hover:bg-transparent px-[0px] max-w-min">
            <HiOutlineDotsVertical size={28} />
          </Button>
        </div>
      </header>
      <section className="flex-1 flex gap-8 min-w-full max-w-full p-4 overflow-scroll h-full min-h-[calc(100vh-80px)]">
        {selectedBoard?.columns.map((c) => (
          <BoardColumn
            key={c.id}
            col={c}
            onAddTask={() => {setShowAddTaskForm(true); setSelectedColumn(c.id)}}
          />
        ))}
        <div className="bg-zinc-700/10 w-60 rounded-md">
          <Button
            className="h-full rounded-none bg-transparent text-xl hover:bg-transparent hover:text-blue-500 min-w-[240px]"
            onClick={() => setShowEditForm(true)}
          >
            <MdOutlineAdd size={32} /> New Column
          </Button>
        </div>
      </section>
      {showEditForm && (
        <Modal
          isActive={showEditForm}
          onClose={() => setShowEditForm(false)}
          title="Edit Board"
        >
          <BoardFrom
            callback={() => setShowEditForm(false)}
            type="edit"
            initialForm={selectedBoard!}
          />
        </Modal>
      )}

      {showAddTaskForm && (
        <Modal
          isActive={showAddTaskForm}
          onClose={() => setShowAddTaskForm(false)}
          title="Add Task"
        >
          <TaskForm
            callback={() => setShowAddTaskForm(false)}
            type="create"
            board={selectedBoard!}
            columnId={selectedColumn}
          />
        </Modal>
      )}
    </div>
  );
}
