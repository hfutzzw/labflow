'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SectionHeader from '@/components/shared/SectionHeader'
import { mockSettings } from '@/lib/mock-data'

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)

  const updateSettings = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-[900px] mx-auto space-y-8">
      <SectionHeader
        title="设置"
        description="管理课题组基本信息和默认配置"
        action={
          <Button size="sm" className="gap-2">
            <Save className="w-4 h-4" />保存设置
          </Button>
        }
      />

      {/* Lab Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">课题组信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="labName">课题组名称</Label>
            <Input
              id="labName"
              value={settings.labName}
              onChange={e => updateSettings('labName', e.target.value)}
              className="bg-card border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="supervisorName">导师姓名</Label>
            <Input
              id="supervisorName"
              value={settings.supervisorName}
              onChange={e => updateSettings('supervisorName', e.target.value)}
              className="bg-card border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Meeting Defaults */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">组会默认设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="meetingTime">默认组会时间</Label>
            <Input
              id="meetingTime"
              value={settings.defaultMeetingTime}
              onChange={e => updateSettings('defaultMeetingTime', e.target.value)}
              className="bg-card border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="meetingLocation">默认组会地点</Label>
            <Input
              id="meetingLocation"
              value={settings.defaultMeetingLocation}
              onChange={e => updateSettings('defaultMeetingLocation', e.target.value)}
              className="bg-card border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="meetingLink">默认会议链接</Label>
            <Input
              id="meetingLink"
              value={settings.defaultMeetingLink}
              onChange={e => updateSettings('defaultMeetingLink', e.target.value)}
              placeholder="腾讯会议 / Zoom / 飞书会议链接"
              className="bg-card border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Student Grades */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">学生年级配置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {settings.studentGrades.map(grade => (
              <span
                key={grade}
                className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-muted-foreground border border-border"
              >
                {grade}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Research Directions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">研究方向标签</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {settings.researchDirections.map(dir => (
              <span
                key={dir}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-sm font-medium text-blue-700 border border-blue-100"
              >
                {dir}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conference Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">会议领域标签</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {settings.conferenceFields.map(field => (
              <span
                key={field}
                className="px-3 py-1.5 rounded-lg bg-violet-50 text-sm font-medium text-violet-700 border border-violet-100"
              >
                {field}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground text-center pb-8">
        当前为本地 Demo 版本，设置不会实际保存。后续接入 Supabase 后将支持持久化存储。
      </p>
    </div>
  )
}
