"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const UsersPage = dynamic(() => import('./users/page'), { ssr: false });
const ProfilePage = dynamic(() => import('./profile/page'), { ssr: false });
const RolePage = dynamic(() => import('./role/page'), { ssr: false });
const IndexPage = dynamic(() => import('./page'), { ssr: false });

const NAVIGATION: Navigation = [
  {
    segment: 'security',
    title: 'Security',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'users',
        title: 'Users',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'profile',
        title: 'Profile',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'role',
        title: 'Role',
        icon: <DescriptionIcon />,
      },
    ],
  },
];

const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#90caf9', // Un azul claro como primario (similar a indigo-300 en Material UI)
            contrastText: '#fff', // Texto en contraste con el primario (blanco para legibilidad)
          },
          secondary: {
            main: '#ce93d8', // Un morado suave como secundario (similar a purple-300)
            contrastText: '#fff', // Texto en contraste con el secundario
          },
          background: {
            default: '#fff', // Blanco como fondo predeterminado
            paper: '#f5f5f5', // Un gris muy claro para superficies (como tarjetas y paneles)
          },
          text: {
            primary: '#212121', // Negro casi puro para texto principal
            secondary: '#757575', // Gris para texto secundario (menos importante)
          },
          // Puedes agregar más colores si lo necesitas (error, warning, info, success)
        }
      : {
          // Paleta de colores para el tema oscuro
          primary: {
            main: '#5c6bc0', // Un azul más oscuro como primario (similar a indigo-500)
            contrastText: '#fff', // Texto en contraste con el primario
          },
          secondary: {
            main: '#ab47bc', // Un morado más intenso como secundario (similar a purple-500)
            contrastText: '#fff', // Texto en contraste con el secundario
          },
          background: {
            default: '#121212', // Un gris oscuro como fondo predeterminado
            paper: '#1e1e1e', // Un gris un poco más claro para superficies
          },
          text: {
            primary: '#fff', // Blanco para texto principal
            secondary: '#9e9e9e', // Un gris claro para texto secundario
          },
        }),
  },
});

const demoTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));

function DemoPageContent({ pathname }: { pathname: string }) {
  const segment = pathname.split('/').pop(); 

  switch (segment) {
    case 'users':
      return <UsersPage />;
    case 'profile':
      return <ProfilePage />;
    case 'role':
      return <RolePage />;
    default:
      return <IndexPage />;
  }
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (storedMode) {
      setMode(storedMode);
    } else {
      const toolpadColorScheme = document.querySelector('[data-toolpad-color-scheme]')?.getAttribute('data-toolpad-color-scheme');
      setMode(toolpadColorScheme === 'dark' ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      window={demoWindow}
    >
      <ThemeProvider theme={demoTheme(mode)}>
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </ThemeProvider>
    </AppProvider>
  );
}