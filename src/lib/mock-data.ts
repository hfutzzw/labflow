// ============================================================
// LabFlow Mock Data — Realistic research group data
// ============================================================
import {
  Student, Project, Task, Conference, Meeting,
  MeetingPresentation, MeetingReport, Experiment, RiskAlert,
  LabSettings,
} from '@/types'

// ---- Students (18 + 1 导师) ----
export const mockStudents: Student[] = [
  {
    id: 's0', name: '赵志伟', grade: '导师', degree: 'faculty',
    enrollmentYear: 2018, expectedGraduationYear: 2099,
    researchDirection: '多模态学习、视频生成、模型加速',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: '课题组整体管理',
    currentTask: '基金申请书撰写 + 论文审稿',
    experimentProgress: 90, writingProgress: 85, lastUpdated: '2026-06-12',
    createdAt: '2018-01-01',
  },
  {
    id: 's1', name: '陈明远', grade: '研三', degree: 'master',
    enrollmentYear: 2023, expectedGraduationYear: 2026,
    researchDirection: '多模态行人重识别',
    supervisor: '赵志伟', status: 'active', riskLevel: 'medium',
    currentProject: 'Cross-Modal Person ReID with Diffusion Prior',
    currentTask: '补充消融实验',
    experimentProgress: 72, writingProgress: 45, lastUpdated: '2026-06-11',
    createdAt: '2023-09-01',
  },
  {
    id: 's2', name: '林雪怡', grade: '研二', degree: 'master',
    enrollmentYear: 2024, expectedGraduationYear: 2027,
    researchDirection: '视频生成与扩散模型',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Long-Form Video Generation via Cascaded Diffusion',
    currentTask: '主实验调参',
    experimentProgress: 85, writingProgress: 60, lastUpdated: '2026-06-10',
    createdAt: '2024-09-01',
  },
  {
    id: 's3', name: '王昊天', grade: '研一', degree: 'master',
    enrollmentYear: 2025, expectedGraduationYear: 2028,
    researchDirection: '大模型推理加速',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Speculative Decoding for Multimodal LLMs',
    currentTask: '复现 baseline',
    experimentProgress: 30, writingProgress: 5, lastUpdated: '2026-06-12',
    createdAt: '2025-09-01',
  },
  {
    id: 's4', name: '赵雨桐', grade: '研三', degree: 'master',
    enrollmentYear: 2023, expectedGraduationYear: 2026,
    researchDirection: '图文检索与跨模态对齐',
    supervisor: '赵志伟', status: 'active', riskLevel: 'high',
    currentProject: 'Fine-Grained Image-Text Retrieval via Hierarchical Alignment',
    currentTask: '赶论文全文',
    experimentProgress: 90, writingProgress: 70, lastUpdated: '2026-06-08',
    createdAt: '2023-09-01',
  },
  {
    id: 's5', name: '孙浩然', grade: '研三', degree: 'master',
    enrollmentYear: 2023, expectedGraduationYear: 2026,
    researchDirection: '自动驾驶感知',
    supervisor: '赵志伟', status: 'active', riskLevel: 'critical',
    currentProject: '3D Object Detection in Adverse Weather',
    currentTask: '补充对比实验',
    experimentProgress: 50, writingProgress: 30, lastUpdated: '2026-05-20',
    createdAt: '2023-09-01',
  },
  {
    id: 's6', name: '周子涵', grade: '研二', degree: 'master',
    enrollmentYear: 2024, expectedGraduationYear: 2027,
    researchDirection: '医学图像分割',
    supervisor: '赵志伟', status: 'active', riskLevel: 'medium',
    currentProject: 'Few-Shot Medical Image Segmentation with SAM Adapter',
    currentTask: '跑主实验',
    experimentProgress: 55, writingProgress: 20, lastUpdated: '2026-06-09',
    createdAt: '2024-09-01',
  },
  {
    id: 's7', name: '吴嘉宁', grade: '研二', degree: 'master',
    enrollmentYear: 2024, expectedGraduationYear: 2027,
    researchDirection: '长视频理解',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Efficient Long Video Understanding via Memory Tokens',
    currentTask: '整理实验结果表格',
    experimentProgress: 80, writingProgress: 55, lastUpdated: '2026-06-11',
    createdAt: '2024-09-01',
  },
  {
    id: 's8', name: '郑思远', grade: '研二', degree: 'master',
    enrollmentYear: 2024, expectedGraduationYear: 2027,
    researchDirection: '扩散模型蒸馏',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'One-Step Diffusion via Consistency Distillation',
    currentTask: '写论文 method 部分',
    experimentProgress: 95, writingProgress: 75, lastUpdated: '2026-06-12',
    createdAt: '2024-09-01',
  },
  {
    id: 's9', name: '冯小曼', grade: '研一', degree: 'master',
    enrollmentYear: 2025, expectedGraduationYear: 2028,
    researchDirection: '多模态大模型',
    supervisor: '赵志伟', status: 'active', riskLevel: 'medium',
    currentProject: 'Visual Instruction Tuning for Domain-Specific Tasks',
    currentTask: '读论文 + 做调研',
    experimentProgress: 15, writingProgress: 0, lastUpdated: '2026-06-10',
    createdAt: '2025-09-01',
  },
  {
    id: 's10', name: '黄志远', grade: '研一', degree: 'master',
    enrollmentYear: 2025, expectedGraduationYear: 2028,
    researchDirection: '3D 视觉与 NeRF',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Feed-Forward 3D Gaussian Splatting for Novel View Synthesis',
    currentTask: '复现 baseline',
    experimentProgress: 25, writingProgress: 0, lastUpdated: '2026-06-11',
    createdAt: '2025-09-01',
  },
  {
    id: 's11', name: '刘一鸣', grade: '研二', degree: 'master',
    enrollmentYear: 2024, expectedGraduationYear: 2027,
    researchDirection: '强化学习与具身智能',
    supervisor: '赵志伟', status: 'active', riskLevel: 'medium',
    currentProject: 'RL-based Dexterous Manipulation with Tactile Feedback',
    currentTask: '调试仿真环境',
    experimentProgress: 40, writingProgress: 10, lastUpdated: '2026-06-07',
    createdAt: '2024-09-01',
  },
  {
    id: 's12', name: '何雨萱', grade: '研一', degree: 'master',
    enrollmentYear: 2025, expectedGraduationYear: 2028,
    researchDirection: '语音合成与转换',
    supervisor: '赵志伟', status: 'leave', riskLevel: 'low',
    currentProject: undefined,
    currentTask: undefined,
    experimentProgress: 0, writingProgress: 0, lastUpdated: '2026-03-15',
    createdAt: '2025-09-01',
  },
  {
    id: 's13', name: '张浩然', grade: '大四', degree: 'bachelor',
    enrollmentYear: 2022, expectedGraduationYear: 2026,
    researchDirection: '扩散模型蒸馏',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'One-Step Diffusion via Consistency Distillation',
    currentTask: '辅助实验 + 毕业论文',
    experimentProgress: 80, writingProgress: 85, lastUpdated: '2026-06-11',
    createdAt: '2022-09-01',
  },
  {
    id: 's14', name: '李思远', grade: '大四', degree: 'bachelor',
    enrollmentYear: 2022, expectedGraduationYear: 2026,
    researchDirection: '多模态行人重识别',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Cross-Modal Person ReID with Diffusion Prior',
    currentTask: '辅助数据标注与可视化',
    experimentProgress: 60, writingProgress: 40, lastUpdated: '2026-06-10',
    createdAt: '2022-09-01',
  },
  {
    id: 's15', name: '王雨萌', grade: '大三', degree: 'bachelor',
    enrollmentYear: 2023, expectedGraduationYear: 2027,
    researchDirection: '医学图像分割',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Few-Shot Medical Image Segmentation with SAM Adapter',
    currentTask: '学习 PyTorch + 复现 baseline',
    experimentProgress: 20, writingProgress: 0, lastUpdated: '2026-06-09',
    createdAt: '2023-09-01',
  },
  {
    id: 's16', name: '刘梓涵', grade: '大三', degree: 'bachelor',
    enrollmentYear: 2023, expectedGraduationYear: 2027,
    researchDirection: '视频生成与扩散模型',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: 'Long-Form Video Generation via Cascaded Diffusion',
    currentTask: '学习扩散模型基础',
    experimentProgress: 10, writingProgress: 0, lastUpdated: '2026-06-08',
    createdAt: '2023-09-01',
  },
  {
    id: 's17', name: '赵思涵', grade: '大二', degree: 'bachelor',
    enrollmentYear: 2024, expectedGraduationYear: 2028,
    researchDirection: '大模型推理加速',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: undefined,
    currentTask: '学习深度学习基础',
    experimentProgress: 5, writingProgress: 0, lastUpdated: '2026-06-12',
    createdAt: '2024-09-01',
  },
  {
    id: 's18', name: '陈一诺', grade: '大一', degree: 'bachelor',
    enrollmentYear: 2025, expectedGraduationYear: 2029,
    researchDirection: '待定',
    supervisor: '赵志伟', status: 'active', riskLevel: 'low',
    currentProject: undefined,
    currentTask: '学习 Python + 线性代数',
    experimentProgress: 0, writingProgress: 0, lastUpdated: '2026-06-12',
    createdAt: '2025-09-01',
  },
]

