import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { customColors } from '../theme';
import MaterialIcon from './MaterialIcon';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { label: 'Product Management', icon: 'inventory_2', to: '/products' },
  { label: 'Directory', icon: 'contacts', to: '/directory' },
  { label: 'Orders', icon: 'shopping_cart', to: '/orders' },
  { label: 'GRN', icon: 'receipt_long', to: '/grn' },
  { label: 'Invoices', icon: 'description', to: '/invoices' },
  { label: 'User Management', icon: 'group', to: '/users' },
];

const SideNavBar = ({ activeLabel = 'Dashboard' }) => {
  const userRole = localStorage.getItem("Role");

  const filteredNavItems = navItems.filter(item => {
    if (item.label === 'User Management') {
      return userRole === 'admin';
    }
    return true;
  });

  return (
    <Box
      component="aside"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: 256,
        borderRight: `1px solid ${customColors['surface-container']}`,
        backgroundColor: '#f8fafc',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        pt: 10,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#0f172a',
          }}
        >
          Enterprise Resource
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#64748b',
          }}
        >
          Management System
        </Typography>
      </Box>
      <List sx={{ flex: 1, px: 1 }}>
        {filteredNavItems.map((item) => {
          const isActive = item.label === activeLabel;
          return (
            <ListItemButton
              key={item.label}
              component={RouterLink}
              to={item.to}
              selected={isActive}
              sx={{
                px: 2,
                py: 1.5,
                borderRight: isActive ? '4px solid #2563eb' : '4px solid transparent',
                color: isActive ? '#1d4ed8' : '#64748b',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  color: '#1d4ed8',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                },
                '&:hover': {
                  backgroundColor: isActive
                    ? 'rgba(59, 130, 246, 0.08)'
                    : customColors['surface-container-low'],
                },
                '& .MuiListItemIcon-root': {
                  minWidth: 36,
                  color: 'inherit',
                },
              }}
            >
              <ListItemIcon>
                <MaterialIcon name={item.icon} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.04em',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2, borderTop: `1px solid ${customColors['surface-container']}` }}>
        <Box
          sx={{
            backgroundColor: customColors['primary-container'],
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              color: customColors['on-primary-container'],
              mb: 0.5,
            }}
          >
            System Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
            <Typography
              sx={{ fontSize: 10, color: 'rgba(0, 82, 153, 0.8)' }}
            >
              All Nodes Operational
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavBar;