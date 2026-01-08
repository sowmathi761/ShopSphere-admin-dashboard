
# ShopSphere Admin Dashboard

## 1. Introduction

ShopSphere Admin Dashboard is a full-stack administration and analytics platform for monitoring and managing e-commerce business operations. The application enables administrators to track orders, customer activity, sales revenue, and performance trends in real time. The system is designed with modular analytics components, REST-based APIs, JWT authentication, and WebSocket-based live updates.

---

## 2. System Overview

The platform provides the following core functions:

1. Dashboard analytics with revenue and order performance indicators.
2. Real-time order monitoring with automatic data propagation.
3. Historical monthly performance charts.
4. Customer-based revenue segmentation.
5. Order lifecycle support (create, view, update, delete).
6. Administrative settings including authentication and theme management.

---

## 3. Functional Features

### 3.1 Dashboard Modules

* Total revenue (completed orders only)
* Recent orders (latest five)
* Monthly revenue analytics
* Monthly orders analytics
* Top five customers by spending
* Product performance analytics (extendable)

### 3.2 Administrative Features

* Admin login (JWT authentication)
* Token-based route protection
* Settings panel (theme, admin profile, logout)
* Light and dark themes
* Local session management

### 3.3 Real-Time Capabilities

* WebSocket-triggered automatic updates for:

  * Orders
  * Revenue
  * Customer rankings
* Reactive charts and tables

---

## 4. Technical Stack

| Layer              | Technology        |
| ------------------ | ----------------- |
| Frontend           | React (Vite)      |
| Backend            | Node.js (Express) |
| Database           | MongoDB           |
| Realtime           | Socket.IO         |
| Authentication     | JWT + Middleware  |
| Charting           | Chart.js          |
| Styling            | Custom CSS        |
| Package Management | npm               |

---

## 5. Authentication Workflow

1. Admin submits email and password.
2. Backend validates credentials.
3. JWT token is generated post-validation.
4. Token is returned and stored in `localStorage`.
5. Backend API enforces protected routes using middleware.
6. Logout clears session and redirects to login.

---

## 6. Real-Time Communication Workflow

1. Order insertion, update, or deletion triggers WebSocket events.
2. Backend emits event signals:

   * `orders:update`
   * `revenue:update`
   * `customers:update`
3. UI components subscribed to these events refresh without manual reload.
4. Charts and tables reflect updated values dynamically.

---

## 7. System Architecture (High-Level)

* Presentation Layer: React
* State Layer: Local state + WebSocket listeners
* Middleware Layer: JWT verification
* Data Layer: MongoDB with aggregation pipelines
* Realtime Layer: Socket.IO event channels
* Business Logic Layer: Controllers and analytics processors

---

## 8. Folder Structure

```
ShopSphere/
 ├── backend/
 │   ├── controllers/
 │   ├── routes/
 │   ├── middleware/
 │   ├── models/
 │   ├── config/
 │   └── index.js
 ├── frontend/
 │   ├── src/
 │   │   ├── dashboard/
 │   │   ├── auth/
 │   │   ├── socket.js
 │   │   └── App.jsx
 └── README.md
```

---

## 9. Database Model: Order

```
userId: String
product: String
amount: Number
status: String
createdAt: Date
updatedAt: Date
```

---

## 10. API Endpoints

### 10.1 Authentication

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | /api/auth/login | Authenticate admin     |
| GET    | /api/auth/me    | Retrieve admin profile |

### 10.2 Orders

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /api/orders        | Retrieve all orders    |
| GET    | /api/orders/recent | Latest five orders     |
| POST   | /api/orders        | Insert single or batch |
| PUT    | /api/orders        | Update orders          |
| DELETE | /api/orders        | Delete orders          |

### 10.3 Analytics

| Endpoint                   | Description       |
| -------------------------- | ----------------- |
| /analytics/total-revenue   | Completed revenue |
| /analytics/monthly-sales   | Revenue by month  |
| /analytics/monthly-orders  | Orders by month   |
| /analytics/top-5-customers | Customer ranking  |
| /analytics/revenue         | Current revenue   |

---

## 11. WebSocket Events

| Event            | Trigger                        |
| ---------------- | ------------------------------ |
| orders:update    | Order mutation                 |
| revenue:update   | Completed order effect         |
| customers:update | Customer ranking recalculation |

---

## 12. Installation Instructions

### 12.1 Backend

```
cd backend
npm install
npm start
```

### 12.2 Frontend

```
cd frontend
npm install
npm run dev
```

---

## 13. Usage Guide

1. Launch backend server.
2. Launch frontend development environment.
3. Navigate to the login page.
4. Authenticate using admin credentials.
5. Access analytics dashboards.
6. Perform administrative actions (settings, logout, etc.)

---

## 14. Future Enhancements

* Role-based user management
* Product CRUD management
* Reporting and export (CSV/PDF)
* Notification services
* Cloud deployment pipeline
* Performance benchmarking and caching

---

## 15. Author Information

Name: Sowmathi
Role: Developer

---

## 16. License

License: MIT (Optional)

