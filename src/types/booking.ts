export interface Booking {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: "Booked" | "Canceled" | "Pending";
}

export type BookingForm = Omit<Booking, "id">;

export interface BookingApiResponse {
  success: boolean;
  message: string;
  data: Booking[];
}