import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="text-white px-6 py-3 flex justify-around items-center bg-[#1a2b52]">
      <NavLink to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Logo Repository Skripsi" className="h-10 w-10 object-contain" />
        <h1 className="font-bold text-lg">Repository Skripsi Mahasiswa</h1>
      </NavLink>

      <div className="space-x-8">
        <NavLink to="/" className={({ isActive }) => `transition-all duration-200 font-bold ${isActive ? "text-[#be9c2e]" : "hover:text-[#be9c2e]"}`}>
          Home
        </NavLink>
        <NavLink to="/edit-skripsi" className={({ isActive }) => `transition-all duration-200 font-bold ${isActive ? "text-[#be9c2e]" : "hover:text-[#be9c2e]"}`}>
          Edit Skripsi
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
