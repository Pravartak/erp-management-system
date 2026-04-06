import { Box, FormControlLabel, MenuItem, Paper, Switch, TextField, Typography } from '@mui/material';

const InvoicesSettings = () => (
  <Paper elevation={0} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
    <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc' }}>
      <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>Invoice Settings</Typography>
      <Box sx={{ px: 1, py: 0.5, borderRadius: 1, backgroundColor: '#dcfce7', color: '#15803d', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
        Draft Mode
      </Box>
    </Box>
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', mb: 1 }}>
          Default Bank Account
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          defaultValue="Chase Business - *8829"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        >
          <MenuItem value="Chase Business - *8829">Chase Business - *8829</MenuItem>
          <MenuItem value="Wells Fargo - *1104">Wells Fargo - *1104</MenuItem>
        </TextField>
      </Box>
      <FormControlLabel
        label={<Typography sx={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>Attach Timesheet</Typography>}
        control={<Switch defaultChecked color="primary" />}
        sx={{ display: 'flex', justifyContent: 'space-between', m: 0 }}
      />
      <FormControlLabel
        label={<Typography sx={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>Show VAT Breakdown</Typography>}
        control={<Switch defaultChecked color="primary" />}
        sx={{ display: 'flex', justifyContent: 'space-between', m: 0 }}
      />
    </Box>
  </Paper>
);

export default InvoicesSettings;
