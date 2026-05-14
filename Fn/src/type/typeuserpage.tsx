export interface userAllData {
  id: number;
  first_name: string;
  last_name: string;
  tel: string;
  email: string;
  national_id: string;
  created_at: string;
  subscription_id: number;
  start_date: string;
  end_date: string;
  status: string;
  package_id: number;
  name_package: string;
  detail_package: string;
  price: string;
  duration_days: number;
}

export interface userAddress {
  id: number;
  address_type: string;
  is_primary_address: boolean;
  address_line: string;
  district: string;
  sub_district: string;
  province: string;
  postal_code: string;
}

export interface userPackageToday {
  user_id: number;
  first_name: string;
  last_name: string;
  usage_date: string;
  total_internet_bytes: string;
  used_internet_bytes: string;
  total_call: number;
  used_call: number;
  created_at: string;
}
