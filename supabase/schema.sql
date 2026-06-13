-- ============================================================
-- LabOS Database Schema for Supabase
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Students
-- ============================================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  grade TEXT NOT NULL CHECK (grade IN ('导师','大一','大二','大三','大四','研一','研二','研三')),
  degree TEXT NOT NULL CHECK (degree IN ('bachelor','master','faculty')),
  enrollment_year INTEGER NOT NULL,
  expected_graduation_year INTEGER NOT NULL,
  research_direction TEXT NOT NULL,
  supervisor TEXT NOT NULL DEFAULT '张教授',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','leave','graduated','suspended')),
  risk_level TEXT NOT NULL DEFAULT 'low' CHECK (risk_level IN ('low','medium','high','critical')),
  avatar TEXT,
  current_project TEXT,
  current_task TEXT,
  experiment_progress INTEGER NOT NULL DEFAULT 0 CHECK (experiment_progress >= 0 AND experiment_progress <= 100),
  writing_progress INTEGER NOT NULL DEFAULT 0 CHECK (writing_progress >= 0 AND writing_progress <= 100),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_grade ON students(grade);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_risk ON students(risk_level);

-- ============================================================
-- Projects
-- ============================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  lead_student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  participant_ids UUID[] NOT NULL DEFAULT '{}',
  research_direction TEXT NOT NULL,
  target_conference_id UUID,
  stage TEXT NOT NULL DEFAULT 'idea' CHECK (stage IN ('idea','survey','reproduction','main_experiment','ablation','writing','submission','rebuttal','accepted','rejected_resubmit')),
  experiment_progress INTEGER NOT NULL DEFAULT 0 CHECK (experiment_progress >= 0 AND experiment_progress <= 100),
  writing_progress INTEGER NOT NULL DEFAULT 0 CHECK (writing_progress >= 0 AND writing_progress <= 100),
  figure_progress INTEGER NOT NULL DEFAULT 0 CHECK (figure_progress >= 0 AND figure_progress <= 100),
  ablation_progress INTEGER NOT NULL DEFAULT 0 CHECK (ablation_progress >= 0 AND ablation_progress <= 100),
  supplementary_progress INTEGER NOT NULL DEFAULT 0 CHECK (supplementary_progress >= 0 AND supplementary_progress <= 100),
  risk_level TEXT NOT NULL DEFAULT 'low' CHECK (risk_level IN ('low','medium','high','critical')),
  core_contribution TEXT NOT NULL DEFAULT '',
  core_motivation TEXT NOT NULL DEFAULT '',
  reviewer_attack_risk TEXT NOT NULL DEFAULT '',
  next_step TEXT NOT NULL DEFAULT '',
  current_risk TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_stage ON projects(stage);
CREATE INDEX idx_projects_risk ON projects(risk_level);

-- ============================================================
-- Conferences
-- ============================================================
CREATE TABLE conferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  field TEXT NOT NULL CHECK (field IN ('CV','NLP','ML','Data Mining','Robotics','Multi-modal')),
  ccf_level TEXT NOT NULL CHECK (ccf_level IN ('A','B','C')),
  abstract_deadline DATE NOT NULL,
  full_paper_deadline DATE NOT NULL,
  supplementary_deadline DATE,
  rebuttal_start DATE,
  rebuttal_end DATE,
  notification_date DATE,
  website TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conferences_field ON conferences(field);
CREATE INDEX idx_conferences_ddl ON conferences(full_paper_deadline);

-- ============================================================
-- Tasks
-- ============================================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  assignee_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('read_paper','reproduce_baseline','run_experiment','write_paper','make_figure','organize_table','prepare_meeting','submission','rebuttal','thesis','project_material')),
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','blocked','pending_feedback','done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  due_date DATE NOT NULL,
  completed_at TIMESTAMPTZ,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  risk_label TEXT,
  note TEXT,
  is_delayed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- ============================================================
-- Meetings
-- ============================================================
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  meeting_link TEXT,
  host TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','ongoing','completed','cancelled')),
  participants UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_meetings_date ON meetings(date);
CREATE INDEX idx_meetings_status ON meetings(status);

-- ============================================================
-- Meeting Presentations
-- ============================================================
CREATE TABLE meeting_presentations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  estimated_duration INTEGER NOT NULL DEFAULT 25,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','presenting','done'))
);

CREATE INDEX idx_presentations_meeting ON meeting_presentations(meeting_id);

-- ============================================================
-- Meeting Reports
-- ============================================================
CREATE TABLE meeting_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  this_week_completed TEXT NOT NULL DEFAULT '',
  next_week_plan TEXT NOT NULL DEFAULT '',
  supervisor_feedback TEXT NOT NULL DEFAULT '',
  follow_up_tasks UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reports_meeting ON meeting_reports(meeting_id);
CREATE INDEX idx_reports_student ON meeting_reports(student_id);

-- ============================================================
-- Experiments
-- ============================================================
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  experiment_number TEXT NOT NULL,
  change_description TEXT NOT NULL,
  dataset TEXT NOT NULL,
  metrics JSONB NOT NULL DEFAULT '{}',
  conclusion TEXT NOT NULL DEFAULT '',
  is_effective BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_experiments_student ON experiments(student_id);
CREATE INDEX idx_experiments_project ON experiments(project_id);

-- ============================================================
-- Risk Alerts (view, computed from periodic checks)
-- ============================================================
CREATE TABLE risk_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('submission','experiment','writing','graduation','progress')),
  level TEXT NOT NULL CHECK (level IN ('low','medium','high','critical')),
  description TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_risk_alerts_student ON risk_alerts(student_id);
CREATE INDEX idx_risk_alerts_level ON risk_alerts(level);

-- ============================================================
-- Settings (single-row table for lab configuration)
-- ============================================================
CREATE TABLE lab_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  lab_name TEXT NOT NULL DEFAULT '智能感知与计算实验室 (IPC Lab)',
  supervisor_name TEXT NOT NULL DEFAULT '张教授',
  default_meeting_time TEXT NOT NULL DEFAULT '每周一 14:00-17:00',
  default_meeting_location TEXT NOT NULL DEFAULT '实验室 401',
  default_meeting_link TEXT NOT NULL DEFAULT '',
  student_grades TEXT[] NOT NULL DEFAULT '{}',
  research_directions TEXT[] NOT NULL DEFAULT '{}',
  conference_fields TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO lab_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access (adjust for real auth)
CREATE POLICY "Allow all for authenticated users" ON students FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON tasks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON conferences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON meetings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON meeting_presentations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON meeting_reports FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON experiments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON risk_alerts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated users" ON lab_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Also allow anon access for development
CREATE POLICY "Allow all for anon" ON students FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON projects FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON tasks FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON conferences FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON meetings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON meeting_presentations FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON meeting_reports FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON experiments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON risk_alerts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON lab_settings FOR ALL TO anon USING (true) WITH CHECK (true);
