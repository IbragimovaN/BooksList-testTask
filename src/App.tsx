import { Route, Routes } from "react-router";
import { BookPage, HomePage } from "./components/pages";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<HomePage />} />
      <Route path="/:id" index element={<BookPage />} />
    </Routes>
  );
}

export default App;
