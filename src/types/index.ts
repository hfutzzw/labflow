// ============================================================
// LabFlow Type Definitions
// ============================================================

// ---- Student ----
export type Degree = 'bachelor' | 'master' | 'phd' | 'faculty'
export type StudentGrade =
  | '导师'
  | '大一'
  | '大二'
  | '大三'
  | '大四'
  | '研一'
  | '研二'
  | '研三'
export type StudentStatus = 'active' | 'leave' | 'graduated' | 'suspended'
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface Student {
  id: string
  name: string
  grade: StudentGrade
  degree: Degree
  enrollmentYear: number
  expectedGraduationYear: number
  researchDirection: string
  supervisor: string
  status: StudentStatus
  riskLevel: RiskLevel
  avatar?: string
  currentProject?: string
  currentTask?: string
  experimentProgress: number
  writingProgress: number
  lastUpdated: string
  createdAt: string
}

// ---- Project / Paper ----
export type ProjectStage =
  | 'idea'
  | 'survey'
  | 'reproduction'
  | 'main_experiment'
  | 'ablation'
  | 'writing'
  | 'submission'
  | 'rebuttal'
  | 'accepted'
  | 'rejected_resubmit'

export interface Project {
  id: string
  title: string
  leadStudentId: string
  participantIds: string[]
  researchDirection: string
  targetConferenceId?: string
  stage: ProjectStage
  experimentProgress: number
  writingProgress: number
  figureProgress: number
  ablationProgress: number
  supplementaryProgress: number
  riskLevel: RiskLevel
  coreContribution: string
  coreMotivation: string
  reviewerAttackRisk: string
  nextStep: string
  currentRisk: string
  createdAt: string
  updatedAt: string
}

// ---- Task ----
export type TaskType =
  | 'read_paper'
  | 'reproduce_baseline'
  | 'run_experiment'
  | 'write_paper'
  | 'make_figure'
  | 'organize_table'
  | 'prepare_meeting'
  | 'submission'
  | 'rebuttal'
  | 'thesis'
  | 'project_material'
export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'pending_feedback' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task {
  id: string
  title: string
  assigneeId: string
  projectId?: string
  type: TaskType
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  completedAt?: string
  progress: number
  riskLabel?: string
  note?: string
  isDelayed: boolean
  createdAt: string
}

// ---- Conference ----
export type ConferenceField =
  | 'CV'
  | 'NLP'
  | 'ML'
  | 'Data Mining'
  | 'Robotics'
  | 'Multi-modal'
export type CCFLevel = 'A' | 'B' | 'C'

export interface Conference {
  id: string
  name: string
  year: number
  field: ConferenceField
  ccfLevel: CCFLevel
  abstractDeadline: string
  fullPaperDeadline: string
  supplementaryDeadline?: string
  rebuttalStart?: string
  rebuttalEnd?: string
  notificationDate?: string
  website?: string
  location?: string
  createdAt: string
}

// ---- Meeting ----
export type MeetingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export interface Meeting {
  id: string
  date: string
  time: string
  location: string
  meetingLink?: string
  topic?: string
  host: string
  status: MeetingStatus
  participants: string[]
  createdAt: string
}

export interface MeetingPresentation {
  id: string
  meetingId: string
  order: number
  studentId: string
  topic: string
  projectId?: string
  estimatedDuration: number // minutes
  status: 'pending' | 'presenting' | 'done'
}

export interface MeetingReport {
  id: string
  meetingId: string
  studentId: string
  topic: string
  thisWeekCompleted: string
  nextWeekPlan: string
  supervisorFeedback: string
  followUpTasks: string[]
  createdAt: string
}

// ---- Task Progress Log ----
export interface TaskProgressLog {
  id: string
  taskId: string
  progress: number
  currentStatus: string
  difficulties: string
  nextSteps: string
  createdAt: string
}

// ---- Experiment Record ----
export interface Experiment {
  id: string
  studentId: string
  projectId: string
  experimentNumber: string
  changeDescription: string
  dataset: string
  metrics: Record<string, number>
  conclusion: string
  isEffective: boolean
  createdAt: string
}

// ---- Risk Alert ----
export interface RiskAlert {
  id: string
  studentId: string
  studentName: string
  type: 'submission' | 'experiment' | 'writing' | 'graduation' | 'progress'
  level: RiskLevel
  description: string
  suggestion: string
  createdAt: string
}

// ---- Settings ----
export interface LabSettings {
  labName: string
  supervisorName: string
  defaultMeetingTime: string
  defaultMeetingLocation: string
  defaultMeetingLink: string
  studentGrades: StudentGrade[]
  researchDirections: string[]
  conferenceFields: ConferenceField[]
}

// ---- Kanban Column ----
export interface KanbanColumn {
  id: TaskStatus
  title: string
  tasks: Task[]
}

// ---- Dashboard Stats ----
export interface DashboardStats {
  totalStudents: number
  weeklyMeetings: number
  activeProjects: number
  delayedTasks: number
  highRiskProjects: number
  nextDdlDays: number
}

// ---- Filter types ----
export interface StudentFilters {
  grade?: StudentGrade
  researchDirection?: string
  status?: StudentStatus
  riskLevel?: RiskLevel
  search?: string
}

export interface ConferenceFilters {
  field?: ConferenceField
  ccfLevel?: CCFLevel
}

// ---- UI Helpers ----
export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  read_paper: '读论文',
  reproduce_baseline: '复现 Baseline',
  run_experiment: '跑实验',
  write_paper: '写论文',
  make_figure: '画图',
  organize_table: '整理表格',
  prepare_meeting: '准备组会',
  submission: '投稿',
  rebuttal: 'Rebuttal',
  thesis: '毕业论文',
  project_material: '项目材料',
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: '未开始',
  in_progress: '进行中',
  blocked: '阻塞中',
  pending_feedback: '待导师反馈',
  done: '已完成',
}

export const PROJECT_STAGE_LABELS: Record<ProjectStage, string> = {
  idea: 'Idea',
  survey: '调研',
  reproduction: '复现',
  main_experiment: '主实验',
  ablation: '消融',
  writing: '写作',
  submission: '投稿',
  rebuttal: 'Rebuttal',
  accepted: '录用',
  rejected_resubmit: '被拒重投',
}

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  low: '低风险',
  medium: '中风险',
  high: '高风险',
  critical: '极高风险',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: '低',
  medium: '中',
  high: '高',
  urgent: '紧急',
}

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  active: '在读',
  leave: '休学',
  graduated: '已毕业',
  suspended: '暂停',
}
