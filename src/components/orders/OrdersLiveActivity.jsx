import { Box, Button, Paper, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';
import { customColors } from '../../theme';

const activities = [
  {
    icon: 'local_shipping',
    iconBg: '#dbeafe',
    iconColor: customColors.primary,
    text: (
      <>
        Order <span style={{ color: customColors.primary }}>#SO-29402</span> shipped
      </>
    ),
    time: '2 minutes ago',
  },
  {
    icon: 'edit_note',
    iconBg: '#ffedd5',
    iconColor: '#f97316',
    text: (
      <>
        Order <span style={{ color: customColors.primary }}>#PO-8812</span> revised by admin
      </>
    ),
    time: '15 minutes ago',
  },
  {
    icon: 'check_circle',
    iconBg: '#dcfce7',
    iconColor: '#22c55e',
    text: (
      <>
        Payment received for <span style={{ color: customColors.primary }}>#SO-29395</span>
      </>
    ),
    time: '1 hour ago',
  },
  {
    icon: 'person_add',
    iconBg: '#f1f5f9',
    iconColor: '#94a3b8',
    text: (
      <>
        New supplier added: <span style={{ color: customColors.primary }}>Indus Spices</span>
      </>
    ),
    time: '3 hours ago',
  },
];

const OrdersLiveActivity = () => (
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
      Live Activity
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map((activity) => (
        <Box key={activity.time} sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: activity.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <MaterialIcon name={activity.icon} sx={{ color: activity.iconColor, fontSize: 16 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{activity.text}</Typography>
            <Typography sx={{ fontSize: 10, color: '#94a3b8', mt: 0.5 }}>{activity.time}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
    <Button
      sx={{
        mt: 3,
        width: '100%',
        py: 1,
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: customColors.primary,
        border: '1px solid rgba(0, 95, 175, 0.2)',
        borderRadius: 2,
        '&:hover': { backgroundColor: 'rgba(0, 95, 175, 0.05)' },
      }}
    >
      View System Logs
    </Button>
  </Paper>
);

export default OrdersLiveActivity;
