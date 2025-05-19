'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
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
  Grid,
  IconButton,
  InputAdornment,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

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
  const [hoveredPhone, setHoveredPhone] = useState(null);
  const [hoveredEmail, setHoveredEmail] = useState(null);

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Button variant="contained">Actions</Button>
        <Button variant="contained">Skip Tracer</Button>
        <Button variant="contained">Actions Plan</Button>
        
        <Stack direction="column" alignItems="center" sx={{ ml: 1, color: '#fa8720' }} >
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
            <IconButton size="small" sx={{ color: '#fa8720' }}>
              <AddIcon fontSize="small" />
            </IconButton>
         </Box>
         <Typography variant="h6" sx={{ mr: 0.5 }}>Appointment</Typography>
        </Stack>

        <Stack direction="column" alignItems="center" sx={{ ml: 1, color: '#2b6efc' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
            <IconButton size="small" sx={{ color: '#2b6efc' }}>
              <AddIcon fontSize="small" />
            </IconButton>
         </Box>
         <Typography variant="h6" sx={{ mr: 0.5 }}>Task</Typography>
        </Stack>

        <Stack direction="column" alignItems="center" sx={{ ml: 1, color: '#71a81d' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
            <IconButton size="small" sx={{ color: '#71a81d' }}>
              <AddIcon fontSize="small" />
            </IconButton>
         </Box>
         <Typography variant="h6" sx={{ mr: 0.5 }}>Follow Up Call</Typography>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            
            <Grid container spacing={1}>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              {contactInfo.name}
            </Typography>
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

              <Grid item xs={12} md={3}>
                <Paper variant="outlined" sx={{ maxHeight: 150, overflow: 'auto' }}>
                  <List dense>
                    {contactInfo.phones.map((phone, index) => (
                      <ListItem 
                        key={index} 
                        onMouseEnter={() => setHoveredPhone(index)}
                        onMouseLeave={() => setHoveredPhone(null)}
                        sx={{
                          transition: 'all 0.3s ease'
                        }}
                        secondaryAction={
                          <IconButton edge="end">
                            <PhoneIcon 
                              fontSize={hoveredPhone === index ? "medium" : "small"} 
                              color="success" 
                              sx={{
                                transition: 'all 0.3s ease'
                              }}
                            />
                          </IconButton>
                        }
                      >
                        <ListItemText 
                          primary={phone.number} 
                          primaryTypographyProps={{
                            fontSize: hoveredPhone === index ? '1.05rem' : '1rem',
                            fontWeight: hoveredPhone === index ? 500 : 400,
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ maxHeight: 150, overflow: 'auto' }}>
                  <List dense>
                    {contactInfo.emails.map((email, index) => (
                      <ListItem 
                        key={index}
                        onMouseEnter={() => setHoveredEmail(index)}
                        onMouseLeave={() => setHoveredEmail(null)}
                        sx={{
                          transition: 'all 0.3s ease'
                        }}
                        secondaryAction={
                          <IconButton edge="end">
                            <EmailIcon 
                              fontSize={hoveredEmail === index ? "medium" : "small"} 
                              color="success"
                              sx={{
                                transition: 'all 0.3s ease'
                              }}
                            />
                          </IconButton>
                        }
                      >
                        <ListItemText 
                          primary={email.email} 
                          primaryTypographyProps={{
                            fontSize: hoveredEmail === index ? '1.05rem' : '1rem',
                            fontWeight: hoveredEmail === index ? 500 : 400,
                            transition: 'all 0.3s ease'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Divider sx={{ my: 3 }} />

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

        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notes:
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a note..."
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="body2">
                Example note: Need to follow up with client about payment.
              </Typography>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormPage;