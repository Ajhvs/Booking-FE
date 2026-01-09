import type { BookingForm } from "../types/booking";
export type BookingErrors = Partial<Record<keyof BookingForm, string>>;


export const validateBooking = (form: BookingForm): BookingErrors => {
  const errors: BookingErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 letters";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^91\d{10}$/.test(form.phone.trim())) {
    errors.phone = "Phone must start with 91 and contain 10 digits after";
  }

  if (!form.time.trim()) {
    errors.time = "Time is required";
  } else if (!/^\d{2}(:?\d{2})?$/.test(form.time.trim())) {
    errors.time = "Time must contain only numbers (HHMM or HH:MM)";
  }

  if (!form.service.trim()) {
    errors.service = "Service is required";
  } else if (!/^[A-Za-z\s]+$/.test(form.service.trim())) {
    errors.service = "Service can only contain letters";
  }

  if (!form.status.trim()) errors.status = "Status is required";

  return errors;
};