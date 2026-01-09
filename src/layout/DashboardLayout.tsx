import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { ReactNode } from "react";

const drawerWidth = 220;
const headerHeight = 64;

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `${drawerWidth}px 1fr`,
        gridTemplateRows: `${headerHeight}px 1fr`,
        height: "100vh",
        width: "100vw",
        backgroundColor: "#020617",
      }}
    >
      <AppBar
        position="static"
        sx={{
          gridColumn: "1 / -1",
          backgroundColor: "#0f172a",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ minHeight: headerHeight }}>
          <Typography variant="h6" fontWeight={600}>
            Booking Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          gridRow: "2 / -1",
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            position: "static",
            backgroundColor: "#020617",
            color: "#fff",
            borderRight: "1px solid #1e293b",
          },
        }}
      >
        <List sx={{ mt: 1 }}>
          <ListItemButton
            selected
            sx={{
              backgroundColor: "#1e293b",
              borderLeft: "4px solid #2563eb",
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          gridRow: "2 / -1",
          p: 3,
          backgroundColor: "#f8fafc",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}