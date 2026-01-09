import axios from "axios";
import type { Booking, BookingApiResponse } from "../types/booking";

const API_URL = "http://localhost:5000/api/bookings";

export const fetchBookings = async (): Promise<Booking[]> => {
  const res = await axios.get<BookingApiResponse>(API_URL);
  return res.data.data;
};

export const createBooking = async (
  payload: Omit<Booking, "id">
) => {
  return axios.post(API_URL, payload);
};
