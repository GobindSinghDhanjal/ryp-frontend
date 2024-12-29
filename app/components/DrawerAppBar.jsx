import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import { Chip, ListItemIcon } from "@mui/material";
import {
  ContactPage,
  ContactPhone,
  Home,
  Info,
  LocalOffer,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const drawerWidth = 240;
const navItems = [
  { name: "Home", icon: "Home" },
  { name: "About", icon: "Info" },
  { name: "Contact", icon: "Contact" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const RateYourProfessor = () => {
    const router = useRouter();

    const handleClick = () => {
      router.push("/");
    };

    return (
      <div
      className="menubar custom-link"
        onClick={handleClick}
        style={{ minWidth:"max-content", cursor: "pointer", userSelect: "none" }}
        // style={{ width:"100%", cursor: "pointer", userSelect: "none" }}
      >
        <Typography className="custom-link" variant="h6" component="div" sx={{ outline: "none" }}>
          Rate Your Professor
        </Typography>
      </div>
    );
  };

  const drawer = (
    <Box
      className="drawer"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", userSelect: "none", outline: "none" }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Link className="custom-link-style" href="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "42px" }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="custom-link-style" href="/alluniversities">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "42px" }} className="list-item">
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="All Universities" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="custom-link-style" href="/offers">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "42px" }}>
                <LocalOffer />
              </ListItemIcon>
              <ListItemText
                primary="Student Offers"
                secondary={
                  <Typography
                    variant="body2"
                    style={{
                      backgroundColor: "orange",
                      fontWeight: 400,
                      fontSize: "0.7em",
                      color: "white",
                      borderRadius: "50px",
                      display: "inline-block",
                      padding: "5px 10px",
                    }}
                  >
                    New
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className="custom-link-style" href="/about">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon style={{ minWidth: "42px" }}>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#2b2b2b" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <RateYourProfessor />
          {/* <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rate Your Professor
          </Typography>
          </div> */}
          <Box className="menubar-items" sx={{ width:"100%", textAlign:"right", display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>
              <Link className="custom-desktop-link-style" href="/">Home</Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link className="custom-desktop-link-style" href="/alluniversities">Universities</Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link className="custom-desktop-link-style" href="/offers">offers</Link>
            </Button>
            <Button  sx={{ color: "#fff" }}>
              <Link className="custom-desktop-link-style" href="/about">About</Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              justifyContent: "center",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
