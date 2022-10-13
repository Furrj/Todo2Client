import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllTodos from "./views/AllTodos";

const App = () => {
  return (
    <div>
      <h1>Todo 2.0</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllTodos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
