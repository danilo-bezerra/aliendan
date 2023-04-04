import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home } from "../pages/Home";
import App from "../App";
import Board from "../pages/Board";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />}>
          <Route path=":id" element={<Board />} />
        </Route>
      </Route>
    </Route>
  )
);

export function Routes() {
  return <RouterProvider router={router} />;
}
