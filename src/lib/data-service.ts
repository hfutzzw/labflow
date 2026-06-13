// ============================================================
// LabFlow Data Service — Supabase only with field mapping
// ============================================================
import { supabase } from '@/lib/supabase/client'
import type { Student, Project, Task, Conference, Meeting, MeetingReport, TaskProgressLog, TaskType, TaskStatus, TaskPriority } from '@/types'

// ==================== Field Mapping Helpers ====================
// Supabase stores snake_case; TypeScript uses camelCase.

function mapStudent(row: any): Student {
  if (!row) return row
  return {
    id: row.id, name: row.name, grade: row.grade, degree: row.degree,
    enrollmentYear: row.enrollment_year, expectedGraduationYear: row.expected_graduation_year,
    researchDirection: row.research_direction, supervisor: row.supervisor,
    status: row.status, riskLevel: row.risk_level,
    currentProject: row.current_project, currentTask: row.current_task,
    experimentProgress: row.experiment_progress ?? 0, writingProgress: row.writing_progress ?? 0,
    lastUpdated: row.last_updated, createdAt: row.created_at,
  }
}

function mapTask(row: any): Task {
  if (!row) return row
  return {
    id: row.id, title: row.title,
    assigneeId: row.assignee_id, projectId: row.project_id,
    type: row.type as TaskType, status: row.status as TaskStatus, priority: row.priority as TaskPriority,
    dueDate: row.due_date, completedAt: row.completed_at,
    progress: row.progress ?? 0, riskLabel: row.risk_label, note: row.note,
    isDelayed: row.is_delayed ?? false, createdAt: row.created_at,
  }
}

function mapProject(row: any): Project {
  if (!row) return row
  return {
    id: row.id, title: row.title,
    leadStudentId: row.lead_student_id, participantIds: row.participant_ids ?? [],
    researchDirection: row.research_direction,
    targetConferenceId: row.target_conference_id, stage: row.stage,
    experimentProgress: row.experiment_progress ?? 0, writingProgress: row.writing_progress ?? 0,
    figureProgress: row.figure_progress ?? 0, ablationProgress: row.ablation_progress ?? 0,
    supplementaryProgress: row.supplementary_progress ?? 0, riskLevel: row.risk_level,
    coreContribution: row.core_contribution ?? '', coreMotivation: row.core_motivation ?? '',
    reviewerAttackRisk: row.reviewer_attack_risk ?? '', nextStep: row.next_step ?? '',
    currentRisk: row.current_risk ?? '',
    createdAt: row.created_at, updatedAt: row.updated_at,
  }
}

function mapConference(row: any): Conference {
  if (!row) return row
  return {
    id: row.id, name: row.name, year: row.year, field: row.field, ccfLevel: row.ccf_level,
    abstractDeadline: row.abstract_deadline, fullPaperDeadline: row.full_paper_deadline,
    supplementaryDeadline: row.supplementary_deadline,
    rebuttalStart: row.rebuttal_start, rebuttalEnd: row.rebuttal_end,
    notificationDate: row.notification_date, website: row.website, location: row.location,
    createdAt: row.created_at,
  }
}

function mapMeeting(row: any): Meeting {
  if (!row) return row
  return {
    id: row.id, date: row.date, time: row.time,
    location: row.location, meetingLink: row.meeting_link || row.link,
    host: row.host, status: row.status,
    participants: row.participants ?? [], createdAt: row.created_at,
  }
}

// ==================== Students ====================
export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false })
  if (error) { console.error('getStudents:', error); return [] }
  return (data || []).map(mapStudent)
}

export async function createStudent(s: Partial<Student>): Promise<{ data: Student | null; error: string | null }> {
  const { data, error } = await supabase.from('students').insert({
    name: s.name, grade: s.grade, degree: s.degree,
    enrollment_year: s.enrollmentYear, expected_graduation_year: s.expectedGraduationYear,
    research_direction: s.researchDirection, supervisor: s.supervisor,
    status: s.status, risk_level: s.riskLevel,
    current_project: s.currentProject, current_task: s.currentTask,
    experiment_progress: s.experimentProgress ?? 0, writing_progress: s.writingProgress ?? 0,
    last_updated: new Date().toISOString(),
  }).select().single()
  if (error) return { data: null, error: error.message }
  return { data: mapStudent(data), error: null }
}

export async function updateStudent(id: string, s: Partial<Student>): Promise<{ data: Student | null; error: string | null }> {
  const payload: Record<string, any> = { last_updated: new Date().toISOString() }
  if (s.name !== undefined) payload.name = s.name
  if (s.grade !== undefined) payload.grade = s.grade
  if (s.degree !== undefined) payload.degree = s.degree
  if (s.enrollmentYear !== undefined) payload.enrollment_year = s.enrollmentYear
  if (s.expectedGraduationYear !== undefined) payload.expected_graduation_year = s.expectedGraduationYear
  if (s.researchDirection !== undefined) payload.research_direction = s.researchDirection
  if (s.supervisor !== undefined) payload.supervisor = s.supervisor
  if (s.status !== undefined) payload.status = s.status
  if (s.currentProject !== undefined) payload.current_project = s.currentProject
  if (s.currentTask !== undefined) payload.current_task = s.currentTask
  const { data, error } = await supabase.from('students').update(payload).eq('id', id).select().single()
  if (error) return { data: null, error: error.message }
  return { data: mapStudent(data), error: null }
}

