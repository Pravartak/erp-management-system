import { Box, Grid, Paper, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';

const summaryCards = [
  {
    label: 'Total Orders',
    value: '1,284',
    icon: 'analytics',
    iconColor: '#005faf',
    note: '+12% from last month',
    noteColor: '#16a34a',
    noteIcon: 'trending_up',
  },
  {
    label: 'Pending Approval',
    value: '42',
    icon: 'pending_actions',
    iconColor: '#f97316',
    note: 'Requires immediate review',
    noteColor: '#94a3b8',
  },
  {
    label: 'Net Revenue',
    value: '$240.5k',
    icon: 'payments',
    iconColor: '#22c55e',
    note: '+5.4% YoY',
    noteColor: '#16a34a',
    noteIcon: 'trending_up',
  },
  {
    label: 'Cancelled Rate',
    value: '0.8%',
    icon: 'cancel',
    iconColor: '#ef4444',
    note: '-2% improvement',
    noteColor: '#ef4444',
    noteIcon: 'trending_down',
  },
];

const OrdersSummary = () => (
  <Grid container spacing={2} sx={{ mb: 4 }}>
    {summaryCards.map((card) => (
      <Grid item xs={12} md={3} key={card.label}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            backgroundColor: '#fff',
            boxShadow: '0px 6px 12px rgba(15, 23, 42, 0.04)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b' }}>
              {card.label}
            </Typography>
            <MaterialIcon name={card.icon} sx={{ color: card.iconColor }} />
          </Box>
          <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{card.value}</Typography>
          {card.note ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              {card.noteIcon ? (
                <MaterialIcon name={card.noteIcon} sx={{ fontSize: 14, color: card.noteColor }} />
              ) : null}
              <Typography sx={{ fontSize: 11, color: card.noteColor }}>{card.note}</Typography>
            </Box>
          ) : null}
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default OrdersSummary;
