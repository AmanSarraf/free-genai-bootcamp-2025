import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import GroupsIcon from '@mui/icons-material/Groups';

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Study Activities',
      description: 'Interactive learning activities to help you master Japanese',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: '/study_activities',
    },
    {
      title: 'Word Lists',
      description: 'Comprehensive vocabulary lists with pronunciation guides',
      icon: <TranslateIcon sx={{ fontSize: 40 }} />,
      path: '/words',
    },
    {
      title: 'Study Groups',
      description: 'Organize your learning with customized word groups',
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      path: '/groups',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Language Learning
          </Typography>
          <Typography variant="h5" paragraph>
            Master Japanese through interactive study sessions and structured learning
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Statistics Section */}
        <Box sx={{ mt: 8, mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Join Our Growing Community
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" color="primary">1000+</Typography>
              <Typography variant="subtitle1">Active Learners</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" color="primary">5000+</Typography>
              <Typography variant="subtitle1">Words Available</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" color="primary">10+</Typography>
              <Typography variant="subtitle1">Study Activities</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
