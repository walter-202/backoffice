'use client';

import { Box, Card, CardContent, Typography, styled, useTheme, Grid } from '@mui/material';
import PageContent from './components/dashboard/pageContent';

const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `5px solid ${theme.palette.mode === 'dark' ? 'rgba(50, 50, 50)' : 'rgba(211, 211, 211, 0.7)'}`,
  borderRadius: theme.shape.borderRadius * 5,
  boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 2 : 4],
  color: theme.palette.text.primary, 
}));

export default function DashboardCentralView() {
  const theme = useTheme(); 

  return (
    <PageContent>
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start" style={{ height: '100%' }}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <GlassCard style={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Card 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contenido de la tarjeta 1.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <GlassCard style={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Card 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contenido de la tarjeta 2.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <GlassCard style={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Card 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contenido de la tarjeta 3.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <GlassCard style={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Card 4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contenido de la tarjeta 4.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <GlassCard style={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Card 5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contenido de la tarjeta 5.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <GlassCard style={{ height: '200px' }}>
            <CardContent>
              <Typography variant="h6" component="div" color="text.primary">
                Card 6
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contenido de la tarjeta 6.
              </Typography>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>
    </PageContent>
  );
}