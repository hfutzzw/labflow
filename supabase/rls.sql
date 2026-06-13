-- ============================================================
-- LabFlow RLS Policies — Development Phase (anon access)
-- 在 Supabase SQL Editor 执行此文件即可开放匿名读写
-- 生产环境需替换为基于用户角色的权限控制
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
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

-- Students
CREATE POLICY "anon_select_students" ON students FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_students" ON students FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_students" ON students FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_students" ON students FOR DELETE TO anon USING (true);

-- Tasks
CREATE POLICY "anon_select_tasks" ON tasks FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_tasks" ON tasks FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_tasks" ON tasks FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_tasks" ON tasks FOR DELETE TO anon USING (true);

-- Projects
CREATE POLICY "anon_select_projects" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE TO anon USING (true);

-- Conferences
CREATE POLICY "anon_select_conferences" ON conferences FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_conferences" ON conferences FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_conferences" ON conferences FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_conferences" ON conferences FOR DELETE TO anon USING (true);

-- Meetings
CREATE POLICY "anon_select_meetings" ON meetings FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_meetings" ON meetings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_meetings" ON meetings FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_meetings" ON meetings FOR DELETE TO anon USING (true);

-- Meeting Reports
CREATE POLICY "anon_select_meeting_reports" ON meeting_reports FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_meeting_reports" ON meeting_reports FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_meeting_reports" ON meeting_reports FOR UPDATE TO anon USING (true);
CREATE POLICY "anon_delete_meeting_reports" ON meeting_reports FOR DELETE TO anon USING (true);

-- Experiments
CREATE POLICY "anon_select_experiments" ON experiments FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_experiments" ON experiments FOR INSERT TO anon WITH CHECK (true);

-- Risk Alerts
CREATE POLICY "anon_select_risk_alerts" ON risk_alerts FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_risk_alerts" ON risk_alerts FOR INSERT TO anon WITH CHECK (true);

-- Lab Settings
CREATE POLICY "anon_select_lab_settings" ON lab_settings FOR SELECT TO anon USING (true);
CREATE POLICY "anon_update_lab_settings" ON lab_settings FOR UPDATE TO anon USING (true);
