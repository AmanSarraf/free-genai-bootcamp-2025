import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import StudyActivities from './pages/StudyActivities';
import StudyActivityShow from './pages/StudyActivityShow';
import StudyActivityLaunch from './pages/StudyActivityLaunch';
import Words from './pages/Words';
import Groups from './pages/Groups';
import GroupShow from './pages/GroupShow';
import StudySessions from './pages/StudySessions';
import StudySessionShow from './pages/StudySessionShow';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study_activities" element={<StudyActivities />} />
            <Route path="/study_activities/:id" element={<StudyActivityShow />} />
            <Route path="/study_activities/:id/launch" element={<StudyActivityLaunch />} />
            <Route path="/words" element={<Words />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:id" element={<GroupShow />} />
            <Route path="/study_sessions" element={<StudySessions />} />
            <Route path="/study_sessions/:id" element={<StudySessionShow />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
