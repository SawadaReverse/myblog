import { Search } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function HeaderBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "white", color: "black" }}>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
            >
              さわだ見聞録
            </Typography>
            <IconButton size="large" edge="end" aria-label="search">
              <Search />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
