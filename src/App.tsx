import { Route, Routes } from "react-router";
import { BookPage, HomePage, NotFoundPage } from "./components/pages";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} index element={<HomePage />} />
      <Route path={ROUTES.BOOK} element={<BookPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
