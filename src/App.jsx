import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DataSkripsi from "./pages/DataSkripsi";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data-skripsi" element={<DataSkripsi />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
