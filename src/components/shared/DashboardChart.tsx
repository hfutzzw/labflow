'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'

const COLORS = {
  bar: '#6366f1',
  pie: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e0e7ff', '#eef2ff', '#f0f5ff'],
  lines: ['#6366f1', '#10b981'],
  grid: '#f1f5f9',
}

// ---- Bar Chart: Students by Grade ----
interface BarChartData {
  grade: string
  count: number
}

export function StudentsByGradeChart({ data }: { data: BarChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
        <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            fontSize: 13, padding: '8px 12px',
          }}
        />
        <Bar dataKey="count" name="学生数" fill={COLORS.bar} radius={[6, 6, 0, 0]} barSize={36} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ---- Pie Chart: Project Stage Distribution ----
interface PieChartData {
  stage: string
  count: number
}

export function ProjectStagePieChart({ data }: { data: PieChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={85}
          paddingAngle={3}
          dataKey="count"
          nameKey="stage"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS.pie[index % COLORS.pie.length]} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            fontSize: 13, padding: '8px 12px',
          }}
          formatter={(value, name) => [value, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

// ---- Line Chart: Monthly Task Trend ----
interface TrendData {
  month: string
  completed: number
  created: number
}

export function TaskTrendLineChart({ data }: { data: TrendData[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            fontSize: 13, padding: '8px 12px',
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          formatter={(value: string) => value === 'completed' ? '已完成' : '新建'}
        />
        <Line type="monotone" dataKey="completed" name="已完成" stroke={COLORS.lines[0]} strokeWidth={2} dot={{ r: 3, fill: COLORS.lines[0] }} />
        <Line type="monotone" dataKey="created" name="新建" stroke={COLORS.lines[1]} strokeWidth={2} dot={{ r: 3, fill: COLORS.lines[1] }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
