import React from 'react';
import { Box, Card, CardContent, Typography, styled, useTheme, Grid } from '@mui/material';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `5px solid ${theme.palette.mode === 'dark' ? 'rgba(50, 50, 50)' : 'rgba(211, 211, 211, 0.7)'}`,
  borderRadius: theme.shape.borderRadius * 5,
  boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 2 : 4],
  color: theme.palette.text.primary, 
}));

export default GlassCard;
