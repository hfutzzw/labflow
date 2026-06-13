-- 任务进度跟进日志表
-- 在 Supabase SQL Editor 执行

CREATE TABLE IF NOT EXISTS task_progress_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  current_status TEXT NOT NULL DEFAULT '',
  difficulties TEXT NOT NULL DEFAULT '',
  next_steps TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_progress_logs_task ON task_progress_logs(task_id);

-- RLS
ALTER TABLE task_progress_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_task_progress_logs" ON task_progress_logs;
DROP POLICY IF EXISTS "anon_insert_task_progress_logs" ON task_progress_logs;
CREATE POLICY "anon_select_task_progress_logs" ON task_progress_logs FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_task_progress_logs" ON task_progress_logs FOR INSERT TO anon WITH CHECK (true);
