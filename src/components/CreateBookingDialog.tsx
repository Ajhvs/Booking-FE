import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { createBooking } from "../api/bookingApi";
import type { BookingForm } from "../types/booking";
import { validateBooking } from "../utils/bookingValidation";
import type { BookingErrors } from "../utils/bookingValidation";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateBookingDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    status: "Booked",
  });

  const [errors, setErrors] = useState<BookingErrors>({});

  const handleChange = (key: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const submit = async () => {
    const validationErrors = validateBooking(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createBooking(form);
      onSuccess();
      onClose();
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        service: "",
        status: "Booked",
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  const roundedInput = {
    "& .MuiOutlinedInput-root": { borderRadius: 2 },
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Booking</DialogTitle>

      <DialogContent sx={{ backgroundColor: "#f8fafc" }}>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            sx={roundedInput}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            sx={roundedInput}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            sx={roundedInput}
            error={!!errors.date}
            helperText={errors.date}
          />

          <TextField
            label="Time"
            placeholder="HH:MM"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            sx={roundedInput}
            error={!!errors.time}
            helperText={errors.time}
          />

          <TextField
            label="Service"
            value={form.service}
            onChange={(e) => handleChange("service", e.target.value)}
            sx={roundedInput}
            error={!!errors.service}
            helperText={errors.service}
          />

          <TextField
            select
            label="Status"
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as BookingForm["status"])
            }
            sx={roundedInput}
          >
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
