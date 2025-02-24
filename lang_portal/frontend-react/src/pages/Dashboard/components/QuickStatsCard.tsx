import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { QuickStats } from '../../../types/api';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import SchoolIcon from '@mui/icons-material/School';

interface QuickStatsCardProps {
  stats: QuickStats | null;
}

export default function QuickStatsCard({ stats }: QuickStatsCardProps) {
  if (!stats) {
    return (
      <Card sx={{ height: '100%', minHeight: 200 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Stats
          </Typography>
          <Typography color="text.secondary">
            No stats available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const statItems = [
    {
      icon: <SchoolIcon color="primary" />,
      label: 'Words Learned',
      value: stats.total_words_learned,
    },
    {
      icon: <TimerIcon color="primary" />,
      label: 'Study Hours',
      value: `${stats.total_study_hours}h`,
    },
    {
      icon: <TrendingUpIcon color="primary" />,
      label: 'Current Streak',
      value: `${stats.current_streak} days`,
    },
  ];

  return (
    <Card sx={{ height: '100%', minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        
        <Grid container spacing={2}>
          {statItems.map((item) => (
            <Grid item xs={12} key={item.label}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}>
                {item.icon}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h6">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
