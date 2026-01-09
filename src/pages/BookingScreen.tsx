import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../layout/DashboardLayout";
import CreateBookingDialog from "../components/CreateBookingDialog";
import { fetchBookings } from "../api/bookingApi";
import type { Booking } from "../types/booking";

export default function BookingPage() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [open, setOpen] = useState(false);

  const loadBookings = async () => {
    const data = await fetchBookings();
    setRows(data);
  };

  useEffect(() => {
  const fetchData = async () => {
    const data = await fetchBookings();
    setRows(data);
  };

  fetchData();
}, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "time", headerName: "Time", width: 100 },
    { field: "service", headerName: "Service", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "Booked"
              ? "success"
              : params.value === "Cancelled"
              ? "error"
              : "warning"
          }
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 3,
          p: 3,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#0f172a" }}
          >
            Manage your bookings efficiently!
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
            onClick={() => setOpen(true)}
          >
            Add Booking
          </Button>
        </Box>

        <Paper
          sx={{
            height: "calc(100vh - 260px)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f1f5f9",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8fafc",
              },
            }}
          />
        </Paper>
      </Box>

      <CreateBookingDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadBookings}
      />
    </DashboardLayout>
  );
}
