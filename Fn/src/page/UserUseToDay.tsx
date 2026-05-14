import { useEffect, useState } from "react";
import api from "../reqapi/axios";
import Pagination from "../component/Pagination";
import { getTodayThai } from "../until/timethai";
import { formatDateTime } from "../until/daytomounth";
import type { userPackageToday } from "../type/typeuserpage";

export default function TodayUsage() {
  const [data, setData] = useState<userPackageToday[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(getTodayThai());
  const [search, setSearch] = useState({
    firstName: "",
    lastName: "",
    date: getTodayThai(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/package/today?first_name=${search.firstName}&last_name=${search.lastName}&date=${search.date}&page=${page}&limit=${limit}`
        );
        setData(res.data.data);
        setTotal(res.data.total);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, search]);

  console.log(data);
  return (
    <div className="w-full p-4 flex flex-col items-center">
      <h2 className="text-xl font-light mb-4">📊 การใช้งานวันนี้</h2>
      <div className="flex gap-3 mb-4 flex-wrap justify-center items-center">
        <input
          placeholder="ชื่อ"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <input
          placeholder="นามสกุล"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={() => {
            setSearch({ firstName, lastName, date });
            setPage(1);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          🔍 ค้นหา
        </button>
        <button
          onClick={() => {
            setFirstName("");
            setLastName("");
            setDate(getTodayThai());
            setSearch({
              firstName: "",
              lastName: "",
              date: getTodayThai(),
            });
            setPage(1);
          }}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          ♻️ รีเซ็ต
        </button>
      </div>
      <div className="w-full max-w-5xl">
        <div className="h-[650px] overflow-y-auto space-y-2 pr-2">
          {data.map((u, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-2 items-center p-3 border rounded-md bg-white shadow-sm text-sm"
            >
              <div>
                <div className="font-semibold">
                  {u.first_name} {u.last_name}
                </div>
                <div className="text-xs text-gray-400">ID: {u.user_id}</div>
              </div>
              <div>
                <div>📶 ใช้เน็ต</div> <div>{u.total_call ? `` : "Limited"}</div>
                <div className="text-gray-600">
                  {formatBytes(u.used_internet_bytes)}
                </div>
              </div>
              <div>
                <div>📞 โทร</div>{" "}
                <div>{u.total_internet_bytes ? `` : "Limited"}</div>
                <div className="text-gray-600">{u.used_call ?? 0} นาที</div>
              </div>
              <div className="text-right text-xs text-gray-400">
                {formatDateTime(u.created_at)}
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="text-center text-gray-400 mt-10">ไม่มีข้อมูล</div>
          )}
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
    </div>
  );
}

/* helper */
function formatBytes(bytes?: string | null) {
  if (!bytes) return "-";

  const b = Number(bytes);
  if (b >= 1073741824) return (b / 1073741824).toFixed(2) + " GB";
  if (b >= 1048576) return (b / 1048576).toFixed(2) + " MB";
  if (b >= 1024) return (b / 1024).toFixed(2) + " KB";
  return b + " B";
}
