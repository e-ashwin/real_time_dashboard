import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initialize sidebar as closed

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiBox: {
        styleOverrides: {
          root: {
            boxSizing: 'border-box',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none !important',
          },
        },
      },
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        bgcolor: 'background.default'
      }}>
        <Sidebar 
          toggleDarkMode={() => setDarkMode(!darkMode)} 
          darkMode={darkMode}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <Head>
        <title>Real Time Dashboard</title>
        <meta name="description" content="Real-time environmental monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: '100%', sm: `calc(100% - ${sidebarOpen ? 240 : 0}px)` },
            marginLeft: { xs: 0, sm: `${sidebarOpen ? 240 : 0}px` },
            p: 3,
            transition: (theme) => theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Component {...pageProps} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}