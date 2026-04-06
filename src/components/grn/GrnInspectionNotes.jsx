import { Box, Paper, TextField, Typography } from '@mui/material';
import { customColors } from '../../theme';
import MaterialIcon from '../MaterialIcon';

const GrnInspectionNotes = () => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <MaterialIcon name="notes" sx={{ color: customColors.primary }} />
      <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Inspection Notes</Typography>
    </Box>
    <TextField
      fullWidth
      multiline
      rows={4}
      placeholder="Add any discrepancies or quality observations here..."
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
    />
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <Typography sx={{ color: '#64748b' }}>Total Items Expected</Typography>
        <Typography sx={{ fontWeight: 700 }}>170</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <Typography sx={{ color: '#64748b' }}>Total Items Received</Typography>
        <Typography sx={{ fontWeight: 700 }}>168</Typography>
      </Box>
      <Box sx={{ pt: 2, borderTop: '1px solid #f1f5f9' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f172a' }}>
            Variance Status
          </Typography>
          <Typography sx={{ fontWeight: 800, color: customColors.error }}>-2 Units</Typography>
        </Box>
      </Box>
    </Box>
  </Paper>
);

export default GrnInspectionNotes;
