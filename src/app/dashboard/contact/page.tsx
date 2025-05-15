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
        <Grid item xs={12} md={8}>
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
                      <Checkbox edge="start" checked={index === 0} />
                      <Typography variant="body1">
                        {address}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Columna 2: Teléfonos con scroll */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
                  <List dense>
                    {contactInfo.phones.map((phone, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Checkbox edge="start" checked={phone.checked} />
                        </ListItemIcon>
                        <ListItemText primary={phone.number} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Columna 3: Emails con scroll */}
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
                  <List dense>
                    {contactInfo.emails.map((email, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Checkbox edge="start" checked={email.checked} />
                        </ListItemIcon>
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

          {/* Misc Fields Section */}
          <Typography variant="h6" gutterBottom>
            Misc Fields:
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom>
            Show Bunk Mie Fields
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Listing Status</TableCell>
                  <TableCell>Exelred</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>List Office</TableCell>
                  <TableCell>ABS REALTORS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Station Change Date</TableCell>
                  <TableCell>07/05/2022</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bathrooms</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>List Price</TableCell>
                  <TableCell>$1,385,000</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Square Footage</TableCell>
                  <TableCell>2840</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Days On Market</TableCell>
                  <TableCell>112</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>MLS Home</TableCell>
                  <TableCell>MLS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>MLS ID</TableCell>
                  <TableCell>V4FA123456</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Year Built</TableCell>
                  <TableCell>1948</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Property Type</TableCell>
                  <TableCell>Single Family Home</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>List Agent</TableCell>
                  <TableCell>John Smith</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bathrooms</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Subdivision</TableCell>
                  <TableCell>HEIGHTS</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 3 }} />

          {/* Help Team Account Section */}
          <Typography variant="h6" gutterBottom>
            Help Team Account
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            09/10/2023 13:37 PM
          </Typography>
          
          <Typography paragraph>
            Remarks: ATTENTION DEVELOPERS THE best and most exciting development opportunity in the City of Eliza Church have available for a 15.35 square foot panel who has right ability to subdivide and build TWO schools - one $700 square foot in the other two square feet. That's a total of 97% of the rest of your beautiful new construction. Adjacent land is stored for multi-family homes, so possibility exists for ever more development than to ideally located property. The expansive corner that is situated in an established neighborhood will only view of the W&OD Blue Trail and offers easy access to 66 and 495.5.
          </Typography>
        </Grid>

        {/* Columna derecha - Notas */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notes:
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={15}
              placeholder="Type notes here..."
              variant="outlined"
              sx={{ mb: 3 }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormPage;