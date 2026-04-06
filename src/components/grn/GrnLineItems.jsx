import { Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';

const lineItems = [
  {
    name: 'Industrial Compressor - v4',
    sku: 'SKU: IND-CMP-001',
    ordered: '50 Units',
    received: 50,
    status: 'Good',
    statusBg: '#dcfce7',
    statusColor: '#15803d',
  },
  {
    name: 'Steel Housing Plate',
    sku: 'SKU: PLT-STL-099',
    ordered: '120 Units',
    received: 118,
    status: 'Damaged (2)',
    statusBg: '#dbdafb',
    statusColor: '#555671',
    receivedError: true,
  },
];

const GrnLineItems = () => (
  <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid #e2e8f0', backgroundColor: '#fff', overflow: 'hidden' }}>
    <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <MaterialIcon name="inventory_2" sx={{ color: '#005faf' }} />
        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Line Items</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#005faf', cursor: 'pointer' }}>
        <MaterialIcon name="add" sx={{ fontSize: 18 }} />
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Add Row</Typography>
      </Box>
    </Box>
    <Box sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8fafc', color: '#475569' }}>
            {['Item Name / SKU', 'Qty Ordered', 'Qty Received', 'Condition', ''].map((head, index) => (
              <TableCell
                key={head || index}
                sx={{
                  px: 3,
                  py: 2,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#475569',
                  textAlign: index === 4 ? 'center' : 'left',
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((item) => (
            <TableRow key={item.name} hover sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
              <TableCell sx={{ px: 3, py: 2 }}>
                <Typography sx={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</Typography>
                <Typography sx={{ fontSize: 12, color: '#64748b' }}>{item.sku}</Typography>
              </TableCell>
              <TableCell sx={{ px: 3, py: 2, color: '#64748b' }}>{item.ordered}</TableCell>
              <TableCell sx={{ px: 3, py: 2 }}>
                <TextField
                  size="small"
                  value={item.received}
                  type="number"
                  inputProps={{ style: { textAlign: 'center', width: 60 } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      height: 32,
                      borderColor: item.receivedError ? '#fe8983' : '#e2e8f0',
                      color: item.receivedError ? '#9f403d' : 'inherit',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ px: 3, py: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: item.statusBg,
                    color: item.statusColor,
                  }}
                >
                  {item.status}
                </Box>
              </TableCell>
              <TableCell sx={{ px: 3, py: 2, textAlign: 'center' }}>
                <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#9f403d' } }}>
                  <MaterialIcon name="delete" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Paper>
);

export default GrnLineItems;