// ---- Projects (8) ----
export const mockProjects: Project[] = [
  {
    id: 'p1', title: 'Cross-Modal Person ReID with Diffusion Prior',
    leadStudentId: 's1', participantIds: ['s1', 's9'],
    researchDirection: '多模态行人重识别',
    targetConferenceId: 'c1',
    stage: 'ablation', experimentProgress: 72, writingProgress: 45,
    figureProgress: 60, ablationProgress: 55, supplementaryProgress: 20,
    riskLevel: 'medium',
    coreContribution: '首次将扩散模型先验引入跨模态行人重识别，在多个 benchmark 上达到 SOTA',
    coreMotivation: '现有跨模态 ReID 方法忽略了模态间的细粒度语义对齐，扩散模型可以提供更丰富的跨模态先验',
    reviewerAttackRisk: '扩散模型推理开销较大，可能被质疑实用性',
    nextStep: '完成消融实验、补充在 SYSU-MM01 上的实验',
    currentRisk: '消融实验进度略慢，可能赶不上 NeurIPS',
    createdAt: '2025-06-01', updatedAt: '2026-06-11',
  },
  {
    id: 'p2', title: 'Long-Form Video Generation via Cascaded Diffusion',
    leadStudentId: 's2', participantIds: ['s2', 's10'],
    researchDirection: '视频生成与扩散模型',
    targetConferenceId: 'c3',
    stage: 'main_experiment', experimentProgress: 85, writingProgress: 60,
    figureProgress: 70, ablationProgress: 40, supplementaryProgress: 30,
    riskLevel: 'low',
    coreContribution: '提出级联式扩散框架，首次实现 30 秒以上高质量视频生成',
    coreMotivation: '长视频生成受限于计算资源，级联策略降低单阶段生成难度',
    reviewerAttackRisk: '评估指标可能不够全面，需补充用户调研',
    nextStep: '完成主实验 + 用户调研',
    currentRisk: '暂无重大风险',
    createdAt: '2025-09-01', updatedAt: '2026-06-10',
  },
  {
    id: 'p3', title: 'Speculative Decoding for Multimodal LLMs',
    leadStudentId: 's3', participantIds: ['s3'],
    researchDirection: '大模型推理加速',
    targetConferenceId: 'c2',
    stage: 'reproduction', experimentProgress: 30, writingProgress: 5,
    figureProgress: 0, ablationProgress: 0, supplementaryProgress: 0,
    riskLevel: 'low',
    coreContribution: '设计面向多模态场景的投机解码策略，推理加速 2-3x',
    coreMotivation: '多模态 LLM 推理延迟高，投机解码在多模态场景下有独特优化空间',
    reviewerAttackRisk: '加速比可能因模型而异，泛化性需验证',
    nextStep: '完成 baseline 复现',
    currentRisk: '处于早期阶段',
    createdAt: '2025-12-01', updatedAt: '2026-06-12',
  },
  {
    id: 'p4', title: 'Fine-Grained Image-Text Retrieval via Hierarchical Alignment',
    leadStudentId: 's4', participantIds: ['s4'],
    researchDirection: '图文检索与跨模态对齐',
    targetConferenceId: 'c5',
    stage: 'writing', experimentProgress: 90, writingProgress: 70,
    figureProgress: 85, ablationProgress: 80, supplementaryProgress: 60,
    riskLevel: 'high',
    coreContribution: '提出层次化跨模态对齐方法，细粒度检索超越现有 SOTA 5%+',
    coreMotivation: '现有方法忽略了从粗到细的层次化语义结构',
    reviewerAttackRisk: '在特定数据集之外泛化性可能不足',
    nextStep: '赶在 ACL DDL 前完成论文全文',
    currentRisk: '写作进度落后，距离 DDL 仅剩 20 天',
    createdAt: '2025-03-01', updatedAt: '2026-06-08',
  },
  {
    id: 'p5', title: '3D Object Detection in Adverse Weather',
    leadStudentId: 's5', participantIds: ['s5', 's10'],
    researchDirection: '自动驾驶感知',
    targetConferenceId: 'c1',
    stage: 'main_experiment', experimentProgress: 50, writingProgress: 30,
    figureProgress: 40, ablationProgress: 20, supplementaryProgress: 5,
    riskLevel: 'critical',
    coreContribution: '提出恶劣天气鲁棒的 3D 目标检测框架，雨天/雾天性能提升 15%',
    coreMotivation: '自动驾驶在恶劣天气下的感知性能急剧下降，现有方法鲁棒性不足',
    reviewerAttackRisk: '真实数据验证不够充分，仿真到真实的 gap 可能被质疑',
    nextStep: '补充对比实验、增加真实场景验证',
    currentRisk: '孙浩然已 3 周未更新进度，实验停滞，毕业风险极高',
    createdAt: '2025-06-01', updatedAt: '2026-05-20',
  },
  {
    id: 'p6', title: 'Few-Shot Medical Image Segmentation with SAM Adapter',
    leadStudentId: 's6', participantIds: ['s6'],
    researchDirection: '医学图像分割',
    targetConferenceId: 'c6',
    stage: 'main_experiment', experimentProgress: 55, writingProgress: 20,
    figureProgress: 35, ablationProgress: 15, supplementaryProgress: 5,
    riskLevel: 'medium',
    coreContribution: '设计轻量级 SAM Adapter，少样本医学分割性能接近全监督',
    coreMotivation: '医学图像标注成本极高，SAM 的少样本适配具有重要临床价值',
    reviewerAttackRisk: 'Adapter 在不同器官上泛化性可能不一致',
    nextStep: '在更多器官数据集上验证',
    currentRisk: '实验进度偏慢',
    createdAt: '2025-10-01', updatedAt: '2026-06-09',
  },
  {
    id: 'p7', title: 'Efficient Long Video Understanding via Memory Tokens',
    leadStudentId: 's7', participantIds: ['s7', 's3'],
    researchDirection: '长视频理解',
    targetConferenceId: 'c3',
    stage: 'main_experiment', experimentProgress: 80, writingProgress: 55,
    figureProgress: 65, ablationProgress: 50, supplementaryProgress: 30,
    riskLevel: 'low',
    coreContribution: '提出记忆 token 机制，线性复杂度处理超长视频，推理速度提升 10x',
    coreMotivation: '现有长视频理解方法计算复杂度高，难以处理小时级视频',
    reviewerAttackRisk: '在极端长视频（>2h）场景下记忆机制可能退化',
    nextStep: '完成消融实验 + 写作',
    currentRisk: '暂无重大风险',
    createdAt: '2025-08-01', updatedAt: '2026-06-11',
  },
  {
    id: 'p8', title: 'One-Step Diffusion via Consistency Distillation',
    leadStudentId: 's8', participantIds: ['s8'],
    researchDirection: '扩散模型蒸馏',
    targetConferenceId: 'c4',
    stage: 'writing', experimentProgress: 95, writingProgress: 75,
    figureProgress: 90, ablationProgress: 88, supplementaryProgress: 50,
    riskLevel: 'low',
    coreContribution: '提出新型一致性蒸馏策略，单步生成质量超越现有方法，FID 降低 20%',
    coreMotivation: '扩散模型推理成本高，一致性蒸馏是实现实时生成的关键路径',
    reviewerAttackRisk: '在高分辨率图像上效果需进一步验证',
    nextStep: '完成论文 + 补充高分辨率实验',
    currentRisk: '暂无重大风险',
    createdAt: '2025-07-01', updatedAt: '2026-06-12',
  },
]

