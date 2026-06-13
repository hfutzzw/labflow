-- ============================================================
-- LabOS Seed Data — 将 mock 数据导入 Supabase
-- 在 SQL Editor 中执行 schema.sql 之后再执行此文件
-- ============================================================

-- Students
INSERT INTO students (id, name, grade, degree, enrollment_year, expected_graduation_year, research_direction, supervisor, status, risk_level, current_project, current_task, experiment_progress, writing_progress, last_updated) VALUES
('a0000001-0001-0001-0001-000000000001', '陈明远', '博三', 'phd', 2023, 2027, '多模态行人重识别', '张教授', 'active', 'medium', 'Cross-Modal Person ReID with Diffusion Prior', '补充消融实验', 72, 45, '2026-06-11'),
('a0000001-0001-0001-0001-000000000002', '林雪怡', '博二', 'phd', 2024, 2028, '视频生成与扩散模型', '张教授', 'active', 'low', 'Long-Form Video Generation via Cascaded Diffusion', '主实验调参', 85, 60, '2026-06-10'),
('a0000001-0001-0001-0001-000000000003', '王昊天', '博一', 'phd', 2025, 2029, '大模型推理加速', '张教授', 'active', 'low', 'Speculative Decoding for Multimodal LLMs', '复现 baseline', 30, 5, '2026-06-12'),
('a0000001-0001-0001-0001-000000000004', '赵雨桐', '研三', 'master', 2023, 2026, '图文检索与跨模态对齐', '李副教授', 'active', 'high', 'Fine-Grained Image-Text Retrieval via Hierarchical Alignment', '赶论文全文', 90, 70, '2026-06-08'),
('a0000001-0001-0001-0001-000000000005', '孙浩然', '研三', 'master', 2023, 2026, '自动驾驶感知', '李副教授', 'active', 'critical', '3D Object Detection in Adverse Weather', '补充对比实验', 50, 30, '2026-05-20'),
('a0000001-0001-0001-0001-000000000006', '周子涵', '研二', 'master', 2024, 2027, '医学图像分割', '张教授', 'active', 'medium', 'Few-Shot Medical Image Segmentation with SAM Adapter', '跑主实验', 55, 20, '2026-06-09'),
('a0000001-0001-0001-0001-000000000007', '吴嘉宁', '研二', 'master', 2024, 2027, '长视频理解', '李副教授', 'active', 'low', 'Efficient Long Video Understanding via Memory Tokens', '整理实验结果表格', 80, 55, '2026-06-11'),
('a0000001-0001-0001-0001-000000000008', '郑思远', '研二', 'master', 2024, 2027, '扩散模型蒸馏', '张教授', 'active', 'low', 'One-Step Diffusion via Consistency Distillation', '写论文 method 部分', 95, 75, '2026-06-12'),
('a0000001-0001-0001-0001-000000000009', '冯小曼', '研一', 'master', 2025, 2028, '多模态大模型', '张教授', 'active', 'medium', 'Visual Instruction Tuning for Domain-Specific Tasks', '读论文 + 做调研', 15, 0, '2026-06-10'),
('a0000001-0001-0001-0001-000000000010', '黄志远', '研一', 'master', 2025, 2028, '3D 视觉与 NeRF', '李副教授', 'active', 'low', 'Feed-Forward 3D Gaussian Splatting for Novel View Synthesis', '复现 baseline', 25, 0, '2026-06-11'),
('a0000001-0001-0001-0001-000000000011', '刘一鸣', '博二', 'phd', 2024, 2028, '强化学习与具身智能', '张教授', 'active', 'medium', 'RL-based Dexterous Manipulation with Tactile Feedback', '调试仿真环境', 40, 10, '2026-06-07'),
('a0000001-0001-0001-0001-000000000012', '何雨萱', '研一', 'master', 2025, 2028, '语音合成与转换', '李副教授', 'leave', 'low', NULL, NULL, 0, 0, '2026-03-15');

