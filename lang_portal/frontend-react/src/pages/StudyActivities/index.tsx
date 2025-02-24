import { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { getStudyActivities } from '../../services/api';
import type { StudyActivity } from '../../types/api';
import StudyActivityCard from './components/StudyActivityCard';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function StudyActivities() {
  const [activities, setActivities] = useState<StudyActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getStudyActivities();
        setActivities(response.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load study activities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Study Activities
      </Typography>
      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <StudyActivityCard activity={activity} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
