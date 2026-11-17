import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import ScrollToTop from "./ScrollToTop";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/recommendations", label: "Recommendations" },
  { to: "/favorites", label: "Favorites" },
  { to: "/journal", label: "Journal" },
];

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <AppBar position="sticky">
        <Toolbar className="flex justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white no-underline"
          >
            <LocalBarIcon className="text-brass" />
            <span className="text-2xl font-bold">HomeSommelier</span>
          </Link>

          <nav className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                end={link.to === "/"}
                color="inherit"
                className="[&.active]:bg-white/20"
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <IconButton
            color="inherit"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <List className="w-60">
          {navLinks.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setIsMenuOpen(false)}
              className="[&.active]:bg-wine/30"
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
