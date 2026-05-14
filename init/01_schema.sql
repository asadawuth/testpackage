-- ============================================================
-- 01_schema.sql  –  สร้าง schema ทั้งหมด (run อัตโนมัติครั้งแรก)
-- ============================================================

-- ── users ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  first_name    VARCHAR(60)  NOT NULL,
  last_name     VARCHAR(60)  NOT NULL,
  tel           VARCHAR(10)  NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  national_id   VARCHAR(13)  NOT NULL UNIQUE,
  created_at    TIMESTAMP    NOT NULL DEFAULT (date_trunc('second', NOW() AT TIME ZONE 'Asia/Bangkok'))
);

-- ── user_address ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_address (
  id                  SERIAL PRIMARY KEY,
  user_id             INT          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address_type        VARCHAR(20)  NOT NULL,
  is_primary_address  BOOLEAN      NOT NULL DEFAULT FALSE,
  address_line        VARCHAR(255) NOT NULL,
  sub_district        VARCHAR(100) NOT NULL,
  district            VARCHAR(100) NOT NULL,
  province            VARCHAR(100) NOT NULL,
  postal_code         VARCHAR(10)  NOT NULL
);

-- ── package ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS package (
  id              SERIAL PRIMARY KEY,
  name_package    VARCHAR(50)   NOT NULL,
  detail_package  VARCHAR(255)  NOT NULL,
  price           NUMERIC(10,2) NOT NULL,
  duration_days   INT           NOT NULL CHECK (duration_days > 0)
);

-- ── user_subscription ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_subscription (
  id          SERIAL PRIMARY KEY,
  user_id     INT         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id  INT         NOT NULL REFERENCES package(id),
  start_date  DATE        NOT NULL,
  end_date    DATE        NOT NULL,
  status      VARCHAR(20) NOT NULL DEFAULT 'ใช้งาน',
  created_at  TIMESTAMP   NOT NULL DEFAULT (date_trunc('day', NOW() AT TIME ZONE 'Asia/Bangkok'))
);

-- ── user_usage_history ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_usage_history (
  id                    SERIAL PRIMARY KEY,
  user_subscription_id  INT    NOT NULL REFERENCES user_subscription(id) ON DELETE CASCADE,
  total_internet_bytes  BIGINT,
  used_internet_bytes   BIGINT,
  total_call            INT,
  used_call             INT,
  created_at            TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── index ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_created_at         ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_user_address_user_id     ON user_address(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_user_id     ON user_subscription(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_status      ON user_subscription(status);
CREATE INDEX IF NOT EXISTS idx_usage_history_sub_id     ON user_usage_history(user_subscription_id);
CREATE INDEX IF NOT EXISTS idx_usage_history_created_at ON user_usage_history(created_at);
