import { useEffect, useState } from "react";
import api from "../reqapi/axios";
import Pagination from "../component/Pagination";
import type { userAllData } from "../type/typeuserpage";
import { getTodayThai } from "../until/timethai";
import { dayToMonth, formatDate } from "../until/daytomounth";
import ModelAddress from "../modelglobla/ModelAddress";

export default function User() {
  const [users, setUsers] = useState<userAllData[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(getTodayThai());
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(
          `/users/new-user-day?date=${date}&page=${page}&limit=${limit}`
        );
        setUsers(res.data.data);
        setTotal(res.data.total);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [page, date, limit]);

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <h2 className="text-xl font-light mb-3">ลูกค้าใหม่ในแต่ละวัน</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setPage(1);
        }}
        className="border px-3 py-2 rounded-md mb-4"
      />
      <div className="w-full max-w-4xl">
        <div className="h-[700px] overflow-y-auto space-y-3 pr-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>ID: {u.id}</span>
                <span className="text-green-600 font-medium">{u.status}</span>
              </div>
              <div className="font-semibold text-gray-800 text-lg">
                {u.first_name} {u.last_name}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                <div className="flex flex-col gap-1">
                  <div>📞 {u.tel}</div>
                  <div
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setSelectedUserId(u.id)}
                  >
                    🏠 ที่อยู่
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div>📧 {u.email}</div>
                  <div className="font-mono">🪪 {u.national_id}</div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded-md border text-sm text-gray-700 space-y-1">
                <div className="font-semibold text-blue-600">
                  ชื่อแพ็กเกจ : 📦 {u.name_package}
                </div>
                <div> ราคา : 💰 {Number(u.price).toLocaleString()} บาท</div>
                <div>📅 เริ่ม: {formatDate(u.start_date)}</div>
                <div>📅 สิ้นสุด: {formatDate(u.end_date)}</div>
                <div>⏳ ระยะเวลา: {dayToMonth(u.duration_days)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Pagination
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
          />
        </div>
      </div>
      {selectedUserId && (
        <ModelAddress
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}
