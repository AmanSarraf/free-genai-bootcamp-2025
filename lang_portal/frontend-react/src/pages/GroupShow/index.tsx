import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { getGroup, getGroupWords, getGroupStudySessions } from '../../services/api';
import type { Group, Word, StudySession } from '../../types/api';
import PaginatedTable from '../../components/shared/PaginatedTable';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function GroupShow() {
  const { id } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [wordsPage, setWordsPage] = useState(1);
  const [sessionsPage, setSessionsPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        const [groupRes, wordsRes, sessionsRes] = await Promise.all([
          getGroup(Number(id)),
          getGroupWords(Number(id), wordsPage),
          getGroupStudySessions(Number(id), sessionsPage)
        ]);

        setGroup(groupRes.data);
        setWords(wordsRes.data.items);
        setSessions(sessionsRes.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load group details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, wordsPage, sessionsPage]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!group) return <ErrorState message="Group not found" />;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const wordColumns = [
    { id: 'japanese', label: 'Japanese' },
    { id: 'romaji', label: 'Romaji' },
    { id: 'english', label: 'English' },
    { id: 'correct_count', label: 'Correct' },
    { id: 'wrong_count', label: 'Wrong' },
  ];

  const sessionColumns = [
    { id: 'activity_name', label: 'Activity' },
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
      <Typography variant="h4" gutterBottom>
        {group.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {group.word_count} words in this group
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Words" />
          <Tab label="Study Sessions" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <PaginatedTable
          columns={wordColumns}
          data={words}
          pagination={{
            current_page: wordsPage,
            total_pages: Math.ceil(words.length / 10),
            total_items: words.length,
            items_per_page: 10
          }}
          onPageChange={setWordsPage}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PaginatedTable
          columns={sessionColumns}
          data={sessions}
          pagination={{
            current_page: sessionsPage,
            total_pages: Math.ceil(sessions.length / 10),
            total_items: sessions.length,
            items_per_page: 10
          }}
          onPageChange={setSessionsPage}
        />
      </TabPanel>
    </Container>
  );
}
