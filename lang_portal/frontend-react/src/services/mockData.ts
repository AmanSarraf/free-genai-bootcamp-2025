// Mock data for development
export const mockData = {
  lastStudySession: {
    id: 1,
    group_id: 1,
    created_at: new Date().toISOString(),
    study_activity_id: 1,
    group_name: 'Basic Japanese',
    activity_name: 'Flashcards'
  },

  studyProgress: {
    total_words_studied: 150,
    total_available_words: 300
  },

  quickStats: {
    success_rate: 75,
    total_study_sessions: 25,
    total_active_groups: 5,
    study_streak_days: 7
  },

  studyActivities: {
    items: [
      {
        id: 1,
        name: 'Flashcards',
        thumbnail_url: 'https://via.placeholder.com/300x200',
        description: 'Practice vocabulary with flashcards'
      },
      {
        id: 2,
        name: 'Multiple Choice',
        thumbnail_url: 'https://via.placeholder.com/300x200',
        description: 'Test your knowledge with multiple choice questions'
      }
    ],
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: 2,
      items_per_page: 10
    }
  },

  words: {
    items: [
      {
        japanese: '猫',
        romaji: 'neko',
        english: 'cat',
        correct_count: 10,
        wrong_count: 2
      },
      {
        japanese: '犬',
        romaji: 'inu',
        english: 'dog',
        correct_count: 8,
        wrong_count: 3
      }
    ],
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: 2,
      items_per_page: 10
    }
  },

  groups: {
    items: [
      {
        id: 1,
        name: 'Basic Japanese',
        word_count: 100
      },
      {
        id: 2,
        name: 'JLPT N5',
        word_count: 200
      }
    ],
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: 2,
      items_per_page: 10
    }
  },

  studySessions: {
    items: [
      {
        id: 1,
        activity_name: 'Flashcards',
        group_name: 'Basic Japanese',
        start_time: new Date(Date.now() - 3600000).toISOString(),
        end_time: new Date().toISOString(),
        review_items_count: 25
      }
    ],
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: 1,
      items_per_page: 10
    }
  }
};
