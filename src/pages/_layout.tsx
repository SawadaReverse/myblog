import HeaderBar from "@/components/HeaderBar";
import Profile from "@/components/Profile";
import TagList from "@/components/TagList";
import { Box, Grid } from "@mui/material";
import { ReactElement } from "react";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Box sx={{ width: { xs: "90%", md: "70%" }, m: "auto" }}>
      <HeaderBar />
      <Box sx={{ mt: 5 }}>
        <Grid
          container
          spacing={5}
          flexWrap="wrap"
          justifyContent="space-around"
          alignContent="flex-start"
        >
          <Grid item lg={7}>
            {children}
          </Grid>
          <Grid item lg={3}>
            <Profile />
            <TagList />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </>
);
