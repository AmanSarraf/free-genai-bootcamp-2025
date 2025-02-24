import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { getStudyActivity, getGroups, createStudyActivity } from '../../services/api';
import type { StudyActivity, Group } from '../../types/api';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function StudyActivityLaunch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<StudyActivity | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const [activityRes, groupsRes] = await Promise.all([
          getStudyActivity(Number(id)),
          getGroups()
        ]);

        setActivity(activityRes.data);
        setGroups(groupsRes.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load launch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleGroupChange = (event: SelectChangeEvent) => {
    setSelectedGroup(event.target.value);
  };

  const handleLaunch = async () => {
    if (!id || !selectedGroup) return;

    try {
      const response = await createStudyActivity(
        Number(selectedGroup),
        Number(id)
      );
      
      // Open study activity in new tab
      window.open(activity?.url, '_blank');
      
      // Navigate to study session page
      navigate(`/study_sessions/${response.data.id}`);
    } catch (err) {
      setError('Failed to launch study activity');
      console.error(err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!activity) return <ErrorState message="Activity not found" />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Launch {activity.name}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="group-select-label">Select Group</InputLabel>
          <Select
            labelId="group-select-label"
            value={selectedGroup}
            label="Select Group"
            onChange={handleGroupChange}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name} ({group.word_count} words)
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLaunch}
          disabled={!selectedGroup}
        >
          Launch Now
        </Button>
      </Box>
    </Container>
  );
}
