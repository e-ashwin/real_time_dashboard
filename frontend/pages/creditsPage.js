import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Grid, 
  useTheme,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import { Code, Person, Info, Email, Link as LinkIcon } from '@mui/icons-material';

const CreditsPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const teamMembers = [
    {
      name: "Reejo Daniel J",
      role: "Web Developer",
      contact: "reejodaniel@gmail.com",
      avatar: "/path-to-avatar1.jpg",
      links: [
        // { icon: <LinkIcon fontSize="small" />, text: "" }
      ]
    },
    {
      name: "Ashwin E",
      role: "Web Developer",
      contact: "eashwin999@gmail.com",
      avatar: "/path-to-avatar2.jpg",
      links: [
        { icon: <LinkIcon fontSize="small" />, text: "https://github.com/e-ashwin" }
      ]
    }
  ];

  const frameworks = [
    "React", "Material-UI", "Leaflet.js", 
    "Next.js", "Chart.js", "Node.js", "Express"
  ];

  const cardStyles = {
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[6],
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden'
  };

  const iconStyles = {
    fontSize: 48,
    color: theme.palette.primary.main,
    mb: 2,
    backgroundColor: isDark ? 'rgba(7, 160, 146, 0.1)' : 'rgba(7, 160, 146, 0.08)',
    padding: 2,
    borderRadius: '50%'
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      maxWidth: 1200,
      mx: 'auto'
    }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          mb: 4,
          color: theme.palette.text.primary,
          textAlign: 'center',
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: 80,
            height: 4,
            bgcolor: theme.palette.primary.main,
            mx: 'auto',
            mt: 2,
            borderRadius: 2
          }
        }}
      >
        Project Credits
      </Typography>

      <Grid container spacing={4}>
        {/* Team Members */}
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={cardStyles}>
              <CardContent sx={{ 
                textAlign: 'center', 
                py: 4,
                px: { xs: 2, md: 4 }
              }}>
                <Person sx={iconStyles} />
                <Avatar 
                  alt={member.name}
                  src={member.avatar}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto',
                    mb: 3,
                    border: `3px solid ${theme.palette.primary.main}`,
                    boxShadow: theme.shadows[2]
                  }} 
                />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                  {member.name}
                </Typography>
                <Chip 
                  label={member.role} 
                  size="small" 
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                  <Email color="primary" fontSize="small" />
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {member.contact}
                  </Typography>
                </Stack>

                {member.links.map((link, i) => (
                  <Stack key={i} direction="row" alignItems="center" justifyContent="center" spacing={1}>
                    {link.icon}
                    <Typography variant="body2" sx={{ 
                      color: theme.palette.primary.main,
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}>
                      {link.text}
                    </Typography>
                  </Stack>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* About the Project */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ py: 4, px: { xs: 2, md: 4 } }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Info sx={iconStyles} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  About The Project
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary,
                mb: 3,
                lineHeight: 1.7
              }}>
                This environmental monitoring platform provides real-time visualization of air quality data through interactive maps and analytics dashboards, helping communities make informed decisions about their environment.
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Version:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    1.0.0
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Last Updated:
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              
              <Box sx={{ 
                mt: 3,
                p: 2,
                bgcolor: isDark ? 'rgba(7, 160, 146, 0.1)' : 'rgba(7, 160, 146, 0.05)',
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  Built with ❤️ for IEEE GRSS Science Day Hackathon 2025
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Technologies Used */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ py: 4, px: { xs: 2, md: 4 } }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Code sx={iconStyles} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Technologies Used
                </Typography>
              </Box>
              
              <Grid container spacing={1} sx={{ mb: 3 }}>
                {frameworks.map((tech, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Chip
                      label={tech}
                      sx={{ 
                        width: '100%',
                        bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                        color: theme.palette.text.primary
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.secondary,
                fontStyle: 'italic',
                textAlign: 'center'
              }}>
                Special thanks to all open-source contributors and libraries that made this project possible.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreditsPage;