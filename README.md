# ShopSphere Admin Dashboard

A modern real-time analytics dashboard for managing orders, revenue, customers, and products.  
Built for admins to track sales performance with dynamic charts, socket updates, and JWT authentication.

---

## 🚀 Features

### 📊 Dashboard Modules
✔ Real-time Home Dashboard  
✔ Recent Orders (auto-updates)  
✔ Total Revenue (Completed Orders Only)  
✔ Top 5 Customers Dashboard  
✔ Monthly Dashboard:
- Total Monthly Revenue
- Total Monthly Orders  
✔ Products Management (extendable)

### 🔐 Authentication & Admin
✔ JWT-based Login  
✔ Secured Protected Routes  
✔ Token stored in localStorage  
✔ Logout System  
✔ Admin Profile (Name + Email)

### 🎨 UI System
✔ Dark Theme  
✔ Light Theme  
✔ Responsive Dashboard Cards  
✔ Chart Visualizations (Bar + Line)

### ⚡ Realtime
✔ WebSocket (Socket.IO)  
✔ Auto updates without refresh  
✔ Order updates propagate across dashboards

---

## 🧩 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite |
| Charts | Chart.js |
| Backend | Node.js + Express |
| Database | MongoDB |
| Realtime | Socket.IO |
| Auth | JWT |
| Styling | Custom CSS |
| Package Mgmt | npm |

---

## 📸 Screenshots (Placeholders)

```
![Dashboard](screenshots/dashboard.png)
![Orders](screenshots/orders.png)
![Top Customers](screenshots/top-customers.png)
![Monthly Dashboard](screenshots/monthly.png)
![Settings](screenshots/settings.png)
![Login](screenshots/login.png)
```

---

## 🗄 Folder Structure

```
ShopSphere/
 ├── backend/
 │   ├── controllers/
 │   ├── routes/
 │   ├── models/
 │   ├── middleware/
 │   ├── config/
 │   └── index.js
 ├── frontend/
 │   ├── src/
 │   │   ├── dashboard/
 │   │   ├── auth/
 │   │   └── socket.js
 └── README.md
```

---

## 🔐 Authentication Flow (JWT)

1. Admin logs in with email/password  
2. Backend verifies credentials  
3. JWT token is generated  
4. Token stored in `localStorage`  
5. Protected routes validate token via middleware

Example Login Response:

```json
{
  "token": "jwt_token_here",
  "admin": {
    "name": "Sowmathi",
    "email": "admin@example.com"
  }
}
```

---

## 🔌 WebSocket Events

| Event | Trigger |
|-------|---------|
| `orders:update` | Insert/Update/Delete Order |
| `revenue:update` | Completed order affects revenue |
| `customers:update` | Top customers ranking changes |

Frontend listens:

```js
socket.on("orders:update", refresh)
```

---

## 📦 Backend API Endpoints

### Auth
```
POST /api/auth/login
GET  /api/auth/me
```

### Orders
```
GET    /api/orders
GET    /api/orders/recent
POST   /api/orders
PUT    /api/orders
DELETE /api/orders
```

### Analytics
```
GET /api/analytics/top-5-customers
GET /api/analytics/total-revenue
GET /api/analytics/monthly-sales
GET /api/analytics/monthly-orders
GET /api/analytics/revenue
```

---

## ⚙ Settings Page

Includes:
✔ Theme Switcher (Dark/Light)  
✔ Admin Name (Sowmathi)  
✔ Admin Email  
✔ Logout Button  

---

## 🧪 Real-Time Behavior

Example: Insert order →

✔ Home Dashboard updates  
✔ Orders Table updates  
✔ Monthly Chart updates  
✔ Revenue updates  
✔ Top Customers updates  

Zero refresh needed.

---

## 🔧 Installation

### Backend

```sh
cd backend
npm install
npm start
```

### Frontend

```sh
cd frontend
npm install
npm run dev
```

---

## 🚀 Future Enhancements

✔ Admin password reset  
✔ Role-based auth  
✔ CSV/PDF Export  
✔ Notifications  
✔ Product CRUD  
✔ Multi-Store Analytics  
✔ Deployment script  

---

## 👤 Author

**Developed By:** *Sowmathi*

---

## 📜 License

MIT License (Optional)
