import { Box } from '@mui/material';

const MaterialIcon = ({ name, sx }) => (
  <Box component="span" className="material-symbols-outlined" sx={sx}>
    {name}
  </Box>
);

export default MaterialIcon;
