import { FormEvent, useState, ChangeEvent, useContext } from "react";
import { Input } from "../Form/Input/Input";
import Button from "../Form/Button";

import Label from "../Form/Label";
import { IColumn } from "../../models/Column";

import { AiOutlineClose } from "react-icons/ai";
import { BoardsContext } from "../../contexts/BoardContext";

type Props = {
  callback: () => void;
};

type Form = {
  title: string;
  columns: IColumn[];
};

const INITIAL_FORM: Form = {
  title: "",
  columns: [],
};

export function CreateBoardFrom({ callback }: Props) {
  const [form, setForm] = useState<Form>(INITIAL_FORM);

  const { addBoard } = useContext(BoardsContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;

    if (target.name === "column") {
      const columns: IColumn[] = form.columns.map((c) =>
        c.id == target.id ? { ...c, name: target.value } : c
      );
      setForm((f) => ({ ...f, columns }));
      return;
    }

    setForm((f) => ({ ...f, [target.id]: target.value }));
  }

  function handleAddColumn() {
    const column: IColumn = { id: crypto.randomUUID(), name: "", tasks: [] };
    setForm((f) => ({ ...f, columns: [...f.columns, column] }));
  }

  function handleRemoveColumn(id: string) {
    const columns = form.columns.filter((c) => c.id != id);
    setForm((f) => ({ ...f, columns: [...columns] }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.title.trim()) {
      const cols = form.columns.filter((c) => c.name.trim().length > 0);
      addBoard(form.title, cols);

      callback();
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        label="Board Title"
        placeholder="e.g. Web Design"
        id="title"
        value={form.title}
        onChange={handleChange}
      />

      <Label>Board Columns</Label>
      {form.columns.map((c) => (
        <div key={c.id} className="flex gap-2">
          <Input
            name="column"
            id={c.id}
            placeholder="e.g. Doing"
            value={c.name}
            onChange={handleChange}
          />
          <Button
            className="bg-transparent text-zinc-500 max-w-min px-[0] hover:bg-transparent hover:text-red-600"
            onClick={() => handleRemoveColumn(c.id)}
          >
            <AiOutlineClose size={28} />
          </Button>
        </div>
      ))}
      <Button
        className="bg-zinc-100 text-blue-500  hover:bg-zinc-50"
        type="button"
        onClick={handleAddColumn}
      >
        + Add New Column
      </Button>
      <Button type="submit">Create Board</Button>
    </form>
  );
}
