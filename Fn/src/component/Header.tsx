import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 text-black">
        <div className="text-lg font-bold tracking-wide">📡 ABC Mobile</div>
        <nav className="flex gap-4">
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-800 hover:bg-white/10 hover:text-black"
              }`
            }
          >
            ลูกค้าใหม่วันแต่ละวัน
          </NavLink>
          <NavLink
            to="/user-today"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-800 hover:bg-white/10 hover:text-black"
              }`
            }
          >
            ข้อมูลลูกค้าที่ใช้ในแต่ละวัน
          </NavLink>
        </nav>
        <div className="bg-blue-600 px-3 py-1 rounded-md text-xs font-medium">
          Admin Panel
        </div>
      </header>
      <hr className="text-gray-100" />
    </>
  );
}
