import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { QuestionsPage } from "./pages/QuestionsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questoes" element={<QuestionsPage />} />
      </Routes>
    </>
  );
}

export default App