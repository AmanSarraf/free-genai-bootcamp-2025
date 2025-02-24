import { Card, CardContent, Typography, Box, Chip, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LastStudySession } from '../../../types/api';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface LastStudySessionCardProps {
  session: LastStudySession | null;
}

export default function LastStudySessionCard({ session }: LastStudySessionCardProps) {
  if (!session) {
    return (
      <Card sx={{ height: '100%', minHeight: 200 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Last Study Session
          </Typography>
          <Typography color="text.secondary">
            No recent study sessions
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Last Study Session
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {session.activity_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link component={RouterLink} to={`/groups/${session.group_id}`}>
              {session.group_name}
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {new Date(session.created_at).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {session.duration} min
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label={`${session.words_studied} words`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip 
            label={`${session.success_rate}% success`}
            size="small"
            color={session.success_rate >= 80 ? "success" : "warning"}
            variant="outlined"
          />
        </Box>
        <Link
          component={RouterLink}
          to={`/study_sessions/${session.id}`}
          color="primary"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
