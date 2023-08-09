import { Box, Link, Toolbar, Typography } from "@mui/material";

export default function HeaderBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link href="/" underline="none" color="inherit">
              さわだ見聞録
            </Link>
          </Typography>
        </Toolbar>
      </Box>
    </>
  );
}
