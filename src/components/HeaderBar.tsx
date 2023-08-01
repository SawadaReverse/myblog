import { Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

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
          <Input
            type="search"
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="large" edge="end" aria-label="search">
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </Toolbar>
      </Box>
    </>
  );
}
