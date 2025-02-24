import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import type { StudyProgress } from '../../../types/api';

interface StudyProgressCardProps {
  progress: StudyProgress | null;
}

export default function StudyProgressCard({ progress }: StudyProgressCardProps) {
  if (!progress) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Study Progress</Typography>
          <Typography>No progress data available</Typography>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = Math.round(
    (progress.total_words_studied / progress.total_available_words) * 100
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Study Progress</Typography>
        <Typography variant="body2" gutterBottom>
          Words Studied: {progress.total_words_studied} / {progress.total_available_words}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Mastery: {progressPercentage}%
        </Typography>
      </CardContent>
    </Card>
  );
}
