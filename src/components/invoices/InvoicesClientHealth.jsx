import { Box, Paper, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';
import { customColors } from '../../theme';

const InvoicesClientHealth = () => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 2,
      p: 3,
      backgroundColor: customColors.primary,
      color: customColors['on-primary'],
      boxShadow: '0px 20px 40px rgba(0, 95, 175, 0.15)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcon name="analytics" sx={{ fontSize: 20 }} />
      </Box>
      <Typography sx={{ fontWeight: 700 }}>Client Health</Typography>
    </Box>
    <Typography sx={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
      TechFlow Systems has a 100% on-time payment record over the last 12 months.
    </Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
      <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, p: 2 }}>
        <Typography sx={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)' }}>
          Total LTV
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 800 }}>$84.2k</Typography>
      </Box>
      <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, p: 2 }}>
        <Typography sx={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)' }}>
          Avg. Pay Days
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 800 }}>4 Days</Typography>
      </Box>
    </Box>
  </Paper>
);

export default InvoicesClientHealth;
