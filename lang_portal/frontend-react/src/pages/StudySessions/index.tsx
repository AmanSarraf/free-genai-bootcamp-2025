import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getStudySessions } from '../../services/api';
import type { StudySession } from '../../types/api';
import PaginatedTable from '../../components/shared/PaginatedTable';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function StudySessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getStudySessions(page);
        setSessions(response.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load study sessions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [page]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const columns = [
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
    {
      id: 'actions',
      label: 'Actions',
      render: (_: any, row: StudySession) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/study_sessions/${row.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Study Sessions
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
    </Container>
  );
}
