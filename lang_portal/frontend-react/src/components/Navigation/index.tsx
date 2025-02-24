import { Link as RouterLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';

interface NavigationProps {
  onItemClick?: () => void;
}

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export default function Navigation({ onItemClick }: NavigationProps) {
  const navItems: NavItem[] = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'Study Activities',
      icon: <SchoolIcon />,
      path: '/study_activities'
    },
    {
      text: 'Words',
      icon: <TranslateIcon />,
      path: '/words'
    },
    {
      text: 'Groups',
      icon: <GroupsIcon />,
      path: '/groups'
    },
    {
      text: 'Study Sessions',
      icon: <HistoryIcon />,
      path: '/study_sessions'
    }
  ];

  return (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={item.path}
            onClick={onItemClick}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
