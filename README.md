# Booking Admin Dashboard

A simple **React + TypeScript** admin dashboard to manage bookings efficiently, with a Material UI frontend and client-side form validation.



## **Tech Stack**

* **Frontend:** React + TypeScript
* **UI Library:** [Material UI (MUI)](https://mui.com/)

  * Components: `DataGrid`, `Dialog`, `Button`, `Chip`, `Typography`, `Paper`
* **State Management:** React `useState` and `useEffect`
* **API Integration:** Axios or fetch (`fetchBookings` & `createBooking`)
* **Styling:** MUI `sx` prop for inline CSS + theme-aware design
* **Form Validation:** Custom TypeScript validation utility (`bookingValidation.ts`)
* **Icons:** Material UI Icons (`AddIcon`)

---

## **Project Structure**

```
src/
├─ api/
│   └─ bookingApi.ts        # API calls to fetch and create bookings
├─ components/
│   └─ CreateBookingDialog.tsx  # Booking form dialog with validation
├─ layout/
│   └─ DashboardLayout.tsx  # Layout with AppBar, Drawer, and main content
├─ pages/
│   └─ BookingPage.tsx      # Main bookings management page with DataGrid
├─ types/
│   └─ booking.ts           # TypeScript types for Booking and BookingForm
├─ utils/
│   └─ bookingValidation.ts # Booking form validation logic
```

---

## **Features**

1. **Booking Management Table**

   * View all bookings in a DataGrid table
   * Hover effects and styled headers
   * Status displayed as colored chips (`Booked`, `Cancelled`, `Pending`)

2. **Create Booking Dialog**

   * Form fields: Name, Phone, Date, Time, Service, Status
   * Validation rules:

     * Name: min 2 characters
     * Phone: must start with `91` + 10 digits
     * Time: numbers only (`HHMM` or `HH:MM`)
     * Service: letters only
   * Errors display under the respective input field

3. **Responsive Layout**

   * Persistent drawer sidebar for navigation
   * AppBar header with page title
   * Main content scrollable

---

## **Installation & Running**

1. **Clone the repository**

```bash
git clone <repo-url>
cd booking-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
# or
npm start
```

4. **Open in browser**

```
http://localhost:3000
```

---

## **Usage**

* Click **Add Booking** to open the booking form dialog.
* Fill out all fields according to validation rules.
* Click **Save** to submit; the booking is added to the table.
* Errors will display in real-time or on submit if validation fails.



If you want, I can also create a **shorter one-page version with badges and screenshots** so it looks professional for GitHub.

Do you want me to do that?
