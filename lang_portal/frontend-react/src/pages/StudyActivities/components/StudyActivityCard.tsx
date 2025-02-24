import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { StudyActivity } from '../../../types/api';

interface StudyActivityCardProps {
  activity: StudyActivity;
}

export default function StudyActivityCard({ activity }: StudyActivityCardProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={activity.thumbnail_url}
        alt={activity.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {activity.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {activity.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/study_activities/${activity.id}/launch`)}
          >
            Launch
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/study_activities/${activity.id}`)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
