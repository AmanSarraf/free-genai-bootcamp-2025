import { ReactNode, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from '../Navigation';

interface LayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 240;

export default function Layout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 0}px)` },
          ml: { sm: `${drawerOpen ? DRAWER_WIDTH : 0}px` },
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Language Learning Portal
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: ['56px', '64px'],
            height: `calc(100% - 64px)`,
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <Navigation onItemClick={() => setDrawerOpen(false)} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: ['56px', '64px'],
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          width: { sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 0}px)` },
          ml: { sm: `${drawerOpen ? DRAWER_WIDTH : 0}px` },
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