// ---- Tasks (30) ----
export const mockTasks: Task[] = [
  { id: 't1', title: '完成 Cross-Modal ReID 消融实验', assigneeId: 's1', projectId: 'p1', type: 'run_experiment', status: 'in_progress', priority: 'high', dueDate: '2026-06-20', progress: 55, riskLabel: '可能延期', isDelayed: false, createdAt: '2026-06-01' },
  { id: 't2', title: '写 ReID 论文 Method 部分', assigneeId: 's1', projectId: 'p1', type: 'write_paper', status: 'todo', priority: 'high', dueDate: '2026-06-30', progress: 0, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't3', title: '视频生成主实验 — 调参 U-Net', assigneeId: 's2', projectId: 'p2', type: 'run_experiment', status: 'in_progress', priority: 'high', dueDate: '2026-06-15', progress: 75, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't4', title: '用户调研：生成视频质量评估', assigneeId: 's2', projectId: 'p2', type: 'project_material', status: 'todo', priority: 'medium', dueDate: '2026-07-05', progress: 0, isDelayed: false, createdAt: '2026-06-05' },
  { id: 't5', title: '复现 Eagle Speculative Decoding', assigneeId: 's3', projectId: 'p3', type: 'reproduce_baseline', status: 'in_progress', priority: 'high', dueDate: '2026-06-25', progress: 40, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't6', title: '读 5 篇多模态投机解码相关论文', assigneeId: 's3', projectId: 'p3', type: 'read_paper', status: 'done', priority: 'medium', dueDate: '2026-06-05', completedAt: '2026-06-04', progress: 100, isDelayed: false, createdAt: '2026-05-25' },
  { id: 't7', title: '写完 ACL 投稿全文', assigneeId: 's4', projectId: 'p4', type: 'write_paper', status: 'in_progress', priority: 'urgent', dueDate: '2026-07-01', progress: 70, riskLabel: 'DDL 临近', isDelayed: false, createdAt: '2026-05-15' },
  { id: 't8', title: '画论文架构图', assigneeId: 's4', projectId: 'p4', type: 'make_figure', status: 'done', priority: 'high', dueDate: '2026-06-05', completedAt: '2026-06-03', progress: 100, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't9', title: '整理对比实验表格', assigneeId: 's4', projectId: 'p4', type: 'organize_table', status: 'done', priority: 'high', dueDate: '2026-06-01', completedAt: '2026-05-30', progress: 100, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't10', title: '补充恶劣天气 3D 检测对比实验', assigneeId: 's5', projectId: 'p5', type: 'run_experiment', status: 'blocked', priority: 'urgent', dueDate: '2026-06-15', progress: 10, riskLabel: '长期未更新', isDelayed: true, createdAt: '2026-04-20' },
  { id: 't11', title: '搭建真实天气数据采集 pipeline', assigneeId: 's5', projectId: 'p5', type: 'project_material', status: 'todo', priority: 'high', dueDate: '2026-07-01', progress: 0, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't12', title: 'SAM Adapter 在肝脏 CT 上实验', assigneeId: 's6', projectId: 'p6', type: 'run_experiment', status: 'in_progress', priority: 'high', dueDate: '2026-06-18', progress: 60, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't13', title: '整理医学分割实验结果', assigneeId: 's6', projectId: 'p6', type: 'organize_table', status: 'todo', priority: 'medium', dueDate: '2026-06-25', progress: 0, isDelayed: false, createdAt: '2026-06-05' },
  { id: 't14', title: '长视频理解消融实验', assigneeId: 's7', projectId: 'p7', type: 'run_experiment', status: 'in_progress', priority: 'high', dueDate: '2026-06-20', progress: 50, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't15', title: '写长视频理解论文 Introduction', assigneeId: 's7', projectId: 'p7', type: 'write_paper', status: 'todo', priority: 'medium', dueDate: '2026-07-10', progress: 0, isDelayed: false, createdAt: '2026-06-10' },
  { id: 't16', title: '完成一致性蒸馏论文终稿', assigneeId: 's8', projectId: 'p8', type: 'write_paper', status: 'in_progress', priority: 'urgent', dueDate: '2026-06-25', progress: 85, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't17', title: '补充高分辨率 (1024x1024) 实验', assigneeId: 's8', projectId: 'p8', type: 'run_experiment', status: 'todo', priority: 'high', dueDate: '2026-06-20', progress: 0, isDelayed: false, createdAt: '2026-06-05' },
  { id: 't18', title: '调研多模态 Instruction Tuning 最新进展', assigneeId: 's9', projectId: 'p1', type: 'read_paper', status: 'in_progress', priority: 'high', dueDate: '2026-06-30', progress: 40, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't19', title: '复现 GaussianFormer baseline', assigneeId: 's10', projectId: 'p5', type: 'reproduce_baseline', status: 'in_progress', priority: 'high', dueDate: '2026-06-28', progress: 35, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't20', title: '准备下周组会 PPT', assigneeId: 's1', projectId: 'p1', type: 'prepare_meeting', status: 'todo', priority: 'medium', dueDate: '2026-06-16', progress: 0, isDelayed: false, createdAt: '2026-06-11' },
  { id: 't21', title: '准备下周组会 PPT', assigneeId: 's4', projectId: 'p4', type: 'prepare_meeting', status: 'todo', priority: 'medium', dueDate: '2026-06-16', progress: 0, isDelayed: false, createdAt: '2026-06-11' },
  { id: 't22', title: 'RL 仿真环境 Isaac Gym 调试', assigneeId: 's11', projectId: undefined, type: 'run_experiment', status: 'blocked', priority: 'high', dueDate: '2026-06-10', progress: 30, riskLabel: '环境配置问题', isDelayed: true, createdAt: '2026-05-15' },
  { id: 't23', title: '读 3 篇 dexterous manipulation 论文', assigneeId: 's11', projectId: undefined, type: 'read_paper', status: 'done', priority: 'high', dueDate: '2026-06-01', completedAt: '2026-05-28', progress: 100, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't24', title: '完成 ReID 论文图表整理', assigneeId: 's1', projectId: 'p1', type: 'organize_table', status: 'todo', priority: 'medium', dueDate: '2026-07-05', progress: 0, isDelayed: false, createdAt: '2026-06-05' },
  { id: 't25', title: 'NeurIPS 投稿材料准备（s1）', assigneeId: 's1', projectId: 'p1', type: 'submission', status: 'todo', priority: 'urgent', dueDate: '2026-07-10', progress: 0, riskLabel: 'DDL', isDelayed: false, createdAt: '2026-06-05' },
  { id: 't26', title: 'NeurIPS 投稿材料准备（s7）', assigneeId: 's7', projectId: 'p7', type: 'submission', status: 'todo', priority: 'high', dueDate: '2026-07-10', progress: 0, isDelayed: false, createdAt: '2026-06-05' },
  { id: 't27', title: '画医学分割模型架构图', assigneeId: 's6', projectId: 'p6', type: 'make_figure', status: 'pending_feedback', priority: 'high', dueDate: '2026-06-08', progress: 90, isDelayed: true, createdAt: '2026-05-20' },
  { id: 't28', title: '毕业论文大纲', assigneeId: 's4', projectId: undefined, type: 'thesis', status: 'todo', priority: 'high', dueDate: '2026-08-01', progress: 0, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't29', title: '毕业论文大纲', assigneeId: 's5', projectId: undefined, type: 'thesis', status: 'todo', priority: 'urgent', dueDate: '2026-07-01', progress: 0, riskLabel: '毕业风险', isDelayed: false, createdAt: '2026-05-20' },
  // Supervisor tasks
  { id: 't31', title: '撰写国家自然科学基金面上项目申请书', assigneeId: 's0', projectId: undefined, type: 'project_material', status: 'in_progress', priority: 'urgent', dueDate: '2026-08-15', progress: 55, isDelayed: false, createdAt: '2026-05-20' },
  { id: 't32', title: '审稿 NeurIPS 2026 (3篇)', assigneeId: 's0', projectId: undefined, type: 'read_paper', status: 'in_progress', priority: 'high', dueDate: '2026-07-01', progress: 33, isDelayed: false, createdAt: '2026-06-01' },
  { id: 't33', title: '准备课题组中期考核材料', assigneeId: 's0', projectId: undefined, type: 'project_material', status: 'todo', priority: 'high', dueDate: '2026-07-20', progress: 0, isDelayed: false, createdAt: '2026-06-05' },
  { id: 't34', title: '撰写 CVPR 2027 workshop proposal', assigneeId: 's0', projectId: undefined, type: 'write_paper', status: 'todo', priority: 'medium', dueDate: '2026-09-01', progress: 10, isDelayed: false, createdAt: '2026-06-10' },
  { id: 't30', title: '复现 SAM-Med2D baseline', assigneeId: 's6', projectId: 'p6', type: 'reproduce_baseline', status: 'done', priority: 'high', dueDate: '2026-05-20', completedAt: '2026-05-15', progress: 100, isDelayed: false, createdAt: '2026-04-20' },
]

