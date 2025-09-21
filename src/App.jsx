import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import EditSkripsi from "./pages/EditSkripsi";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-skripsi" element={<EditSkripsi />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
