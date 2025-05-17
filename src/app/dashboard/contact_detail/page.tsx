import React from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Grid
} from '@mui/material';

const contactInfo = {
    name: "Jim Fairbanks",
    addresses: [
      "123 Anywhere St. Anytown, NH 03561",
      "Alic Somewhere St. Sometown, NH 03561"
    ],
    phones: [
      { number: "617-830-6846", checked: true },
      { number: "617-981-3930", checked: false },
      { number: "617-981-9247", checked: false },
      { number: "617-555-1234", checked: false },
      { number: "617-555-5678", checked: true },
      { number: "617-555-9012", checked: false }
    ],
    emails: [
      { email: "jim.fairbanks@example.com", checked: true },
      { email: "jfairbanks@work.com", checked: false },
      { email: "jimmyf@personal.org", checked: true },
      { email: "j.fairbanks@temp.mail", checked: false }
    ]
  };

const FormPage = () => {
  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained">Actions</Button>
        <Button variant="contained">Skip Tracer</Button>
        <Button variant="contained">Actios Plan</Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Columna izquierda - Contenido principal */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              {contactInfo.name}
            </Typography>

            <Grid container spacing={3}>
              {/* Columna 1: Nombre y Direcciones */}
              <Grid item xs={12} md={6}>
                <Box>
                  {contactInfo.addresses.map((address, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1">
                        {address}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Columna 2: Teléfonos con scroll */}
              <Grid item xs={12} md={3}>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
                  <List dense>
                    {contactInfo.phones.map((phone, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={phone.number} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Columna 3: Emails con scroll */}
              <Grid item xs={12} md={3}>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
                  <List dense>
                    {contactInfo.emails.map((email, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={email.email} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* Groups Table */}
          <Typography variant="h6" gutterBottom>
            Groups:
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Appointment</TableCell>
                  <TableCell>Chat Lead</TableCell>
                  <TableCell>Date Session</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Future</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Not Lead</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Misc</TableCell>
                  <TableCell>Activities</TableCell>
                  <TableCell>History</TableCell>
                  <TableCell>Emails</TableCell>
                  <TableCell>Action Plans</TableCell>
                  <TableCell>Lead Sheet</TableCell>
                  <TableCell>Attachments</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>Checklists</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 3 }} />

        

        
        </Grid>

        {/* Columna derecha - Notas */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notes:
            </Typography>
            <Typography variant="body1" gutterBottom>
              No contesta las llamadas
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormPage;