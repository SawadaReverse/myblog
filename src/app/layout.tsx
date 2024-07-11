import { Box, Grid } from '@mui/material';
import HeaderBar from '@/components/HeaderBar';
import Profile from '@/components/Profile';
import './global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Box sx={{ width: { xs: '90%', md: '70%' }, m: 'auto' }}>
          <HeaderBar />
          <Box sx={{ mt: 5 }}>
            <Grid
              container
              spacing={5}
              flexWrap="wrap"
              justifyContent="space-around"
              alignContent="flex-start"
            >
              <Grid item xs={12} lg={7}>
                {children}
              </Grid>
              <Grid item xs={12} lg={3}>
                <Profile />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </body>
    </html>
  );
}
