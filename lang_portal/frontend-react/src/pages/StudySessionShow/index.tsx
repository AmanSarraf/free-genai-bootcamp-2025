import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { getStudySession } from '../../services/api';
import type { StudySessionDetails } from '../../types/api';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function StudySessionShow() {
  const { id } = useParams();
  const [session, setSession] = useState<StudySessionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      
      try {
        const response = await getStudySession(Number(id));
        setSession(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load study session details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!session) return <ErrorState message="Session not found" />;

  const duration = session.end_time
    ? Math.round((new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / 1000 / 60)
    : 0;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Study Session Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activity Information
              </Typography>
              <Typography variant="body1">
                Activity: {session.activity_name}
              </Typography>
              <Typography variant="body1">
                Group: {session.group_name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Session Statistics
              </Typography>
              <Typography variant="body1">
                Review Items: {session.review_items_count}
              </Typography>
              <Typography variant="body1">
                Duration: {duration} minutes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Timeline
              </Typography>
              <Typography variant="body1">
                Started: {new Date(session.start_time).toLocaleString()}
              </Typography>
              {session.end_time && (
                <Typography variant="body1">
                  Ended: {new Date(session.end_time).toLocaleString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
