-- 切换为仅登录用户可访问（替换之前的 anon 策略）
-- 在 Supabase SQL Editor 一次性执行

-- 先删除所有 anon 策略
DROP POLICY IF EXISTS "anon_select_students" ON students;
DROP POLICY IF EXISTS "anon_insert_students" ON students;
DROP POLICY IF EXISTS "anon_update_students" ON students;
DROP POLICY IF EXISTS "anon_delete_students" ON students;
DROP POLICY IF EXISTS "anon_select_tasks" ON tasks;
DROP POLICY IF EXISTS "anon_insert_tasks" ON tasks;
DROP POLICY IF EXISTS "anon_update_tasks" ON tasks;
DROP POLICY IF EXISTS "anon_delete_tasks" ON tasks;
DROP POLICY IF EXISTS "anon_select_projects" ON projects;
DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
DROP POLICY IF EXISTS "anon_update_projects" ON projects;
DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
DROP POLICY IF EXISTS "anon_select_conferences" ON conferences;
DROP POLICY IF EXISTS "anon_insert_conferences" ON conferences;
DROP POLICY IF EXISTS "anon_update_conferences" ON conferences;
DROP POLICY IF EXISTS "anon_delete_conferences" ON conferences;
DROP POLICY IF EXISTS "anon_select_meetings" ON meetings;
DROP POLICY IF EXISTS "anon_insert_meetings" ON meetings;
DROP POLICY IF EXISTS "anon_update_meetings" ON meetings;
DROP POLICY IF EXISTS "anon_delete_meetings" ON meetings;
DROP POLICY IF EXISTS "anon_select_meeting_reports" ON meeting_reports;
DROP POLICY IF EXISTS "anon_insert_meeting_reports" ON meeting_reports;
DROP POLICY IF EXISTS "anon_update_meeting_reports" ON meeting_reports;
DROP POLICY IF EXISTS "anon_delete_meeting_reports" ON meeting_reports;
DROP POLICY IF EXISTS "anon_select_experiments" ON experiments;
DROP POLICY IF EXISTS "anon_insert_experiments" ON experiments;
DROP POLICY IF EXISTS "anon_select_risk_alerts" ON risk_alerts;
DROP POLICY IF EXISTS "anon_insert_risk_alerts" ON risk_alerts;
DROP POLICY IF EXISTS "anon_select_lab_settings" ON lab_settings;
DROP POLICY IF EXISTS "anon_update_lab_settings" ON lab_settings;
DROP POLICY IF EXISTS "anon_select_task_progress_logs" ON task_progress_logs;
DROP POLICY IF EXISTS "anon_insert_task_progress_logs" ON task_progress_logs;

-- 创建仅 authenticated 用户可访问的策略
CREATE POLICY "auth_select_students" ON students FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_students" ON students FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_students" ON students FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_students" ON students FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_select_tasks" ON tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_tasks" ON tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_tasks" ON tasks FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_tasks" ON tasks FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_select_projects" ON projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_select_conferences" ON conferences FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_conferences" ON conferences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_conferences" ON conferences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_conferences" ON conferences FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_select_meetings" ON meetings FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_meetings" ON meetings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_meetings" ON meetings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_meetings" ON meetings FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_select_meeting_reports" ON meeting_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_meeting_reports" ON meeting_reports FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "auth_select_task_progress_logs" ON task_progress_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_insert_task_progress_logs" ON task_progress_logs FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "auth_select_lab_settings" ON lab_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_update_lab_settings" ON lab_settings FOR UPDATE TO authenticated USING (true);
