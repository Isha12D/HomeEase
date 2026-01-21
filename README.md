# HomeEase - Service Booking Platform

A full-stack service booking platform where **users** can book services and **providers** can accept, schedule, and complete those bookings. The system supports a complete booking lifecycle with role-based access and views.

---

## 🧠 Design Decisions

### 1. Role-Based Architecture

* The application supports **two primary roles**:

  * **User (Customer)**: Can book services, view scheduled and completed orders, and cancel bookings.
  * **Provider**: Can view incoming booking requests, accept them, manage scheduled bookings, and mark them as completed.
* Role handling is done on both **frontend (UI control)** and **backend (route protection & validation)** to ensure security.
* Admin role can view and resolve overdue booking reports
* Admin actions are protected using a dedicated JWT middleware

### 2. Booking Lifecycle Design

* Each booking moves through clear states:

```
pending → scheduled → completed
```

* **pending**: Booking created by a user, not yet accepted by any provider.
* **scheduled**: Provider accepts the booking.
* **completed**: Provider marks the job as completed.

* This simple state machine keeps logic predictable and avoids edge-case chaos.

* Accepted bookings move to the provider’s Scheduled Orders
* Providers mark completion using a checkbox, transitioning the booking to completed
* Completed bookings appear in both user and provider profiles

### 3. Separation of Concerns

* **Frontend**

  * Components are separated by responsibility (PendingRequests, ScheduledOrders, CompletedOrders).
  * Shared layout components (`UserLayout`, `AdminLayout`) reduce duplication.
  * Context API (`AuthContext`, `AdminContext`) manages auth state cleanly without prop drilling.

* **Backend**

  * Controllers handle business logic only.
  * Routes are RESTful and role-protected.
  * MongoDB queries are role-aware (e.g., provider cannot accept their own booking).

### 4. Authentication Strategy

* JWT-based authentication.
* Token stored and accessed via `AuthContext`.
* Protected routes on both frontend and backend.

### 5. UI Decisions

* Tailwind CSS for fast, consistent styling.
* Card-based UI for bookings improves readability.
* Sidebar-based navigation for provider profile improves UX clarity.
* Past dates are disabled in the booking calendar to prevent invalid scheduling
* Early UI-level validation improves user experience and reduces invalid API calls

---

## ⚖️ Trade-offs

### 1. Single Booking Collection

**Pros:**

* Easier to manage booking lifecycle
* Avoids duplication across collections

**Cons:**

* Requires careful filtering based on role and status

### 2. No Real-Time Updates (Yet)

* Bookings update on refresh or re-fetch
* Simpler implementation
* WebSockets can be added later if needed

### 3. Client-Side Filtering for Some Views

* Some filtering (scheduled vs completed) is done on the frontend
* Backend routes are added where role-specific filtering is critical
* Provider rejection of pending bookings is handled at the UI level only
* Rejected bookings remain available to other providers

---


## 📌 Assumptions

* A user can act as either a **customer** or a **provider**, not both at the same time.
* Only the assigned provider can mark a booking as completed.
* Providers should never see or accept their own bookings.
* Authentication middleware (`protect`) always injects a valid `req.user`.

---


## 🚀 Instructions to Run the Project

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/Isha12D/HomeEase
cd <project-folder>
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🧪 Key Features to Test

* User booking a service
* Provider viewing incoming requests
* Provider accepting a booking
* Booking appearing in scheduled orders
* Provider marking booking as completed
* Completed orders visible to both provider and user
* Logout redirects user to home page

---

## 🔮 Future Improvements

* Real-time booking updates (Socket.io)
* Provider availability & scheduling
* Filterig of Providers on the basis of city of booking
* Ratings and reviews
* Admin analytics dashboard

---

## ✅ Conclusion

This project focuses on **clarity, correctness, and scalability**. The booking lifecycle is explicit, role-based access is enforced at every layer, and the system is designed to grow without major refactors.

Happy coding 🚀
