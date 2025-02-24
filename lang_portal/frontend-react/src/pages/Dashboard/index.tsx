import { useEffect, useState } from 'react';
import { Grid, Container, Button, Typography, Box, LinearProgress, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  getDashboardLastStudySession,
  getDashboardProgress,
  getDashboardQuickStats,
} from '../../services/api';
import { LastStudySession, StudyProgress, QuickStats } from '../../types/api';
import LastStudySessionCard from './components/LastStudySessionCard';
import QuickStatsCard from './components/QuickStatsCard';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateStreakData = () => {
  const today = new Date();
  const data = [];
  
  // Get the first day of the current week (Sunday)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay());
  
  // Generate data for the last 52 weeks plus remaining days of the current week
  for (let week = 51; week >= -1; week--) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() - (week * 7) + day);
      
      // Only include dates up to today
      if (date <= today) {
        weekData.push({
          date,
          count: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : 0,
          month: date.getMonth(),
          dayOfWeek: date.getDay(),
        });
      }
    }
    if (weekData.length > 0) {
      data.push(weekData);
    }
  }
  return data;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [lastSession, setLastSession] = useState<LastStudySession | null>(null);
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [stats, setStats] = useState<QuickStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const streakData = generateStreakData();
  const successRate = progress?.success_rate ?? 0;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [lastSessionData, progressData, statsData] = await Promise.all([
          getDashboardLastStudySession(),
          getDashboardProgress(),
          getDashboardQuickStats(),
        ]);
        
        // For development, let's add some mock data
        const mockLastSession: LastStudySession = {
          id: '1',
          activity_name: 'Vocabulary Quiz',
          group_id: '1',
          group_name: 'Basic Japanese',
          created_at: new Date().toISOString(),
          duration: 30,
          words_studied: 20,
          success_rate: 85
        };

        const mockProgress: StudyProgress = {
          success_rate: 75,
          total_words: 500,
          words_mastered: 375
        };

        const mockStats: QuickStats = {
          total_words_learned: 375,
          total_study_hours: 24,
          current_streak: 5
        };

        setLastSession(mockLastSession);
        setProgress(mockProgress);
        setStats(mockStats);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        {/* GitHub-like Streak Visualization */}
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          bgcolor: 'white', 
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Typography variant="h6" gutterBottom>
            Study Streak
          </Typography>
          
          {/* Month Labels */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: '20px repeat(53, 1fr)',
            gap: 0.5,
            mb: 1
          }}>
            <Box /> {/* Empty space for weekday labels */}
            {streakData.map((week, i) => {
              const firstDayOfWeek = week[0]?.date;
              if (firstDayOfWeek && firstDayOfWeek.getDate() <= 7) {
                return (
                  <Typography
                    key={i}
                    variant="caption"
                    sx={{ 
                      fontSize: '8px',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    {MONTHS[firstDayOfWeek.getMonth()]}
                  </Typography>
                );
              }
              return <Box key={i} />;
            })}
          </Box>

          {/* Calendar Grid with Weekday Labels */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: '20px repeat(53, 1fr)',
            gap: 0.5,
          }}>
            {/* Weekday Labels */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateRows: 'repeat(7, 1fr)',
              gap: 0.5
            }}>
              {WEEKDAYS.map((day, i) => (
                <Typography
                  key={day}
                  variant="caption"
                  sx={{ 
                    fontSize: '8px',
                    lineHeight: '10px',
                    textAlign: 'right',
                    pr: 0.5,
                    color: 'text.secondary',
                    alignSelf: 'center'
                  }}
                >
                  {i % 2 === 0 ? day : ''}
                </Typography>
              ))}
            </Box>

            {/* Activity Squares */}
            {streakData.map((week, weekIndex) => (
              <Box
                key={weekIndex}
                sx={{
                  display: 'grid',
                  gridTemplateRows: 'repeat(7, 1fr)',
                  gap: 0.5
                }}
              >
                {WEEKDAYS.map((_, dayIndex) => {
                  const dayData = week.find(d => d.dayOfWeek === dayIndex);
                  if (!dayData) return <Box key={dayIndex} />;
                  
                  return (
                    <Box
                      key={dayIndex}
                      sx={{
                        aspectRatio: '1',
                        bgcolor: dayData.count === 0 
                          ? '#ebedf0'
                          : dayData.count < 2 
                            ? '#9be9a8'
                            : dayData.count < 3
                              ? '#40c463'
                              : dayData.count < 4
                                ? '#30a14e'
                                : '#216e39',
                        borderRadius: 0.5,
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.8,
                        },
                      }}
                      title={`${dayData.date.toLocaleDateString()}: ${dayData.count} studies`}
                    />
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LastStudySessionCard session={lastSession} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Success Rate
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  pt: 2 
                }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={successRate} 
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          bgcolor: successRate >= 80 ? '#2e7d32' : successRate >= 60 ? '#ed6c02' : '#d32f2f'
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Overall Performance
                    </Typography>
                    <Typography variant="h6" color={
                      successRate >= 80 ? 'success.main' : 
                      successRate >= 60 ? 'warning.main' : 
                      'error.main'
                    }>
                      {successRate}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickStatsCard stats={stats} />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/study_activities')}
            >
              Start Studying
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
