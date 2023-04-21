import {
  FormEvent,
  useState,
  ChangeEvent,
  useContext,
  FormEventHandler,
  ChangeEventHandler,
  useEffect,
} from "react";
import { Input } from "../Form/Input/Input";
import Button from "../Form/Button";

import Label from "../Form/Label";
import { IColumn } from "../../models/Column";

import { AiOutlineClose } from "react-icons/ai";

import { BoardsContext } from "../../contexts/BoardContext";
import { ISubtask } from "../../models/Subtask";
import { Textarea } from "../Form/Input/Textarea";
import { ITask } from "../../models/Task";
import { IBoard } from "../../models/Board";

type Props = {
  callback: () => void;
  type: "edit" | "create";
  initialForm?: Form;
  board: IBoard;
  columnId: undefined | string;
};

type Form = {
  id?: string;
  columnId: string;
  title: string;
  description?: string;
  subTasks: ISubtask[];
};

const INITIAL_FORM: Form = {
  title: "",
  description: "",
  subTasks: [],
  columnId: "",
};

export function TaskForm({
  callback,
  initialForm = INITIAL_FORM,
  type,
  board,
  columnId,
}: Props) {
  const [form, setForm] = useState<Form>(initialForm);

  const { addBoard, updateBoard, selectedBoard } = useContext(BoardsContext);

  console.log({ columnId });

  function handleChange(target: any) {
    //const { target } = event;

    console.log(board);

    if (target.name === "subTask") {
      console.log(target.value);
      const subTasks: ISubtask[] = form.subTasks.map((s) =>
        s.id == target.id ? { ...s, title: target.value } : s
      );
      setForm((f) => ({ ...f, subTasks }));
      return;
    }

    setForm((f) => ({ ...f, [target.id]: target.value }));
  }

  function handleAddSubTask() {
    const subTask: ISubtask = {
      id: crypto.randomUUID(),
      title: "",
      done: false,
    };
    setForm((f) => ({ ...f, subTasks: [...f.subTasks, subTask] }));
  }

  function handleRemoveSubTask(id: string) {
    const subTasks = form.subTasks.filter((s) => s.id != id);
    setForm((f) => ({ ...f, columns: [...subTasks] }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ form });
    const column = selectedBoard?.columns.find((c) => c.id == form.columnId);

    if (form.title.trim() && column != undefined) {
      const cols = selectedBoard?.columns.map((c) =>
        c.id == column.id ? column : c
      );
      const subs = form.subTasks.filter((s) => s.title.trim().length > 0);

      const t: ITask = {
        subTasks: subs,
        title: form.title,
        id: form.id! || crypto.randomUUID(),
        description: form.description,
      };

      column.tasks.push(t);

      updateBoard({ ...selectedBoard!, columns: cols! });

      console.log(form);
      if (type == "create") {
      } else {
        const t: ITask = {
          subTasks: form.subTasks,
          title: form.title,
          id: crypto.randomUUID(),
        };
        column.tasks.push(t);

        //updateBoard({...selectedBoard!});
      }

      callback();
    }
  }

  console.log(form);

  useEffect(() => {
    if (columnId) {
      setForm((f) => ({ ...f, columnId }));
    }
  }, []);

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        label="Title"
        placeholder="e.g. Web Design"
        id="title"
        value={form.title}
        onChange={({ target }) => handleChange(target)}
      />

      <Textarea
        label="Description"
        placeholder="e.g. We need to make some change in the..."
        id="description"
        value={form.description}
        onChange={({ target }) => handleChange(target)}
      />

      <Label>
        Column
        <select
          className="dark:bg-gray-700  w-full  h-10 p-2 rounded-[.25rem] outline outline-[2px] outline-offset-0 outline-gray-500 focus:outline-[3px]  focus:outline-blue-500 transition-colors"
          defaultValue={columnId ?? form.columnId}
          id="columnId"
          onChange={({ target }) => handleChange(target)}
        >
          <option value="" disabled>
            Select
          </option>
          {board.columns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Label>

      <Label>Sub Tasks</Label>
      {form.subTasks.map((s) => (
        <div key={s.id} className="flex gap-2">
          <Input
            name="subTask"
            id={s.id}
            placeholder="e.g. Doing"
            value={s.title}
            onChange={({ target }) => handleChange(target)}
          />
          <Button
            className="bg-transparent text-zinc-500 max-w-min p-[0px] px-[0rem] hover:bg-transparent hover:text-red-600"
            onClick={() => handleRemoveSubTask(s.id!)}
          >
            <AiOutlineClose size={28} />
          </Button>
        </div>
      ))}

      <Button
        className="bg-zinc-100 text-blue-500  hover:bg-zinc-50"
        type="button"
        onClick={handleAddSubTask}
      >
        + Add New Sub Task
      </Button>
      <Button type="submit">{type == "create" ? "Create" : "Save"}</Button>
    </form>
  );
}
