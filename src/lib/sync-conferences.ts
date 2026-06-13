// ============================================================
// Conference DDL Sync — multi-source with curated fallback
// ============================================================
import type { Conference, ConferenceField, CCFLevel } from '@/types'
import yaml from 'js-yaml'

interface RawConference {
  title: string; year: number; id?: string; full_name?: string; link?: string
  deadline: string; abstract_deadline?: string; timezone?: string; place?: string
  date?: string; start?: string; end?: string; sub?: string; hindex?: number; note?: string
}

// ---- Curated future deadlines (baseline fallback) ----
const CURATED: Partial<Conference>[] = [
  // --- 2026 即将截止 ---
  { name: 'EMNLP', year: 2026, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2026-06-17', fullPaperDeadline: '2026-06-24', website: 'https://2026.emnlp.org', location: 'Hong Kong' },
  { name: 'ACL', year: 2027, field: 'NLP', ccfLevel: 'A', abstractDeadline: '2026-07-15', fullPaperDeadline: '2026-07-22', website: 'https://2027.aclweb.org', location: 'Barcelona' },
  { name: 'WACV', year: 2027, field: 'CV', ccfLevel: 'B', abstractDeadline: '2026-07-10', fullPaperDeadline: '2026-07-17', website: 'https://wacv2027.thecvf.com', location: 'TBD' },
  { name: 'AAAI', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2026-08-15', fullPaperDeadline: '2026-08-22', website: 'https://aaai.org', location: 'Philadelphia' },
  // --- 2026 下半年 ---
  { name: 'ICRA', year: 2027, field: 'Robotics', ccfLevel: 'B', abstractDeadline: '2026-09-05', fullPaperDeadline: '2026-09-12', website: 'https://ieee-icra.org', location: 'TBD' },
  { name: 'ICLR', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2026-09-28', fullPaperDeadline: '2026-10-05', website: 'https://iclr.cc', location: 'Singapore' },
  { name: 'WWW', year: 2027, field: 'Data Mining', ccfLevel: 'A', abstractDeadline: '2026-10-15', fullPaperDeadline: '2026-10-22', website: 'https://www2027.thewebconf.org', location: 'Austin' },
  { name: 'CVPR', year: 2027, field: 'CV', ccfLevel: 'A', abstractDeadline: '2026-11-16', fullPaperDeadline: '2026-11-23', website: 'https://cvpr.thecvf.com', location: 'Honolulu' },
  { name: 'COLING', year: 2027, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2026-11-20', fullPaperDeadline: '2026-11-27', website: 'https://coling2027.org', location: 'TBD' },
  { name: 'NAACL', year: 2027, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2026-12-10', fullPaperDeadline: '2026-12-17', website: 'https://naacl.org', location: 'TBD' },
  // --- 2027 上半年 ---
  { name: 'IJCAI', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2027-01-13', fullPaperDeadline: '2027-01-20', website: 'https://ijcai.org', location: 'Melbourne' },
  { name: 'ICML', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2027-01-26', fullPaperDeadline: '2027-02-02', website: 'https://icml.cc', location: 'Honolulu' },
  { name: 'SIGIR', year: 2027, field: 'Data Mining', ccfLevel: 'A', abstractDeadline: '2027-02-03', fullPaperDeadline: '2027-02-10', website: 'https://sigir.org', location: 'Amsterdam' },
  { name: 'KDD', year: 2027, field: 'Data Mining', ccfLevel: 'A', abstractDeadline: '2027-02-13', fullPaperDeadline: '2027-02-20', website: 'https://kdd.org', location: 'Chicago' },
  { name: 'ICCV', year: 2027, field: 'CV', ccfLevel: 'A', abstractDeadline: '2027-03-22', fullPaperDeadline: '2027-03-29', website: 'https://iccv.thecvf.com', location: 'Paris' },
  { name: 'ACM MM', year: 2027, field: 'Multi-modal', ccfLevel: 'A', abstractDeadline: '2027-04-15', fullPaperDeadline: '2027-04-22', website: 'https://acmmm.org', location: 'Seoul' },
  { name: 'BMVC', year: 2027, field: 'CV', ccfLevel: 'B', abstractDeadline: '2027-04-20', fullPaperDeadline: '2027-04-27', website: 'https://bmvc2027.org', location: 'TBD' },
  { name: 'NeurIPS', year: 2027, field: 'ML', ccfLevel: 'A', abstractDeadline: '2027-05-20', fullPaperDeadline: '2027-05-27', website: 'https://neurips.cc', location: 'TBD' },
  { name: 'CIKM', year: 2027, field: 'Data Mining', ccfLevel: 'B', abstractDeadline: '2027-05-22', fullPaperDeadline: '2027-05-29', website: 'https://cikm2027.org', location: 'TBD' },
  { name: 'EMNLP', year: 2027, field: 'NLP', ccfLevel: 'B', abstractDeadline: '2027-06-17', fullPaperDeadline: '2027-06-24', website: 'https://2027.emnlp.org', location: 'TBD' },
  { name: 'ICDM', year: 2027, field: 'Data Mining', ccfLevel: 'B', abstractDeadline: '2027-06-27', fullPaperDeadline: '2027-07-04', website: 'https://icdm2027.org', location: 'TBD' },
  // --- 远期 ---
  { name: 'ECCV', year: 2028, field: 'CV', ccfLevel: 'B', abstractDeadline: '2028-03-07', fullPaperDeadline: '2028-03-14', website: 'https://eccv2028.ecva.net', location: 'Munich' },
]

function mapSubToField(sub: string): ConferenceField {
  const m: Record<string, ConferenceField> = { CV: 'CV', cv: 'CV', NLP: 'NLP', nlp: 'NLP', ML: 'ML', ml: 'ML', DM: 'Data Mining', data: 'Data Mining', RO: 'Robotics', MM: 'Multi-modal', multimodal: 'Multi-modal' }
  return m[sub] || 'ML'
}

function guessCCF(title: string): CCFLevel {
  const A = ['CVPR', 'ICCV', 'NeurIPS', 'ICML', 'ICLR', 'ACL', 'AAAI', 'IJCAI', 'ACM MM', 'KDD', 'WWW', 'SIGIR']
  const B = ['EMNLP', 'ECCV', 'MICCAI', 'NAACL', 'COLING', 'CIKM', 'ICDM', 'BMVC', 'WACV', 'ICRA', 'IROS']
  if (A.includes(title)) return 'A'
  if (B.includes(title)) return 'B'
  return 'C'
}

function parseDeadline(raw: string): string {
  return raw?.split(' ')[0] || raw || ''
}

function dedupe(list: Partial<Conference>[]): Partial<Conference>[] {
  const seen = new Set<string>()
  return list.filter(c => { const k = `${c.name}-${c.year}`; if (seen.has(k)) return false; seen.add(k); return true })
}

export async function fetchAndSyncConferences(): Promise<{ conferences: Partial<Conference>[]; source: string; error?: string }> {
  // Multiple sources, try each
  const sources = [
    { url: 'https://raw.githubusercontent.com/abhshkdz/ai-deadlines/gh-pages/_data/conferences.yml', label: 'ai-deadlines (GitHub)' },
    { url: 'https://raw.githubusercontent.com/nunoduarte/deadlines/gh-pages/_data/conferences.yml', label: 'deadlines (NunoDuarte)' },
    { url: 'https://raw.githubusercontent.com/uchuhimo/ccf-countdown/gh-pages/_data/conferences.yml', label: 'CCF Countdown' },
  ]

  let fetched: Partial<Conference>[] = []
  let usedSource = ''

  for (const { url, label } of sources) {
    try {
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) continue
      const text = await res.text()
      const rawList = yaml.load(text) as RawConference[]
      if (!Array.isArray(rawList)) continue
      const parsed = rawList
        .filter(c => c.title && c.deadline && !isNaN(new Date(c.deadline).getTime()))
        .map(c => ({
          name: c.title, year: c.year,
          field: mapSubToField(c.sub || 'ML'),
          ccfLevel: guessCCF(c.title),
          abstractDeadline: parseDeadline(c.abstract_deadline || ''),
          fullPaperDeadline: parseDeadline(c.deadline),
          website: c.link || '',
          location: c.place || '',
        }))
      if (parsed.length > 8) { fetched = parsed; usedSource = label; break }
    } catch { continue }
  }

  // Merge: online data first, then fill gaps with curated
  const merged = dedupe([...fetched, ...CURATED])
    .sort((a, b) => (a.fullPaperDeadline || '9999').localeCompare(b.fullPaperDeadline || '9999'))

  const label = fetched.length > 0 ? `${usedSource} + 内置 (${merged.length}个)` : `内置数据 (${merged.length}个)`
  return { conferences: merged, source: label }
}
