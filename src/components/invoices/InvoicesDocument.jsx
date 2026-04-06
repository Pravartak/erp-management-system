import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import MaterialIcon from '../MaterialIcon';
import { customColors } from '../../theme';

const lineItems = [
  {
    title: 'Cloud Infrastructure Setup - Enterprise',
    description: 'Monthly subscription for high-availability cluster setup and management.',
    qty: 1,
    unit: '$2,450.00',
    total: '$2,450.00',
  },
  {
    title: 'Data Migration Service (Legacy to SQL)',
    description: 'Security-cleared data sanitization and migration per 100GB block.',
    qty: 3,
    unit: '$450.00',
    total: '$1,350.00',
  },
  {
    title: 'SSL Enterprise Certificates (3 Year)',
    description: 'Wildcard domain validation with 24/7 priority support.',
    qty: 2,
    unit: '$125.00',
    total: '$250.00',
  },
];

const InvoicesDocument = () => (
  <Paper
    elevation={0}
    sx={{
      backgroundColor: '#fff',
      borderRadius: 2,
      boxShadow: '0px 20px 40px rgba(148, 163, 184, 0.3)',
      p: 6,
      minHeight: 1056,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: customColors.primary,
            color: customColors['on-primary'],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcon name="corporate_fare" sx={{ fontSize: 28 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
            EnterpriseERP
          </Typography>
          <Typography sx={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
            Global Solutions Inc.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontSize: 32, fontWeight: 900, color: 'rgba(15, 23, 42, 0.1)', letterSpacing: '0.2em', textTransform: 'uppercase', mb: 1 }}>
          Invoice
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>#INV-2024-4402</Typography>
          <Typography sx={{ fontSize: 12, color: '#64748b' }}>Date: Oct 24, 2023</Typography>
          <Typography sx={{ fontSize: 12, color: '#64748b' }}>Due Date: Nov 24, 2023</Typography>
        </Box>
      </Box>
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 6, mb: 6 }}>
      <Box>
        <Typography sx={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', fontWeight: 700, mb: 1.5 }}>
          Bill To
        </Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#0f172a', mb: 1 }}>
          TechFlow Systems Ltd
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
          452 Innovation Way
          <br />
          Suite 800, San Francisco
          <br />
          California, 94105
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#475569', fontWeight: 600, mt: 2 }}>VAT: US92837465</Typography>
      </Box>
      <Box sx={{ backgroundColor: '#f8fafc', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { label: 'Order Reference', value: 'SO-2024-0892' },
          { label: 'Payment Method', value: 'Bank Transfer' },
          { label: 'Currency', value: 'USD ($)' },
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8' }}>
              {item.label}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{item.value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>

    <Box sx={{ flex: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            {['Description', 'Qty', 'Unit Price', 'Total'].map((head, index) => (
              <TableCell
                key={head}
                sx={{
                  borderBottom: '2px solid #0f172a',
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#0f172a',
                  textAlign: index === 0 ? 'left' : index === 1 ? 'center' : 'right',
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((row) => (
            <TableRow key={row.title}>
              <TableCell sx={{ py: 3 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{row.title}</Typography>
                <Typography sx={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', mt: 0.5 }}>{row.description}</Typography>
              </TableCell>
              <TableCell sx={{ py: 3, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{row.qty}</TableCell>
              <TableCell sx={{ py: 3, textAlign: 'right', fontSize: 14, fontWeight: 600 }}>{row.unit}</TableCell>
              <TableCell sx={{ py: 3, textAlign: 'right', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
      <Box sx={{ width: '100%', maxWidth: 280, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[
          { label: 'Subtotal', value: '$4,050.00' },
          { label: 'Tax (VAT 20%)', value: '$810.00' },
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <Typography sx={{ color: '#64748b', fontWeight: 600 }}>{item.label}</Typography>
            <Typography sx={{ color: '#0f172a', fontWeight: 700 }}>{item.value}</Typography>
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '2px solid #0f172a' }}>
          <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#0f172a' }}>Grand Total</Typography>
          <Typography sx={{ fontWeight: 900, color: customColors.primary, fontSize: 20 }}>$4,860.00</Typography>
        </Box>
      </Box>
    </Box>

    <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 4, alignItems: 'end' }}>
      <Box>
        <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', mb: 1 }}>
          Notes & Instructions
        </Typography>
        <Typography sx={{ fontSize: 11, color: '#64748b', fontStyle: 'italic', lineHeight: 1.6 }}>
          Please include Invoice Number #INV-2024-4402 on your bank transfer reference. Payment is expected within 30 days of invoice date. Late payments may incur a standard 1.5% monthly fee.
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>Authorized Signature</Typography>
        <Box sx={{ mt: 2, borderBottom: '1px solid #cbd5e1', width: 128, ml: 'auto' }} />
        <Typography sx={{ mt: 1, fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Finance Director</Typography>
      </Box>
    </Box>
  </Paper>
);

export default InvoicesDocument;
