import axios from 'axios';
import type {
  LastStudySession,
  StudyProgress,
  QuickStats,
  StudyActivity,
  StudySession,
  Word,
  Group,
  StudySessionDetails,
  PaginatedResponse
} from '../types/api';
import { mockData } from './mockData';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use mock data in development
const USE_MOCK = import.meta.env.DEV;

// Dashboard API
export const getDashboardLastStudySession = () => 
  USE_MOCK 
    ? Promise.resolve({ data: mockData.lastStudySession })
    : api.get<LastStudySession>('/dashboard/last_study_session');

export const getDashboardStudyProgress = () => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studyProgress })
    : api.get<StudyProgress>('/dashboard/study_progress');

export const getDashboardQuickStats = () => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.quickStats })
    : api.get<QuickStats>('/dashboard/quick_stats');

// Study Activities API
export const getStudyActivities = () => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studyActivities })
    : api.get<PaginatedResponse<StudyActivity>>('/study_activities');

export const getStudyActivity = (id: number) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studyActivities.items.find(a => a.id === id) })
    : api.get<StudyActivity>(`/study_activities/${id}`);

export const getStudyActivitySessions = (id: number, page = 1) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studySessions })
    : api.get<PaginatedResponse<StudySession>>(`/study_activities/${id}/study_sessions`, {
        params: { page }
      });

export const createStudyActivity = (groupId: number, studyActivityId: number) => 
  USE_MOCK
    ? Promise.resolve({ data: { id: 1, group_id: groupId } })
    : api.post<{ id: number; group_id: number }>('/study_activities', {
        group_id: groupId,
        study_activity_id: studyActivityId
      });

// Words API
export const getWords = (page = 1) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.words })
    : api.get<PaginatedResponse<Word>>('/words', {
        params: { page }
      });

export const getWord = (id: number) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.words.items[0] })
    : api.get<Word>(`/words/${id}`);

// Groups API
export const getGroups = (page = 1) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.groups })
    : api.get<PaginatedResponse<Group>>('/groups', {
        params: { page }
      });

export const getGroup = (id: number) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.groups.items.find(g => g.id === id) })
    : api.get<Group>(`/groups/${id}`);

export const getGroupWords = (id: number, page = 1) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.words })
    : api.get<PaginatedResponse<Word>>(`/groups/${id}/words`, {
        params: { page }
      });

export const getGroupStudySessions = (id: number, page = 1) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studySessions })
    : api.get<PaginatedResponse<StudySession>>(`/groups/${id}/study_sessions`, {
        params: { page }
      });

// Study Sessions API
export const getStudySessions = (page = 1) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studySessions })
    : api.get<PaginatedResponse<StudySession>>('/study_sessions', {
        params: { page }
      });

export const getStudySession = (id: number) => 
  USE_MOCK
    ? Promise.resolve({ data: mockData.studySessions.items[0] })
    : api.get<StudySessionDetails>(`/study_sessions/${id}`);
