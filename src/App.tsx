import { MouseEvent } from "react";
import "./App.scss";
import Modal from "./components/Modal";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      className="flex bg-gray-900 h-screen min-h-screen w-screen max-w-[100wh]  text-gray-100"
      onClick={() => {}}
    >
      {/* <Sidebar /> */}
      <Outlet />
    </div>
  );
}

export default App;
