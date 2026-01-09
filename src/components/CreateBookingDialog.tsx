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

type Meridiem = "AM" | "PM";

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

  const [meridiem, setMeridiem] = useState<Meridiem>("AM");
  const [errors, setErrors] = useState<BookingErrors>({});

  const to24HourTime = (time: string, meridiem: Meridiem): string => {
    if (!time.includes(":")) return "";

    let hours = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);


    if (meridiem === "PM" && hours < 12) {
      hours += 12;
    }

    if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const handleChange = (key: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleTimeChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    let formatted = digits;
    if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }

    handleChange("time", formatted);
  };

  const submit = async () => {
    const validationErrors = validateBooking(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload: BookingForm = {
      ...form,
      time: to24HourTime(form.time, meridiem),
    };

    try {
      await createBooking(payload);

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
      setMeridiem("AM");
      setErrors({});
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  const roundedInput = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
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
            fullWidth
          />

          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            sx={roundedInput}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
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
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Time"
              placeholder="HH:MM"
              value={form.time}
              onChange={(e) => handleTimeChange(e.target.value)}
              sx={roundedInput}
              error={!!errors.time}
              helperText={errors.time}
              fullWidth
              inputProps={{
                maxLength: 5,
                inputMode: "numeric",
                pattern: "[0-9:]*",
              }}
            />

            <TextField
              select
              label="AM / PM"
              value={meridiem}
              onChange={(e) => setMeridiem(e.target.value as Meridiem)}
              sx={roundedInput}
              fullWidth
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </TextField>
          </Stack>

          <TextField
            label="Service"
            value={form.service}
            onChange={(e) => handleChange("service", e.target.value)}
            sx={roundedInput}
            error={!!errors.service}
            helperText={errors.service}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={form.status}
            onChange={(e) =>
              handleChange(
                "status",
                e.target.value as BookingForm["status"]
              )
            }
            sx={roundedInput}
            error={!!errors.status}
            helperText={errors.status}
            fullWidth
          >
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
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
