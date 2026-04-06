import { Box, Paper, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';

const timeline = [
  {
    title: 'Draft Created',
    time: 'Today, 10:45 AM by Alex',
    active: true,
  },
  {
    title: 'Order Confirmed',
    time: 'Oct 23, 04:20 PM',
  },
  {
    title: 'Sales Order Finalized',
    time: 'Oct 22, 11:15 AM',
  },
];

const InvoicesHistory = () => (
  <Paper elevation={0} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #e2e8f0', p: 3 }}>
    <Typography sx={{ fontWeight: 700, color: '#0f172a', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
      <MaterialIcon name="history" sx={{ color: '#94a3b8', fontSize: 20 }} />
      Invoice History
    </Typography>
    <Box sx={{ position: 'relative', pl: 2 }}>
      <Box sx={{ position: 'absolute', left: 10, top: 4, bottom: 4, width: 1, backgroundColor: '#f1f5f9' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {timeline.map((item) => (
          <Box key={item.title} sx={{ position: 'relative', pl: 4 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 2,
                top: 4,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: item.active ? '#2563eb' : '#e2e8f0',
                border: '2px solid #fff',
              }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: item.active ? 700 : 500, color: item.active ? '#0f172a' : '#64748b' }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 10, color: item.active ? '#64748b' : '#94a3b8' }}>{item.time}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Paper>
);

export default InvoicesHistory;
