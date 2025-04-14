import React from 'react';
import { Box, Grid, styled } from '@mui/material';

const PageContent = styled(Box)(({ theme }) => ({
  height: '30%',
  background: theme.palette.mode === 'dark'
    ? theme.palette.background.default 
    : `linear-gradient(to right, #ADD8E6, #FFDAB9)`, 
  padding: theme.spacing(4),
}));

export default PageContent;