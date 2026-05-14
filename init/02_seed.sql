-- ============================================================
-- 02_seed.sql  –  ข้อมูลตัวอย่าง (seed data)
-- ============================================================

-- ── package ──────────────────────────────────────────────────
INSERT INTO package (name_package, detail_package, price, duration_days) VALUES
  ('Basic',    'อินเทอร์เน็ต 5 GB / โทร 100 นาที',           199.00, 30),
  ('Standard', 'อินเทอร์เน็ต 15 GB / โทร 300 นาที',          399.00, 30),
  ('Premium',  'อินเทอร์เน็ตไม่อั้น / โทรไม่จำกัด',           699.00, 30),
  ('7-Day',    'อินเทอร์เน็ต 3 GB / โทร 60 นาที (7 วัน)',     99.00,  7);

-- ── users ─────────────────────────────────────────────────────
INSERT INTO users (first_name, last_name, tel, email, national_id, created_at) VALUES
  ('สมชาย',   'ใจดี',      '0812345678', 'somchai@example.com',   '1100100200301', NOW() - INTERVAL '10 days'),
  ('สมหญิง',  'รักสวย',    '0823456789', 'somying@example.com',   '1100100200302', NOW() - INTERVAL '8 days'),
  ('วิชัย',   'มีสุข',     '0834567890', 'wichai@example.com',    '1100100200303', NOW() - INTERVAL '6 days'),
  ('นภา',     'แสงทอง',    '0845678901', 'napa@example.com',      '1100100200304', NOW() - INTERVAL '4 days'),
  ('ประเสริฐ', 'ดีงาม',    '0856789012', 'prasert@example.com',   '1100100200305', NOW() - INTERVAL '2 days'),
  ('กานดา',   'สุขสันต์',  '0867890123', 'kanda@example.com',     '1100100200306', NOW() - INTERVAL '1 day'),
  ('ธนพล',    'เจริญทรัพย์','0878901234', 'thanapol@example.com', '1100100200307', NOW()),
  ('รัตนา',   'พลายงาม',   '0889012345', 'rattana@example.com',   '1100100200308', NOW());

-- ── user_address ──────────────────────────────────────────────
INSERT INTO user_address (user_id, address_type, is_primary_address, address_line, sub_district, district, province, postal_code) VALUES
  (1, 'บ้าน',   TRUE,  '123 ถ.สุขุมวิท',    'คลองเตย',      'คลองเตย',     'กรุงเทพมหานคร', '10110'),
  (1, 'ที่ทำงาน', FALSE, '456 ถ.สีลม',       'สีลม',         'บางรัก',      'กรุงเทพมหานคร', '10500'),
  (2, 'บ้าน',   TRUE,  '789 ถ.รามคำแหง',    'หัวหมาก',      'บางกะปิ',     'กรุงเทพมหานคร', '10240'),
  (3, 'บ้าน',   TRUE,  '321 ถ.นิมมานเหมินทร์','สุเทพ',       'เมืองเชียงใหม่','เชียงใหม่',  '50200'),
  (4, 'บ้าน',   TRUE,  '654 ถ.ท่าแพ',       'ช้างคลาน',     'เมืองเชียงใหม่','เชียงใหม่',  '50100'),
  (5, 'บ้าน',   TRUE,  '987 ถ.สงขลา',       'บ่อยาง',       'เมืองสงขลา',  'สงขลา',        '90000'),
  (6, 'บ้าน',   TRUE,  '147 ถ.มิตรภาพ',     'ในเมือง',      'เมืองขอนแก่น','ขอนแก่น',     '40000'),
  (7, 'บ้าน',   TRUE,  '258 ถ.โกสีย์',      'ในเมือง',      'เมืองนครสวรรค์','นครสวรรค์', '60000'),
  (8, 'บ้าน',   TRUE,  '369 ถ.เพชรเกษม',    'หาดใหญ่',      'หาดใหญ่',     'สงขลา',        '90110');

-- ── user_subscription ─────────────────────────────────────────
INSERT INTO user_subscription (user_id, package_id, start_date, end_date, status, created_at) VALUES
  (1, 3, CURRENT_DATE - 5,  CURRENT_DATE + 25, 'ใช้งาน',  NOW() - INTERVAL '5 days'),
  (2, 2, CURRENT_DATE - 10, CURRENT_DATE + 20, 'ใช้งาน',  NOW() - INTERVAL '10 days'),
  (3, 1, CURRENT_DATE - 20, CURRENT_DATE + 10, 'ใช้งาน',  NOW() - INTERVAL '20 days'),
  (4, 4, CURRENT_DATE - 3,  CURRENT_DATE + 4,  'ใช้งาน',  NOW() - INTERVAL '3 days'),
  (5, 3, CURRENT_DATE - 15, CURRENT_DATE + 15, 'ใช้งาน',  NOW() - INTERVAL '15 days'),
  (6, 2, CURRENT_DATE - 30, CURRENT_DATE - 1,  'หมดอายุ', NOW() - INTERVAL '30 days'),
  (7, 1, CURRENT_DATE,      CURRENT_DATE + 30, 'ใช้งาน',  NOW()),
  (8, 3, CURRENT_DATE - 2,  CURRENT_DATE + 28, 'ใช้งาน',  NOW() - INTERVAL '2 days');

-- ── user_usage_history ────────────────────────────────────────
INSERT INTO user_usage_history (user_subscription_id, total_internet_bytes, used_internet_bytes, total_call, used_call, created_at) VALUES
  -- subscription 1 (Premium – 3 วันย้อนหลัง)
  (1, NULL,          NULL,          NULL, NULL, NOW() - INTERVAL '3 days'),
  (1, NULL,          NULL,          NULL, NULL, NOW() - INTERVAL '2 days'),
  (1, NULL,          NULL,          NULL, NULL, NOW() - INTERVAL '1 day'),
  -- subscription 2 (Standard)
  (2, 16106127360,   5368709120,    300,  87,   NOW() - INTERVAL '5 days'),
  (2, 16106127360,   9663676416,    300,  154,  NOW() - INTERVAL '2 days'),
  -- subscription 3 (Basic)
  (3, 5368709120,    3758096384,    100,  72,   NOW() - INTERVAL '10 days'),
  (3, 5368709120,    5368709120,    100,  100,  NOW() - INTERVAL '3 days'),
  -- subscription 4 (7-Day)
  (4, 3221225472,    1073741824,    60,   18,   NOW() - INTERVAL '2 days'),
  -- subscription 5 (Premium – ไม่มี limit)
  (5, NULL,          NULL,          NULL, NULL, NOW() - INTERVAL '7 days'),
  (5, NULL,          NULL,          NULL, NULL, NOW() - INTERVAL '1 day'),
  -- subscription 7 (Basic – เพิ่งเริ่ม)
  (7, 5368709120,    524288000,     100,  5,    NOW()),
  -- subscription 8 (Premium)
  (8, NULL,          NULL,          NULL, NULL, NOW() - INTERVAL '1 day'),
  (8, NULL,          NULL,          NULL, NULL, NOW());
