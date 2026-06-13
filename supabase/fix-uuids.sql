-- 把外键关联的 UUID 列改为 text，兼容 'supervisor' 和 UUID
-- 在 Supabase SQL Editor 一次跑完

-- tasks
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_assignee_id_fkey;
ALTER TABLE tasks ALTER COLUMN assignee_id TYPE text USING assignee_id::text;
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_project_id_fkey;
ALTER TABLE tasks ALTER COLUMN project_id TYPE text USING project_id::text;

-- meeting_reports
ALTER TABLE meeting_reports DROP CONSTRAINT IF EXISTS meeting_reports_meeting_id_fkey;
ALTER TABLE meeting_reports ALTER COLUMN meeting_id TYPE text USING meeting_id::text;
ALTER TABLE meeting_reports DROP CONSTRAINT IF EXISTS meeting_reports_student_id_fkey;
ALTER TABLE meeting_reports ALTER COLUMN student_id TYPE text USING student_id::text;

-- experiments
ALTER TABLE experiments DROP CONSTRAINT IF EXISTS experiments_student_id_fkey;
ALTER TABLE experiments ALTER COLUMN student_id TYPE text USING student_id::text;
ALTER TABLE experiments DROP CONSTRAINT IF EXISTS experiments_project_id_fkey;
ALTER TABLE experiments ALTER COLUMN project_id TYPE text USING project_id::text;

-- risk_alerts
ALTER TABLE risk_alerts DROP CONSTRAINT IF EXISTS risk_alerts_student_id_fkey;
ALTER TABLE risk_alerts ALTER COLUMN student_id TYPE text USING student_id::text;
