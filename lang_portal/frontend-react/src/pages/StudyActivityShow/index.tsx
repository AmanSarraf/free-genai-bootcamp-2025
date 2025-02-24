import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  Button,
  Box
} from '@mui/material';
import { getStudyActivity, getStudyActivitySessions } from '../../services/api';
import type { StudyActivity, StudySession } from '../../types/api';
import PaginatedTable from '../../components/shared/PaginatedTable';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function StudyActivityShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<StudyActivity | null>(null);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const [activityRes, sessionsRes] = await Promise.all([
          getStudyActivity(Number(id)),
          getStudyActivitySessions(Number(id), page)
        ]);

        setActivity(activityRes.data);
        setSessions(sessionsRes.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load study activity details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!activity) return <ErrorState message="Activity not found" />;

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'activity_name', label: 'Activity' },
    { id: 'group_name', label: 'Group' },
    { 
      id: 'start_time', 
      label: 'Start Time',
      render: (value: string) => new Date(value).toLocaleString()
    },
    { 
      id: 'end_time', 
      label: 'End Time',
      render: (value: string) => new Date(value).toLocaleString()
    },
    { id: 'review_items_count', label: 'Review Items' },
  ];

  return (
    <Container>
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="200"
          image={activity.thumbnail_url}
          alt={activity.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {activity.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {activity.description}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/study_activities/${id}/launch`)}
          >
            Launch Activity
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Past Study Sessions
        </Typography>
        <PaginatedTable
          columns={columns}
          data={sessions}
          pagination={{
            current_page: page,
            total_pages: Math.ceil(sessions.length / 10),
            total_items: sessions.length,
            items_per_page: 10
          }}
          onPageChange={setPage}
        />
      </Box>
    </Container>
  );
}
