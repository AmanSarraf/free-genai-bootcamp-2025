import { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getGroups } from '../../services/api';
import type { Group } from '../../types/api';
import PaginatedTable from '../../components/shared/PaginatedTable';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups(page);
        setGroups(response.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load groups');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [page]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'word_count', label: 'Words' },
    {
      id: 'actions',
      label: 'Actions',
      render: (value: any, row: Group) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/groups/${row.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4">
            Groups
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate('/groups/new')}
          >
            Create New Group
          </Button>
        </Grid>
      </Grid>

      <PaginatedTable
        columns={columns}
        data={groups}
        pagination={{
          current_page: page,
          total_pages: Math.ceil(groups.length / 10),
          total_items: groups.length,
          items_per_page: 10
        }}
        onPageChange={setPage}
      />
    </Container>
  );
}
