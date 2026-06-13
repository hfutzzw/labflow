-- 修正所有会议 DDL 日期（直接在 Supabase SQL Editor 执行）
DELETE FROM conferences;

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
