# Employee Management Dashboard

A responsive Employee Management Dashboard built with React, Vite, Tailwind CSS, and React Router. The application allows users to manage employee records with authentication, theme switching, and CRUD operations.

## Features

### Authentication
- User Signup
- User Login
- Forgot Password / Reset Password
- Protected Routes
- LocalStorage-based authentication

### Employee Management
- Fetch employee data from DummyJSON API
- View employee list in table format
- Add employee
- Edit employee
- Delete employee
- Search employee by name
- Filter employees by department
- Loader while fetching/searching data

### Dashboard
- Total Employees
- Total Departments
- Male Employees Count
- Female Employees Count
- Top 5 Recent Employees

### UI / UX
- Responsive layout
- Sidebar + Navbar layout
- Dark / Light theme
- Reusable Components:
  - Button
  - Modal
  - Loader
  - Table

---

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Context API
- LocalStorage
- DummyJSON API

---

## Project Structure

```bash
src/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   ├── ThemeContext.jsx
│   │   └── EmployeeContext.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── MainLayout.jsx
│   │
│   └── pages/
│       ├── Login.jsx
│       ├── Signup.jsx
│       ├── ForgetPassword.jsx
│       ├── Dashboard.jsx
│       └── Employee.jsx
│
├── App.jsx
└── main.jsx
```
## Deployment

Project deployed using **Vercel**.

### Vercel Configuration
Create `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## API Used

Employee Data:

https://dummyjson.com/users

---


---

## Author

**Rishabh Sinha**  
B.Tech CSE | React Developer | Full Stack Enthusiast
