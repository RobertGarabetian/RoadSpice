import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Landing from "./Landing";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);
export default App;