-- Conferences (15) — 2026-2028 投稿周期
INSERT INTO conferences (name, year, field, ccf_level, abstract_deadline, full_paper_deadline, supplementary_deadline, rebuttal_start, rebuttal_end, notification_date, website, location) VALUES
('NeurIPS', 2026, 'ML', 'A', '2026-05-15', '2026-05-22', '2026-05-29', '2026-08-01', '2026-08-14', '2026-09-15', 'https://neurips.cc', 'Vancouver, Canada'),
('ICLR', 2027, 'ML', 'A', '2026-09-28', '2026-10-05', '2026-10-12', '2027-01-10', '2027-01-25', '2027-02-15', 'https://iclr.cc', 'Singapore'),
('CVPR', 2027, 'CV', 'A', '2026-11-09', '2026-11-16', '2026-11-23', '2027-01-20', '2027-02-03', '2027-03-02', 'https://cvpr.thecvf.com', 'Honolulu, USA'),
('ICCV', 2027, 'CV', 'A', '2027-03-15', '2027-03-22', '2027-03-29', '2027-06-01', '2027-06-15', '2027-07-22', 'https://iccv.thecvf.com', 'Paris, France'),
('ACL', 2027, 'NLP', 'A', '2026-07-15', '2026-07-22', '2026-07-29', '2026-09-10', '2026-09-24', '2026-10-20', 'https://2027.aclweb.org', 'Barcelona, Spain'),
('MICCAI', 2027, 'CV', 'B', '2027-02-20', '2027-02-27', '2027-03-06', '2027-05-01', '2027-05-15', '2027-06-10', 'https://miccai2027.org', 'Tokyo, Japan'),
('ICML', 2027, 'ML', 'A', '2027-01-26', '2027-02-02', '2027-02-09', '2027-04-10', '2027-04-25', '2027-05-25', 'https://icml.cc', 'Honolulu, USA'),
('AAAI', 2027, 'ML', 'A', '2026-08-08', '2026-08-15', '2026-08-22', '2026-10-10', '2026-10-25', '2026-11-18', 'https://aaai.org', 'Philadelphia, USA'),
('ECCV', 2028, 'CV', 'B', '2028-03-07', '2028-03-14', '2028-03-21', '2028-05-10', '2028-05-24', '2028-07-01', 'https://eccv2028.ecva.net', 'Munich, Germany'),
('EMNLP', 2026, 'NLP', 'B', '2026-06-17', '2026-06-24', '2026-07-01', '2026-08-15', '2026-08-30', '2026-10-01', 'https://2026.emnlp.org', 'Hong Kong'),
('IJCAI', 2027, 'ML', 'A', '2027-01-13', '2027-01-20', '2027-01-27', '2027-03-10', '2027-03-25', '2027-04-22', 'https://ijcai-27.org', 'Melbourne, Australia'),
('ACM MM', 2027, 'Multi-modal', 'A', '2027-04-08', '2027-04-15', '2027-04-22', '2027-06-10', '2027-06-25', '2027-07-20', 'https://acmmm2027.org', 'Seoul, Korea'),
('KDD', 2027, 'Data Mining', 'A', '2027-02-06', '2027-02-13', '2027-02-20', '2027-04-10', '2027-04-25', '2027-05-18', 'https://kdd2027.kdd.org', 'Chicago, USA'),
('WWW', 2027, 'Data Mining', 'A', '2026-10-08', '2026-10-15', '2026-10-22', '2026-12-10', '2026-12-24', '2027-01-25', 'https://www2027.thewebconf.org', 'Austin, USA'),
('SIGIR', 2027, 'Data Mining', 'A', '2027-01-27', '2027-02-03', '2027-02-10', '2027-03-20', '2027-04-05', '2027-04-25', 'https://sigir.org/sigir2027/', 'Amsterdam, Netherlands');

-- Lab Settings (update the default row from schema.sql)
UPDATE lab_settings SET
  lab_name = '智能感知与计算实验室 (IPC Lab)',
  supervisor_name = '张教授',
  default_meeting_time = '每周一 14:00-17:00',
  default_meeting_location = '实验室 401',
  default_meeting_link = 'https://meeting.tencent.com/xxx',
  student_grades = ARRAY['研一','研二','研三','博一','博二','博三','博四','博五'],
  research_directions = ARRAY['多模态行人重识别','视频生成与扩散模型','大模型推理加速','图文检索与跨模态对齐','自动驾驶感知','医学图像分割','长视频理解','扩散模型蒸馏','多模态大模型','3D 视觉与 NeRF','强化学习与具身智能','语音合成与转换'],
  conference_fields = ARRAY['CV','NLP','ML','Data Mining','Robotics','Multi-modal']
WHERE id = 1;