export async function deleteStudent(id: string): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true, error: null }
}

// ==================== Tasks ====================
export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
  if (error) { console.error('getTasks:', error); return [] }
  return (data || []).map(mapTask)
}

export async function createTask(t: Partial<Task>): Promise<{ data: Task | null; error: string | null }> {
  const { data, error } = await supabase.from('tasks').insert({
    title: t.title, assignee_id: t.assigneeId, project_id: t.projectId || null,
    type: t.type || 'run_experiment', status: t.status || 'todo',
    priority: t.priority || 'medium', due_date: t.dueDate || new Date().toISOString().slice(0, 10),
    progress: t.progress ?? 0, risk_label: t.riskLabel || null, note: t.note || null,
    is_delayed: t.isDelayed ?? false,
  }).select().single()
  if (error) return { data: null, error: error.message }
  return { data: mapTask(data), error: null }
}

export async function updateTask(id: string, t: Partial<Task>): Promise<{ data: Task | null; error: string | null }> {
  const payload: Record<string, any> = {}
  if (t.title !== undefined) payload.title = t.title
  if (t.assigneeId !== undefined) payload.assignee_id = t.assigneeId
  if (t.status !== undefined) payload.status = t.status
  if (t.priority !== undefined) payload.priority = t.priority
  if (t.progress !== undefined) payload.progress = t.progress
  if (t.isDelayed !== undefined) payload.is_delayed = t.isDelayed
  if (t.dueDate !== undefined) payload.due_date = t.dueDate
  if (t.note !== undefined) payload.note = t.note
  const { data, error } = await supabase.from('tasks').update(payload).eq('id', id).select().single()
  if (error) return { data: null, error: error.message }
  return { data: mapTask(data), error: null }
}

export async function deleteTask(id: string): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true, error: null }
}

// ==================== Projects ====================
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*').order('updated_at', { ascending: false })
  if (error) { console.error('getProjects:', error); return [] }
  return (data || []).map(mapProject)
}

// ==================== Conferences ====================
export async function getConferences(): Promise<Conference[]> {
  const { data, error } = await supabase.from('conferences').select('*').order('full_paper_deadline', { ascending: true })
  if (error) { console.error('getConferences:', error); return [] }
  return (data || []).map(mapConference)
}

// ==================== Meetings ====================
export async function getMeetings(): Promise<Meeting[]> {
  const { data, error } = await supabase.from('meetings').select('*').order('date', { ascending: false })
  if (error) { console.error('getMeetings:', error); return [] }
  return (data || []).map(mapMeeting)
}

export async function createMeeting(m: Partial<Meeting>): Promise<{ data: Meeting | null; error: string | null }> {
  const { data, error } = await supabase.from('meetings').insert({
    date: m.date || new Date().toISOString().slice(0, 10),
    time: m.time || '14:00-17:00',
    location: m.location || '实验室 401',
    meeting_link: m.meetingLink || null,
    host: m.host || '赵志伟',
    status: m.status || 'upcoming',
    participants: m.participants ?? [],
  }).select().single()
  if (error) return { data: null, error: error.message }
  return { data: mapMeeting(data), error: null }
}

// ==================== Task Progress Logs ====================
export async function getTaskProgressLogs(taskId: string): Promise<TaskProgressLog[]> {
  const { data, error } = await supabase.from('task_progress_logs').select('*').eq('task_id', taskId).order('created_at', { ascending: false })
  if (error) { console.error('getTaskProgressLogs:', error); return [] }
  return (data || []).map((r: any) => ({
    id: r.id, taskId: r.task_id, progress: r.progress,
    currentStatus: r.current_status, difficulties: r.difficulties,
    nextSteps: r.next_steps, createdAt: r.created_at,
  })) as TaskProgressLog[]
}

export async function createTaskProgressLog(log: { taskId: string; progress: number; currentStatus: string; difficulties: string; nextSteps: string }): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('task_progress_logs').insert({
    task_id: log.taskId, progress: log.progress,
    current_status: log.currentStatus, difficulties: log.difficulties,
    next_steps: log.nextSteps,
  })
  if (error) return { success: false, error: error.message }
  return { success: true, error: null }
}

export async function deleteMeeting(id: string): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('meetings').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true, error: null }
}

// ==================== Meeting Reports ====================
export async function createMeetingReport(r: { meetingId: string; studentId: string; topic: string; order?: number; duration?: number }): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase.from('meeting_reports').insert({
    meeting_id: r.meetingId, student_id: r.studentId, topic: r.topic,
    report_order: r.order ?? 1, duration_minutes: r.duration ?? 25, status: 'pending',
  })
  if (error) return { success: false, error: error.message }
  return { success: true, error: null }
}

export async function getMeetingReports(meetingId?: string): Promise<MeetingReport[]> {
  let q = supabase.from('meeting_reports').select('*')
  if (meetingId) q = q.eq('meeting_id', meetingId)
  const { data, error } = await q.order('report_order')
  if (error) { console.error('getMeetingReports:', error); return [] }
  return (data || []) as MeetingReport[]
}
