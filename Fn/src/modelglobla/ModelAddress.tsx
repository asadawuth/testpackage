import { useEffect, useState } from "react";
import api from "../reqapi/axios";

type Props = {
  userId: number;
  onClose: () => void;
};

type Address = {
  id: number;
  address_type: string;
  is_primary_address: boolean;
  address_line: string;
  district: string;
  sub_district: string;
  province: string;
  postal_code: string;
};

export default function ModelAddress({ userId, onClose }: Props) {
  const [data, setData] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/userAddress/${userId}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg p-5 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">🏠 ที่อยู่ลูกค้า{userId}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {loading && <div className="text-sm text-gray-500">กำลังโหลด...</div>}

          {data.map((addr) => (
            <div key={addr.id} className="border rounded-md p-3 bg-gray-50">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">
                  {addr.address_type === "id_card"
                    ? "🏠 ที่อยู่ตามบัตรประชาชน"
                    : "🏠 ที่อยู่ปัจจุบัน"}
                </span>

                {addr.is_primary_address && (
                  <span className="text-xs text-green-600">จัดส่ง</span>
                )}
              </div>

              <div className="text-sm text-gray-700">{addr.address_line}</div>

              <div className="text-xs text-gray-500 mt-1">
                {addr.sub_district}, {addr.district}, {addr.province}{" "}
                {addr.postal_code}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
