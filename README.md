# ERP Management System

A full-stack ERP dashboard built with React, Material UI, Express, and MongoDB. The project covers day-to-day ERP workflows including authentication, product management, orders, GRN processing, invoicing, directory access, and role-based admin controls.

## Overview

This project is designed as an internship-ready ERP application with:

- JWT-based authentication
- Role-based access control for `admin` and `sales`
- Product inventory management
- Purchase order and sales order workflows
- GRN handling for received goods
- Invoice generation from sales orders
- User management for admins
- Dashboard summaries for core business metrics

## Tech Stack

- Frontend: React, React Router, Material UI, Axios
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Authentication: JWT + protected API routes

## Modules

- `Dashboard`: High-level business summary cards and metrics
- `Products`: Create, update, delete, and view inventory items
- `Directory`: Business directory view inside the ERP shell
- `Orders`: Purchase orders and sales orders management
- `GRN`: Goods receipt note creation from purchase orders
- `Invoices`: Invoice preview and save flow based on sales orders
- `Users`: Admin-only user management
- `Auth`: Login, registration, protected routes, and role checks

## Roles

- `admin`
  Can access all modules, including user management and admin-only actions.
- `sales`
  Can access operational modules but not the admin users page.

Public self-registration is restricted to the `sales` role. Admins can still create users with different roles from the admin panel.

## Project Structure

```text
src/
  backend/
    controllers/
    middleware/
    models/
    routes/
    server.js
  components/
  pages/
  utils/
  App.js
```

## Local Setup

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd src/backend
npm install
```

### 3. Configure environment variables

Create `src/backend/.env` with:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REACT_APP_API_URL=http://localhost:5000/api
```

If you are running the frontend locally against the local backend, you can also place this in the root frontend environment if needed:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Run Locally

### Start the backend

From `src/backend`:

```bash
node server.js
```

### Start the frontend

From the project root:

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

Backend runs on:

```text
http://localhost:5000
```

## Available Scripts

From the project root:

```bash
npm start
npm test
npm run build
```

## Authentication Notes

- Protected pages require a valid JWT token in local storage.
- Invalid or expired tokens are cleared automatically and redirected to `/login`.
- Admin-only access is enforced on both the frontend and backend.

## Invoice Page Notes

- The invoice page loads sales orders, generates an invoice preview, and saves invoices through the backend.
- Saving an invoice also updates product stock based on sold quantities.
- Invoice history currently falls back to `invoiceDate` because the invoice schema does not yet store automatic timestamps.

## Known Limitations

- Backend code is stored inside `src/backend`, which works for this project but is not the most typical production layout.
- Automated test coverage is currently minimal.
- Some validation and error handling are intentionally lightweight for internship scope.

## Build Status

The frontend production build passes successfully with:

```bash
npm run build
```

## Future Improvements

- Add stronger form validation across all modules
- Improve automated test coverage
- Add toast notifications instead of browser alerts
- Add export/print support for invoices
- Add better audit logging and activity history

## Author

Built as an internship ERP project using React, Express, and MongoDB.
