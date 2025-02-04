
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        {/* Barra de navegación del dashboard */}
      </nav>
      <main>{children}</main>
      <footer>
        {/* Pie de página del dashboard */}
      </footer>
    </div>
  );
}