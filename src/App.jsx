import { MainRoutes } from "./routes/router";
import "./index.css";
import { BrowserRouter as Routes } from "react-router-dom";
export function App() {
  return (
    <Routes>
      <MainRoutes />
    </Routes>
  );
}
