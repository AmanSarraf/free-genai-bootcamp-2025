import { Alert, Box } from '@mui/material';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <Box p={2}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
