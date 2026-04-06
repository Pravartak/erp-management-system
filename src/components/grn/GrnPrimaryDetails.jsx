import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';

const GrnPrimaryDetails = () => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, borderBottom: '1px solid #f1f5f9', pb: 2 }}>
      <MaterialIcon name="assignment" sx={{ color: '#005faf' }} />
      <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Primary Reference</Typography>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
      <Box>
        <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', mb: 1 }}>
          PO Reference
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            placeholder="e.g. PO-2023-0045"
            size="small"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
          />
          <MaterialIcon name="search" sx={{ position: 'absolute', right: 12, top: 10, color: '#94a3b8' }} />
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', mb: 1 }}>
          Reception Date
        </Typography>
        <TextField
          fullWidth
          type="date"
          size="small"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
        />
      </Box>
      <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' } }}>
        <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', mb: 1 }}>
          Supplier
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          defaultValue="Select Supplier..."
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#fff' } }}
        >
          <MenuItem value="Select Supplier...">Select Supplier...</MenuItem>
          <MenuItem value="Nexus Logistics Ltd.">Nexus Logistics Ltd.</MenuItem>
          <MenuItem value="Global Manufacturing Corp.">Global Manufacturing Corp.</MenuItem>
          <MenuItem value="Standard Supplies Co.">Standard Supplies Co.</MenuItem>
        </TextField>
      </Box>
    </Box>
  </Paper>
);

export default GrnPrimaryDetails;
