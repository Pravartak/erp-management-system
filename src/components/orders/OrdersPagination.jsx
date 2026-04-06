import { Box, Button, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';

const OrdersPagination = () => (
  <Box
    sx={{
      px: 3,
      py: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid #e2e8f0',
      backgroundColor: 'rgba(248, 250, 252, 0.5)',
    }}
  >
    <Typography sx={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
      Showing 1-10 of 2,491 orders
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        disabled
        sx={{
          width: 28,
          height: 28,
          minWidth: 28,
          borderRadius: 1,
          border: '1px solid #e2e8f0',
          backgroundColor: '#fff',
          color: '#94a3b8',
          '&.Mui-disabled': { opacity: 0.5 },
        }}
      >
        <MaterialIcon name="chevron_left" sx={{ fontSize: 20 }} />
      </Button>
      <Button
        sx={{
          width: 32,
          height: 32,
          minWidth: 32,
          borderRadius: 1,
          backgroundColor: '#005faf',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          '&:hover': { backgroundColor: '#005faf' },
        }}
      >
        1
      </Button>
      <Button
        sx={{
          width: 32,
          height: 32,
          minWidth: 32,
          borderRadius: 1,
          color: '#64748b',
          fontSize: 12,
          '&:hover': { backgroundColor: '#e2e8f0' },
        }}
      >
        2
      </Button>
      <Button
        sx={{
          width: 32,
          height: 32,
          minWidth: 32,
          borderRadius: 1,
          color: '#64748b',
          fontSize: 12,
          '&:hover': { backgroundColor: '#e2e8f0' },
        }}
      >
        3
      </Button>
      <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>...</Typography>
      <Button
        sx={{
          width: 32,
          height: 32,
          minWidth: 32,
          borderRadius: 1,
          color: '#64748b',
          fontSize: 12,
          '&:hover': { backgroundColor: '#e2e8f0' },
        }}
      >
        249
      </Button>
      <Button
        sx={{
          width: 28,
          height: 28,
          minWidth: 28,
          borderRadius: 1,
          border: '1px solid #e2e8f0',
          backgroundColor: '#fff',
          color: '#94a3b8',
          '&:hover': { backgroundColor: '#f1f5f9' },
        }}
      >
        <MaterialIcon name="chevron_right" sx={{ fontSize: 20 }} />
      </Button>
    </Box>
  </Box>
);

export default OrdersPagination;
