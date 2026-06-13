-- 修复 tasks 和 task_progress_logs 的 UPDATE/INSERT 权限
-- 在 Supabase SQL Editor 执行

-- tasks 表 — 允许更新（加 WITH CHECK）
DROP POLICY IF EXISTS "anon_update_tasks" ON tasks;
CREATE POLICY "anon_update_tasks" ON tasks FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- task_progress_logs 表 — 确保 SELECT + INSERT 正常
DROP POLICY IF EXISTS "anon_select_task_progress_logs" ON task_progress_logs;
DROP POLICY IF EXISTS "anon_insert_task_progress_logs" ON task_progress_logs;
CREATE POLICY "anon_select_task_progress_logs" ON task_progress_logs FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_task_progress_logs" ON task_progress_logs FOR INSERT TO anon WITH CHECK (true);

-- meetings 表 — 允许 INSERT
DROP POLICY IF EXISTS "anon_insert_meetings" ON meetings;
CREATE POLICY "anon_insert_meetings" ON meetings FOR INSERT TO anon WITH CHECK (true);
