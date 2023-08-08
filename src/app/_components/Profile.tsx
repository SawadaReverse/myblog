"use client";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Profile() {
  return (
    <>
      <Box>
        <Typography variant="h5" component="h2">
          プロフィール
        </Typography>
        <Box sx={{ m: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="さわだ"
              src="https://public.sawada.pro/icons/face"
              sx={{ width: 128, height: 128 }}
            />
          </Box>
          <Typography sx={{ fontWeight: "bold", textAlign: "center", m: 2 }}>
            さわだ
          </Typography>
          <Typography sx={{ textAlign: "center", m: 2 }}>
            ひまなときにかきます。
          </Typography>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <TwitterIcon />
            </Grid>
            <Grid item>@09224</Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
