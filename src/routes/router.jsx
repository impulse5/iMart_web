import { Routes, Route } from "react-router-dom";
import { Test } from "../screens/test";
import { Test2 } from "../screens/test2";

export function MainRoutes() {
  return(
      <Routes>
          <Route path="/" element={<Test />}/>
          <Route path="test2" element={<Test2/>}/>
      </Routes>
  )
}
