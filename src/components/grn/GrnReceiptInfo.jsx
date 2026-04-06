import { Paper, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';

const GrnReceiptInfo = () => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: '#eae7ea',
      display: 'flex',
      gap: 1.5,
      alignItems: 'flex-start',
    }}
  >
    <MaterialIcon name="info" sx={{ color: '#94a3b8', mt: 0.2 }} />
    <Typography sx={{ fontSize: 11, color: '#64748b' }}>
      Submitting this GRN will automatically update stock levels and create a pending invoice entry for the finance department.
    </Typography>
  </Paper>
);

export default GrnReceiptInfo;
