import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { getWords } from '../../services/api';
import type { Word } from '../../types/api';
import PaginatedTable from '../../components/shared/PaginatedTable';
import LoadingState from '../../components/shared/LoadingState';
import ErrorState from '../../components/shared/ErrorState';

export default function Words() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await getWords(page);
        setWords(response.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to load words');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [page]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const columns = [
    { id: 'japanese', label: 'Japanese' },
    { id: 'romaji', label: 'Romaji' },
    { id: 'english', label: 'English' },
    { id: 'correct_count', label: 'Correct' },
    { id: 'wrong_count', label: 'Wrong' },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Words
      </Typography>
      <PaginatedTable
        columns={columns}
        data={words}
        pagination={{
          current_page: page,
          total_pages: Math.ceil(words.length / 10),
          total_items: words.length,
          items_per_page: 10
        }}
        onPageChange={setPage}
      />
    </Container>
  );
}