// ---- Conferences (15) ----
export const mockConferences: Conference[] = [
  // === Past / Recently past ===
  { id: 'c1', name: 'NeurIPS', year: 2026, field: 'ML', ccfLevel: 'A', abstractDeadline: '2026-05-15', fullPaperDeadline: '2026-05-22', supplementaryDeadline: '2026-05-29', rebuttalStart: '2026-08-01', rebuttalEnd: '2026-08-14', notificationDate: '2026-09-15', website: 'https://neurips.cc', location: 'Vancouver, Canada', createdAt: '2026-01-01' },
  // === Upcoming (within 1 year from June 2026) ===
  { id: 'c10', name: 'EMNLP', year: 2026, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2026-06-17', fullPaperDeadline: '2026-06-24', supplementaryDeadline: '2026-07-01', rebuttalStart: '2026-08-15', rebuttalEnd: '2026-08-30', notificationDate: '2026-10-01', website: 'https://2026.emnlp.org', location: 'Hong Kong', createdAt: '2026-01-01' },
  { id: 'c5', name: 'ACL', year: 2027, field: 'NLP', ccfLevel: 'A', abstractDeadline: '2026-07-15', fullPaperDeadline: '2026-07-22', supplementaryDeadline: '2026-07-29', rebuttalStart: '2026-09-10', rebuttalEnd: '2026-09-24', notificationDate: '2026-10-20', website: 'https://2027.aclweb.org', location: 'Barcelona, Spain', createdAt: '2026-01-01' },
  { id: 'c8', name: 'AAAI', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2026-08-08', fullPaperDeadline: '2026-08-15', supplementaryDeadline: '2026-08-22', rebuttalStart: '2026-10-10', rebuttalEnd: '2026-10-25', notificationDate: '2026-11-18', website: 'https://aaai.org/Conferences/AAAI-27/', location: 'Philadelphia, USA', createdAt: '2026-01-01' },
  { id: 'c19', name: 'WACV', year: 2027, field: 'CV', ccfLevel: 'B', abstractDeadline: '2026-07-10', fullPaperDeadline: '2026-07-17', supplementaryDeadline: '2026-07-24', rebuttalStart: '2026-09-01', rebuttalEnd: '2026-09-15', notificationDate: '2026-10-20', website: 'https://wacv2027.thecvf.com', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c16', name: 'ICRA', year: 2027, field: 'Robotics', ccfLevel: 'B', abstractDeadline: '2026-09-05', fullPaperDeadline: '2026-09-12', supplementaryDeadline: '2026-09-19', rebuttalStart: '2026-11-01', rebuttalEnd: '2026-11-15', notificationDate: '2027-01-15', website: 'https://ieee-icra.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c2', name: 'ICLR', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2026-09-28', fullPaperDeadline: '2026-10-05', supplementaryDeadline: '2026-10-12', rebuttalStart: '2027-01-10', rebuttalEnd: '2027-01-25', notificationDate: '2027-02-15', website: 'https://iclr.cc', location: 'Singapore', createdAt: '2026-01-01' },
  { id: 'c14', name: 'WWW', year: 2027, field: 'Data Mining', ccfLevel: 'A', abstractDeadline: '2026-10-08', fullPaperDeadline: '2026-10-15', supplementaryDeadline: '2026-10-22', rebuttalStart: '2026-12-10', rebuttalEnd: '2026-12-24', notificationDate: '2027-01-25', website: 'https://www2027.thewebconf.org', location: 'Austin, USA', createdAt: '2026-01-01' },
  { id: 'c3', name: 'CVPR', year: 2027, field: 'CV', ccfLevel: 'A', abstractDeadline: '2026-11-09', fullPaperDeadline: '2026-11-16', supplementaryDeadline: '2026-11-23', rebuttalStart: '2027-01-20', rebuttalEnd: '2027-02-03', notificationDate: '2027-03-02', website: 'https://cvpr.thecvf.com', location: 'Honolulu, USA', createdAt: '2026-01-01' },
  { id: 'c20', name: 'COLING', year: 2027, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2026-11-20', fullPaperDeadline: '2026-11-27', supplementaryDeadline: '2026-12-04', rebuttalStart: '2027-02-01', rebuttalEnd: '2027-02-15', notificationDate: '2027-03-15', website: 'https://coling2027.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c17', name: 'NAACL', year: 2027, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2026-12-10', fullPaperDeadline: '2026-12-17', supplementaryDeadline: '2026-12-24', rebuttalStart: '2027-02-01', rebuttalEnd: '2027-02-15', notificationDate: '2027-03-15', website: 'https://naacl.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c11', name: 'IJCAI', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2027-01-13', fullPaperDeadline: '2027-01-20', supplementaryDeadline: '2027-01-27', rebuttalStart: '2027-03-10', rebuttalEnd: '2027-03-25', notificationDate: '2027-04-22', website: 'https://ijcai-27.org', location: 'Melbourne, Australia', createdAt: '2026-01-01' },
  { id: 'c7', name: 'ICML', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2027-01-26', fullPaperDeadline: '2027-02-02', supplementaryDeadline: '2027-02-09', rebuttalStart: '2027-04-10', rebuttalEnd: '2027-04-25', notificationDate: '2027-05-25', website: 'https://icml.cc', location: 'Honolulu, USA', createdAt: '2026-01-01' },
  { id: 'c15', name: 'SIGIR', year: 2027, field: 'Data Mining', ccfLevel: 'A', abstractDeadline: '2027-01-27', fullPaperDeadline: '2027-02-03', supplementaryDeadline: '2027-02-10', rebuttalStart: '2027-03-20', rebuttalEnd: '2027-04-05', notificationDate: '2027-04-25', website: 'https://sigir.org/sigir2027/', location: 'Amsterdam, Netherlands', createdAt: '2026-01-01' },
  { id: 'c13', name: 'KDD', year: 2027, field: 'Data Mining', ccfLevel: 'A', abstractDeadline: '2027-02-06', fullPaperDeadline: '2027-02-13', supplementaryDeadline: '2027-02-20', rebuttalStart: '2027-04-10', rebuttalEnd: '2027-04-25', notificationDate: '2027-05-18', website: 'https://kdd2027.kdd.org', location: 'Chicago, USA', createdAt: '2026-01-01' },
  { id: 'c6', name: 'MICCAI', year: 2027, field: 'CV', ccfLevel: 'B', abstractDeadline: '2027-02-20', fullPaperDeadline: '2027-02-27', supplementaryDeadline: '2027-03-06', rebuttalStart: '2027-05-01', rebuttalEnd: '2027-05-15', notificationDate: '2027-06-10', website: 'https://miccai2027.org', location: 'Tokyo, Japan', createdAt: '2026-01-01' },
  { id: 'c18', name: 'IROS', year: 2027, field: 'Robotics', ccfLevel: 'B', abstractDeadline: '2027-03-01', fullPaperDeadline: '2027-03-08', supplementaryDeadline: '2027-03-15', rebuttalStart: '2027-05-01', rebuttalEnd: '2027-05-15', notificationDate: '2027-07-01', website: 'https://iros2027.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c4', name: 'ICCV', year: 2027, field: 'CV', ccfLevel: 'A', abstractDeadline: '2027-03-15', fullPaperDeadline: '2027-03-22', supplementaryDeadline: '2027-03-29', rebuttalStart: '2027-06-01', rebuttalEnd: '2027-06-15', notificationDate: '2027-07-22', website: 'https://iccv.thecvf.com', location: 'Paris, France', createdAt: '2026-01-01' },
  { id: 'c12', name: 'ACM MM', year: 2027, field: 'Multi-modal', ccfLevel: 'A', abstractDeadline: '2027-04-08', fullPaperDeadline: '2027-04-15', supplementaryDeadline: '2027-04-22', rebuttalStart: '2027-06-10', rebuttalEnd: '2027-06-25', notificationDate: '2027-07-20', website: 'https://acmmm2027.org', location: 'Seoul, Korea', createdAt: '2026-01-01' },
  { id: 'c21', name: 'BMVC', year: 2027, field: 'CV', ccfLevel: 'B', abstractDeadline: '2027-04-20', fullPaperDeadline: '2027-04-27', supplementaryDeadline: '2027-05-04', rebuttalStart: '2027-07-01', rebuttalEnd: '2027-07-15', notificationDate: '2027-08-15', website: 'https://bmvc2027.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c22', name: 'CIKM', year: 2027, field: 'Data Mining', ccfLevel: 'B', abstractDeadline: '2027-05-15', fullPaperDeadline: '2027-05-22', supplementaryDeadline: '2027-05-29', rebuttalStart: '2027-08-01', rebuttalEnd: '2027-08-15', notificationDate: '2027-09-15', website: 'https://cikm2027.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c23', name: 'NeurIPS', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2027-05-20', fullPaperDeadline: '2027-05-27', supplementaryDeadline: '2027-06-03', rebuttalStart: '2027-08-01', rebuttalEnd: '2027-08-14', notificationDate: '2027-09-15', website: 'https://neurips.cc', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c26', name: 'ICDM', year: 2027, field: 'Data Mining', ccfLevel: 'B', abstractDeadline: '2027-06-20', fullPaperDeadline: '2027-06-27', supplementaryDeadline: '2027-07-04', rebuttalStart: '2027-09-01', rebuttalEnd: '2027-09-15', notificationDate: '2027-10-15', website: 'https://icdm2027.org', location: 'TBD', createdAt: '2026-01-01' },
  // === Far future ===
  { id: 'c24', name: 'EMNLP', year: 2027, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2027-06-15', fullPaperDeadline: '2027-06-22', supplementaryDeadline: '2027-06-29', rebuttalStart: '2027-08-15', rebuttalEnd: '2027-08-30', notificationDate: '2027-10-01', website: 'https://2027.emnlp.org', location: 'TBD', createdAt: '2026-01-01' },
  { id: 'c9', name: 'ECCV', year: 2028, field: 'CV', ccfLevel: 'B', abstractDeadline: '2028-03-07', fullPaperDeadline: '2028-03-14', supplementaryDeadline: '2028-03-21', rebuttalStart: '2028-05-10', rebuttalEnd: '2028-05-24', notificationDate: '2028-07-01', website: 'https://eccv2028.ecva.net', location: 'Munich, Germany', createdAt: '2026-01-01' },
]

// ---- Meetings (6) ----
export const mockMeetings: Meeting[] = [
  { id: 'm1', date: '2026-06-15', time: '14:00-17:00', location: '实验室 401', meetingLink: 'https://meeting.tencent.com/xxx', host: '张教授', status: 'upcoming', participants: ['s1', 's2', 's3', 's6', 's8', 's9', 's11'], createdAt: '2026-06-01' },
  { id: 'm2', date: '2026-06-08', time: '14:00-17:00', location: '实验室 401', meetingLink: 'https://meeting.tencent.com/xxx', host: '张教授', status: 'completed', participants: ['s1', 's2', 's3', 's6', 's8', 's9', 's11'], createdAt: '2026-06-01' },
  { id: 'm3', date: '2026-06-01', time: '14:00-17:00', location: '实验室 401', meetingLink: 'https://meeting.tencent.com/xxx', host: '张教授', status: 'completed', participants: ['s1', 's2', 's3', 's6', 's8', 's9', 's11'], createdAt: '2026-05-25' },
  { id: 'm4', date: '2026-06-13', time: '10:00-12:00', location: '线上', meetingLink: 'https://meeting.tencent.com/yyy', host: '李副教授', status: 'upcoming', participants: ['s4', 's5', 's7', 's10', 's12'], createdAt: '2026-06-05' },
  { id: 'm5', date: '2026-06-06', time: '10:00-12:00', location: '线上', meetingLink: 'https://meeting.tencent.com/yyy', host: '李副教授', status: 'completed', participants: ['s4', 's5', 's7', 's10', 's12'], createdAt: '2026-06-01' },
  { id: 'm6', date: '2026-06-22', time: '14:00-17:00', location: '实验室 401', meetingLink: 'https://meeting.tencent.com/xxx', host: '张教授', status: 'upcoming', participants: ['s1', 's2', 's3', 's6', 's8', 's9', 's11'], createdAt: '2026-06-10' },
]

// ---- Meeting Presentations (12) ----
export const mockPresentations: MeetingPresentation[] = [
  { id: 'mp1', meetingId: 'm1', order: 1, studentId: 's1', topic: 'Cross-Modal ReID 消融实验进展', projectId: 'p1', estimatedDuration: 30, status: 'pending' },
  { id: 'mp2', meetingId: 'm1', order: 2, studentId: 's2', topic: '视频生成主实验结果分析', projectId: 'p2', estimatedDuration: 30, status: 'pending' },
  { id: 'mp3', meetingId: 'm1', order: 3, studentId: 's3', topic: '投机解码 Baseline 复现报告', projectId: 'p3', estimatedDuration: 20, status: 'pending' },
  { id: 'mp4', meetingId: 'm1', order: 4, studentId: 's6', topic: 'SAM Adapter 最新实验结果', projectId: 'p6', estimatedDuration: 25, status: 'pending' },
  { id: 'mp5', meetingId: 'm2', order: 1, studentId: 's8', topic: '一致性蒸馏论文进展', projectId: 'p8', estimatedDuration: 30, status: 'done' },
  { id: 'mp6', meetingId: 'm2', order: 2, studentId: 's9', topic: '多模态指令微调研报告', projectId: 'p1', estimatedDuration: 25, status: 'done' },
  { id: 'mp7', meetingId: 'm2', order: 3, studentId: 's11', topic: 'RL 仿真环境搭建进展', projectId: undefined, estimatedDuration: 20, status: 'done' },
  { id: 'mp8', meetingId: 'm4', order: 1, studentId: 's4', topic: 'ACL 投稿论文进度', projectId: 'p4', estimatedDuration: 30, status: 'pending' },
  { id: 'mp9', meetingId: 'm4', order: 2, studentId: 's7', topic: '长视频理解记忆机制设计', projectId: 'p7', estimatedDuration: 25, status: 'pending' },
  { id: 'mp10', meetingId: 'm4', order: 3, studentId: 's10', topic: 'GaussianFormer 复现进度', projectId: 'p5', estimatedDuration: 20, status: 'pending' },
  { id: 'mp11', meetingId: 'm4', order: 4, studentId: 's5', topic: '恶劣天气检测进展（待确认）', projectId: 'p5', estimatedDuration: 20, status: 'pending' },
  { id: 'mp12', meetingId: 'm6', order: 1, studentId: 's8', topic: '一致性蒸馏论文终稿', projectId: 'p8', estimatedDuration: 30, status: 'pending' },
]

// ---- Meeting Reports (8) ----
export const mockReports: MeetingReport[] = [
  { id: 'mr1', meetingId: 'm2', studentId: 's8', topic: '一致性蒸馏论文进展', thisWeekCompleted: '完成高分辨率实验初步测试，FID 下降 18%', nextWeekPlan: '补充 1024x1024 实验、修改 paper 终稿', supervisorFeedback: '实验结果很好，建议补充与 LCM 的对比，加快写作进度', followUpTasks: ['t16', 't17'], createdAt: '2026-06-08' },
  { id: 'mr2', meetingId: 'm2', studentId: 's9', topic: '多模态指令微调研报告', thisWeekCompleted: '读完 8 篇相关论文，整理调研报告', nextWeekPlan: '确定具体研究切入点和实验方案', supervisorFeedback: '调研方向可以，建议聚焦到具体下游任务（医疗/遥感）', followUpTasks: ['t18'], createdAt: '2026-06-08' },
  { id: 'mr3', meetingId: 'm2', studentId: 's11', topic: 'RL 仿真环境搭建进展', thisWeekCompleted: 'Isaac Gym 环境基本搭建完成，遇到 CUDA 兼容问题', nextWeekPlan: '解决 CUDA 兼容问题、运行示例代码', supervisorFeedback: '环境问题要尽快解决，先降低 Isaac Gym 版本尝试', followUpTasks: ['t22'], createdAt: '2026-06-08' },
  { id: 'mr4', meetingId: 'm3', studentId: 's1', topic: 'ReID 扩散先验方法设计', thisWeekCompleted: '完成扩散先验模块设计，初步实验有提升', nextWeekPlan: '在更多 backbone 上验证效果', supervisorFeedback: '方法设计有创新，注意和现有方法的公平对比', followUpTasks: ['t1'], createdAt: '2026-06-01' },
  { id: 'mr5', meetingId: 'm3', studentId: 's2', topic: '视频生成级联框架设计', thisWeekCompleted: '完成级联框架 v2 设计，解决时序一致性问题', nextWeekPlan: '在更大规模数据上训练验证', supervisorFeedback: '框架设计合理，重点验证长视频（>60s）效果', followUpTasks: ['t3'], createdAt: '2026-06-01' },
  { id: 'mr6', meetingId: 'm5', studentId: 's4', topic: 'ACL 投稿进度汇报', thisWeekCompleted: '完成主要实验和图表制作，method 部分初稿完成', nextWeekPlan: '写实验分析、related work', supervisorFeedback: '写作进度要加快，ACL DDL 不到一个月了', followUpTasks: ['t7'], createdAt: '2026-06-06' },
  { id: 'mr7', meetingId: 'm5', studentId: 's7', topic: '长视频理解记忆 token 设计', thisWeekCompleted: '完成记忆 token 机制设计，初步验证有效', nextWeekPlan: '做消融实验、分析记忆 token 行为', supervisorFeedback: '方法简洁有效，注意分析和现有方法的本质区别', followUpTasks: ['t14'], createdAt: '2026-06-06' },
  { id: 'mr8', meetingId: 'm5', studentId: 's10', topic: 'GaussianFormer 复现', thisWeekCompleted: 'GaussianFormer 代码读懂，开始跑 Waymo 数据', nextWeekPlan: '完成 Waymo 上复现、拿到 baseline 结果', supervisorFeedback: '复现进度正常，注意记录实现细节方便后续改进', followUpTasks: ['t19'], createdAt: '2026-06-06' },
]

// ---- Experiments (15) ----
export const mockExperiments: Experiment[] = [
  { id: 'e1', studentId: 's1', projectId: 'p1', experimentNumber: 'R001', changeDescription: 'Baseline (ResNet50 + BNNeck)', dataset: 'SYSU-MM01', metrics: { 'Rank-1': 54.2, 'mAP': 52.8 }, conclusion: 'Baseline 确认复现', isEffective: false, createdAt: '2026-04-01' },
  { id: 'e2', studentId: 's1', projectId: 'p1', experimentNumber: 'R002', changeDescription: '+ Cross-modal attention', dataset: 'SYSU-MM01', metrics: { 'Rank-1': 58.7, 'mAP': 57.1 }, conclusion: 'Attention 有效，+4.5 Rank-1', isEffective: true, createdAt: '2026-04-15' },
  { id: 'e3', studentId: 's1', projectId: 'p1', experimentNumber: 'R003', changeDescription: '+ Diffusion prior module', dataset: 'SYSU-MM01', metrics: { 'Rank-1': 63.4, 'mAP': 61.9 }, conclusion: '扩散先验带来显著提升', isEffective: true, createdAt: '2026-05-10' },
  { id: 'e4', studentId: 's2', projectId: 'p2', experimentNumber: 'V001', changeDescription: 'Baseline (VideoFusion)', dataset: 'UCF-101', metrics: { 'FVD': 420, 'IS': 45.2 }, conclusion: 'Baseline 复现', isEffective: false, createdAt: '2026-03-15' },
  { id: 'e5', studentId: 's2', projectId: 'p2', experimentNumber: 'V002', changeDescription: '+ Cascaded diffusion (2-stage)', dataset: 'UCF-101', metrics: { 'FVD': 310, 'IS': 52.8 }, conclusion: '级联策略有效降低 FVD', isEffective: true, createdAt: '2026-04-20' },
  { id: 'e6', studentId: 's2', projectId: 'p2', experimentNumber: 'V003', changeDescription: '+ Temporal consistency loss', dataset: 'UCF-101', metrics: { 'FVD': 245, 'IS': 56.1 }, conclusion: '时序一致性损失有效', isEffective: true, createdAt: '2026-05-25' },
  { id: 'e7', studentId: 's4', projectId: 'p4', experimentNumber: 'T001', changeDescription: 'Baseline (CLIP-ViT)', dataset: 'Flickr30K', metrics: { 'R@1': 72.3, 'R@5': 90.1 }, conclusion: 'Baseline 确认', isEffective: false, createdAt: '2026-03-01' },
  { id: 'e8', studentId: 's4', projectId: 'p4', experimentNumber: 'T002', changeDescription: '+ Hierarchical alignment (coarse)', dataset: 'Flickr30K', metrics: { 'R@1': 75.8, 'R@5': 92.4 }, conclusion: '粗粒度对齐有效', isEffective: true, createdAt: '2026-04-01' },
  { id: 'e9', studentId: 's4', projectId: 'p4', experimentNumber: 'T003', changeDescription: '+ Hierarchical alignment (fine)', dataset: 'Flickr30K', metrics: { 'R@1': 79.2, 'R@5': 94.7 }, conclusion: '细粒度对齐进一步提升', isEffective: true, createdAt: '2026-05-01' },
  { id: 'e10', studentId: 's6', projectId: 'p6', experimentNumber: 'M001', changeDescription: 'SAM-Med2D baseline', dataset: 'Synapse', metrics: { 'Dice': 78.5, 'HD95': 12.3 }, conclusion: 'Baseline 复现', isEffective: false, createdAt: '2026-05-01' },
  { id: 'e11', studentId: 's6', projectId: 'p6', experimentNumber: 'M002', changeDescription: '+ Lightweight Adapter', dataset: 'Synapse', metrics: { 'Dice': 83.2, 'HD95': 8.7 }, conclusion: 'Adapter 有效提升 4.7 Dice', isEffective: true, createdAt: '2026-05-20' },
  { id: 'e12', studentId: 's7', projectId: 'p7', experimentNumber: 'L001', changeDescription: 'Baseline (VideoMAE)', dataset: 'EgoSchema', metrics: { 'Accuracy': 62.1 }, conclusion: 'Baseline 确认', isEffective: false, createdAt: '2026-04-01' },
  { id: 'e13', studentId: 's7', projectId: 'p7', experimentNumber: 'L002', changeDescription: '+ Memory tokens (64)', dataset: 'EgoSchema', metrics: { 'Accuracy': 68.5 }, conclusion: '记忆 token 机制有效', isEffective: true, createdAt: '2026-05-01' },
  { id: 'e14', studentId: 's8', projectId: 'p8', experimentNumber: 'D001', changeDescription: 'Baseline (LCM distillation)', dataset: 'COCO 256', metrics: { 'FID': 8.2, 'CLIP': 0.28 }, conclusion: 'Baseline 确认', isEffective: false, createdAt: '2026-04-01' },
  { id: 'e15', studentId: 's8', projectId: 'p8', experimentNumber: 'D002', changeDescription: '+ Consistency distillation (ours)', dataset: 'COCO 256', metrics: { 'FID': 5.1, 'CLIP': 0.31 }, conclusion: 'FID 降低 37.8%，效果显著', isEffective: true, createdAt: '2026-05-15' },
]

// ---- Risk Alerts (8) ----
export const mockRiskAlerts: RiskAlert[] = [
  { id: 'ra1', studentId: 's5', studentName: '孙浩然', type: 'experiment', level: 'critical', description: '孙浩然已超过 3 周未更新实验进度，3D 检测项目处于停滞状态', suggestion: '立即安排一对一沟通，了解具体困难，必要时调整任务分配', createdAt: '2026-06-10' },
  { id: 'ra2', studentId: 's5', studentName: '孙浩然', type: 'graduation', level: 'critical', description: '研三学生毕业论文尚未开始撰写，预计毕业年份为 2026 年', suggestion: '立即启动毕业论文工作，优先保证毕业要求', createdAt: '2026-06-10' },
  { id: 'ra3', studentId: 's4', studentName: '赵雨桐', type: 'submission', level: 'high', description: 'ACL 2027 DDL 为 2026-07-01，论文全文完成度仅 70%，剩余 19 天', suggestion: '集中精力攻坚写作，考虑安排同学协助图表整理', createdAt: '2026-06-10' },
  { id: 'ra4', studentId: 's4', studentName: '赵雨桐', type: 'writing', level: 'high', description: '论文写作进度落后于预期，Related Work 和 Experiment 部分尚未完成', suggestion: '建议每天固定写作时间，周五前完成 Related Work 初稿', createdAt: '2026-06-10' },
  { id: 'ra5', studentId: 's1', studentName: '陈明远', type: 'progress', level: 'medium', description: '消融实验进度 55%，距离 NeurIPS DDL 还有约 1 个月', suggestion: '优先完成最关键的消融实验，非核心实验可放在 rebuttal 后补充', createdAt: '2026-06-10' },
  { id: 'ra6', studentId: 's11', studentName: '刘一鸣', type: 'experiment', level: 'medium', description: 'RL 仿真环境 Isaac Gym 存在 CUDA 兼容问题，已阻塞 1 周', suggestion: '尝试降级 Isaac Gym 版本或切换至 Isaac Sim', createdAt: '2026-06-10' },
  { id: 'ra7', studentId: 's6', studentName: '周子涵', type: 'progress', level: 'medium', description: '医学分割项目实验进度 55%，低于组内平均水平', suggestion: '增加实验频率，考虑先聚焦单个器官数据集完成论文', createdAt: '2026-06-10' },
  { id: 'ra8', studentId: 's12', studentName: '何雨萱', type: 'progress', level: 'medium', description: '研一学生何雨萱处于休学状态，已超过 3 个月未更新', suggestion: '与李副教授确认学生状态和预计复学时间', createdAt: '2026-06-10' },
]

// ---- Settings ----
export const mockSettings: LabSettings = {
  labName: '智能感知与计算实验室 (IPC Lab)',
  supervisorName: '赵志伟',
  defaultMeetingTime: '每周一 14:00-17:00',
  defaultMeetingLocation: '实验室 401',
  defaultMeetingLink: 'https://meeting.tencent.com/xxx',
  studentGrades: ['大一', '大二', '大三', '大四', '研一', '研二', '研三', '导师'],
  researchDirections: [
    '多模态行人重识别',
    '视频生成与扩散模型',
    '大模型推理加速',
    '图文检索与跨模态对齐',
    '自动驾驶感知',
    '医学图像分割',
    '长视频理解',
    '扩散模型蒸馏',
    '多模态大模型',
    '3D 视觉与 NeRF',
    '强化学习与具身智能',
    '语音合成与转换',
  ],
  conferenceFields: ['CV', 'NLP', 'ML', 'Data Mining', 'Robotics', 'Multi-modal'],
}

// ---- Dashboard Helpers ----
export function getDashboardStats() {
  const now = '2026-06-12'
  const upcomingMeetings = mockMeetings.filter(m => m.status === 'upcoming')
  const activeProjects = mockProjects.filter(p => !['accepted'].includes(p.stage))
  const delayedTasks = mockTasks.filter(t => t.isDelayed || (t.dueDate < now && t.status !== 'done'))
  const highRiskProjects = mockProjects.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical')
  const activeStudents = mockStudents.filter(s => s.status === 'active')

  // Find next upcoming deadline
  const futureConfs = mockConferences
    .filter(c => c.fullPaperDeadline > now)
    .sort((a, b) => a.fullPaperDeadline.localeCompare(b.fullPaperDeadline))
  const nextDdlDays = futureConfs.length > 0
    ? Math.max(0, Math.ceil((new Date(futureConfs[0].fullPaperDeadline).getTime() - new Date(now).getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  return {
    totalStudents: activeStudents.length,
    weeklyMeetings: upcomingMeetings.length,
    activeProjects: activeProjects.length,
    delayedTasks: delayedTasks.length,
    highRiskProjects: highRiskProjects.length,
    nextDdlDays,
  }
}

export function getUpcomingDdls(limit: number = 5) {
  const now = '2026-06-12'
  return mockConferences
    .filter(c => c.fullPaperDeadline > now || c.abstractDeadline > now)
    .sort((a, b) => a.fullPaperDeadline.localeCompare(b.fullPaperDeadline))
    .slice(0, limit)
}

export function getStudentsByGrade() {
  const grades: Record<string, number> = {}
  mockStudents.forEach(s => {
    if (s.status === 'active') {
      grades[s.grade] = (grades[s.grade] || 0) + 1
    }
  })
  return Object.entries(grades).map(([grade, count]) => ({ grade, count }))
}

export function getProjectStageDistribution() {
  const stages: Record<string, number> = {}
  mockProjects.forEach(p => {
    stages[p.stage] = (stages[p.stage] || 0) + 1
  })
  return Object.entries(stages).map(([stage, count]) => ({ stage, count }))
}

export function getMonthlyTaskTrend() {
  const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06']
  return months.map(month => ({
    month,
    completed: Math.floor(Math.random() * 15) + 5,
    created: Math.floor(Math.random() * 10) + 8,
  }))
}
