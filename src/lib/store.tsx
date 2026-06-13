'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import { toast } from 'sonner'
import type { Student, Task, Meeting, Project, Conference } from '@/types'
import * as api from '@/lib/data-service'

interface AppState {
  students: Student[]; tasks: Task[]; meetings: Meeting[]
  projects: Project[]; conferences: Conference[]; loaded: boolean
}

type Action =
  | { type: 'SET'; key: keyof AppState; data: any }
  | { type: 'LOAD_ALL'; data: Partial<AppState> }
  | { type: 'ADD_ITEM'; key: keyof AppState; item: any }
  | { type: 'UPDATE_ITEM'; key: keyof AppState; item: any }
  | { type: 'DELETE_ITEM'; key: keyof AppState; id: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.key]: action.data }
    case 'LOAD_ALL':
      return { ...state, ...action.data, loaded: true }
    case 'ADD_ITEM':
      return { ...state, [action.key]: [...(state[action.key] as any[]), action.item] }
    case 'UPDATE_ITEM':
      return { ...state, [action.key]: (state[action.key] as any[]).map((i: any) => i.id === action.item.id ? action.item : i) }
    case 'DELETE_ITEM':
      return { ...state, [action.key]: (state[action.key] as any[]).filter((i: any) => i.id !== action.id) }
    default: return state
  }
}

const empty: AppState = { students: [], tasks: [], meetings: [], projects: [], conferences: [], loaded: false }

const StoreContext = createContext<{
  state: AppState
  reload: () => Promise<void>
  addStudent: (s: Partial<Student>) => Promise<Student | null>
  updateStudent: (id: string, s: Partial<Student>) => Promise<void>
  deleteStudent: (id: string) => Promise<void>
  addTask: (t: Partial<Task>) => Promise<Task | null>
  updateTask: (t: Partial<Task>) => Promise<void>
  addMeeting: (m: Partial<Meeting>) => Promise<Meeting | null>
} | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, empty)

  const loadAll = useCallback(async () => {
    const [students, tasks, meetings, projects, conferences] = await Promise.all([
      api.getStudents(), api.getTasks(), api.getMeetings(),
      api.getProjects(), api.getConferences(),
    ])
    dispatch({ type: 'LOAD_ALL', data: { students, tasks, meetings, projects, conferences } })
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const addStudent = useCallback(async (s: Partial<Student>) => {
    const { data, error } = await api.createStudent(s)
    if (error) { toast.error(`添加失败: ${error}`); return null }
    if (data) {
      dispatch({ type: 'ADD_ITEM', key: 'students', item: data })
      toast.success(`已添加学生: ${data.name}`)
    }
    return data
  }, [])

  const updateStudent = useCallback(async (id: string, s: Partial<Student>) => {
    const { data, error } = await api.updateStudent(id, s)
    if (error) { toast.error(`更新失败: ${error}`); return }
    if (data) {
      dispatch({ type: 'UPDATE_ITEM', key: 'students', item: data })
      toast.success(`已更新: ${data.name}`)
    }
  }, [])

  const deleteStudent = useCallback(async (id: string) => {
    const { success, error } = await api.deleteStudent(id)
    if (error) { toast.error(`删除失败: ${error}`); return }
    if (success) {
      dispatch({ type: 'DELETE_ITEM', key: 'students', id })
      toast.success('已删除')
    }
  }, [])

  const addTask = useCallback(async (t: Partial<Task>) => {
    const { data, error } = await api.createTask(t)
    if (error) { toast.error(`创建任务失败: ${error}`); return null }
    if (data) {
      dispatch({ type: 'ADD_ITEM', key: 'tasks', item: data })
      toast.success(`已创建任务: ${data.title}`)
    }
    return data
  }, [])

  const updateTask = useCallback(async (t: Partial<Task>) => {
    const { data, error } = await api.updateTask(t.id!, t)
    if (error) { toast.error(`更新失败: ${error}`); return }
    if (data) { dispatch({ type: 'UPDATE_ITEM', key: 'tasks', item: data }) }
  }, [])

  const addMeeting = useCallback(async (m: Partial<Meeting>) => {
    const { data, error } = await api.createMeeting(m)
    if (error) { toast.error(`创建组会失败: ${error}`); return null }
    if (data) {
      dispatch({ type: 'ADD_ITEM', key: 'meetings', item: data })
      toast.success(`已安排组会: ${data.date}`)
    }
    return data
  }, [])

  return (
    <StoreContext.Provider value={{ state, reload: loadAll, addStudent, updateStudent, deleteStudent, addTask, updateTask, addMeeting }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
