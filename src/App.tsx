import { Route, Routes } from "react-router";
import { BookPage, HomePage, NotFoundPage } from "./components/pages";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<HomePage />} />
      <Route path="/:id" index element={<BookPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
