import { Box, Paper, Typography } from '@mui/material';

const OrdersAnalytics = () => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 2,
      border: '1px solid #e2e8f0',
      backgroundColor: '#fff',
      p: 3,
    }}
  >
    <Typography sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
      Order Analytics Trend
    </Typography>
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16 / 9',
        backgroundColor: '#f8fafc',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <Box sx={{ width: '80%', height: '60%', display: 'flex', alignItems: 'flex-end', gap: 2 }}>
        {[40, 65, 50, 80, 55, 95, 70].map((height, index) => (
          <Box
            key={`bar-${index}`}
            sx={{
              flex: 1,
              height: `${height}%`,
              backgroundColor: `rgba(0, 95, 175, ${0.2 + index * 0.1})`,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
        ))}
      </Box>
      <Typography
        sx={{
          position: 'absolute',
          bottom: 16,
          fontSize: 10,
          color: '#94a3b8',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}
      >
        Sales Velocity - Last 7 Days
      </Typography>
    </Box>
  </Paper>
);

export default OrdersAnalytics;
