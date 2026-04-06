import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { customColors } from '../theme';
import MaterialIcon from './MaterialIcon';

const items = [
  { label: 'Home', icon: 'dashboard', to: '/dashboard' },
  { label: 'Stock', icon: 'inventory_2', to: '/products' },
  { label: 'Orders', icon: 'shopping_cart', to: '/orders' },
  { label: 'Invoices', icon: 'description', to: '/invoices' },
  { label: 'Users', icon: 'group', to: '/users' },
];

const MobileBottomNav = ({ activeLabel = 'Home' }) => (
  <Box
    component="nav"
    sx={{
      display: { xs: 'flex', md: 'none' },
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: customColors['surface-container-lowest'],
      borderTop: `1px solid ${customColors['surface-container']}`,
      justifyContent: 'space-around',
      py: 1.5,
      zIndex: 1300,
    }}
  >
    {items.map((item) => {
      const isActive = item.label === activeLabel;
      return (
        <Button
          key={item.label}
          component={RouterLink}
          to={item.to}
          sx={{
            minWidth: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            color: isActive ? customColors.primary : '#94a3b8',
            textTransform: 'none',
            fontSize: 10,
            fontWeight: isActive ? 700 : 500,
          }}
        >
          <MaterialIcon name={item.icon} />
          <Typography sx={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>
            {item.label}
          </Typography>
        </Button>
      );
    })}
  </Box>
);

export default MobileBottomNav;
