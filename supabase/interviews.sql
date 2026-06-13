-- 学生面试招生管理表
-- 在 Supabase SQL Editor 执行

CREATE TABLE IF NOT EXISTS interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  school TEXT NOT NULL DEFAULT '',
  major TEXT NOT NULL DEFAULT '',
  gpa TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  target_degree TEXT DEFAULT '硕士' CHECK (target_degree IN ('硕士','博士')),
  source TEXT DEFAULT '夏令营' CHECK (source IN ('夏令营','考研','保研','内推','其他')),
  status TEXT DEFAULT '待联系' CHECK (status IN ('待联系','已联系','已面试','已录取','已拒绝')),
  interview_date DATE,
  notes TEXT DEFAULT '',
  evaluation TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_interviews_status ON interviews(status);

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_select_interviews" ON interviews;
DROP POLICY IF EXISTS "auth_insert_interviews" ON interviews;
DROP POLICY IF EXISTS "auth_update_interviews" ON interviews;
DROP POLICY IF EXISTS "auth_delete_interviews" ON interviews;
CREATE POLICY "auth_select_interviews" ON interviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_interviews" ON interviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_interviews" ON interviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_interviews" ON interviews FOR DELETE TO authenticated USING (true);
