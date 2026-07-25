# Employee Leave Management System

A full-stack web application developed using **Spring Boot**, **MySQL**, **HTML**, **CSS**, and **JavaScript** that helps organizations manage employee leave requests efficiently. Employees can apply for leave, while administrators can approve or reject requests through a dedicated dashboard.


## 📌 Features

### Employee
- Employee Registration
- Employee Login
- Apply for Leave
- View Leave History
- Check Leave Status (Pending, Approved, Rejected)

### Admin
- Admin Login
- View Dashboard
- Manage Employees
- View All Leave Requests
- Approve or Reject Leave Requests
- Dashboard Statistics



## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST API

### Database
- MySQL

### Tools
- Maven
- Git & GitHub
- VS Code
- IntelliJ IDEA / Eclipse
- Postman



## 📂 Project Structure
```
leave-management-system/
│
├── src/
│   ├── main/
│   │
│   ├── java/
│   │   └── com/
│   │       └── suriya/
│   │           └── leave/
│   │               │
│   │               ├── LeaveApplication.java
│   │               │
│   │               ├── controller/
│   │               │   ├── EmployeeController.java
│   │               │   ├── LeaveRequestController.java
│   │               │   └── AdminController.java
│   │               │
│   │               ├── service/
│   │               │   ├── EmployeeService.java
│   │               │   ├── LeaveRequestService.java
│   │               │   └── AdminService.java
│   │               │
│   │               ├── repository/
│   │               │   ├── EmployeeRepository.java
│   │               │   └── LeaveRequestRepository.java
│   │               │
│   │               ├── entity/
│   │               │   ├── Employee.java
│   │               │   └── LeaveRequest.java
│   │               │
│   │               ├── dto/
│   │               │   └── DashboardResponse.java
│   │               │
│   │               └── config/
│   │                   └── CorsConfig.java
│   │
│   └── resources/
│       ├── application.properties
│       └── static/
│
├── src/
│   └── test/
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```


## 📊 Database

Database Name:

```
leave_management
```

Tables:

- Employee
- Leave_Request



## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SuriyaPrabha-hub/Employee-Leave-Management.git
```

### 2. Open Project

Open the project in IntelliJ IDEA, Eclipse, or VS Code.

### 3. Configure MySQL

Create a database:

```sql
CREATE DATABASE leave_management;
```

Update database credentials in:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/leave_management
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

### 4. Run the Application

Using Maven:

```bash
mvn spring-boot:run
```

or

Run the `LeaveApplication.java` file.



## 🌐 API Endpoints

### Employee

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/employees` | Register Employee |
| GET | `/employees` | Get All Employees |

### Leave

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/leave` | Apply Leave |
| GET | `/leave` | View All Leave Requests |
| PUT | `/leave/approve/{id}` | Approve Leave |
| PUT | `/leave/reject/{id}` | Reject Leave |
| GET | `/leave/history/{employeeId}` | Leave History |

### Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/admin/dashboard` | Dashboard Statistics |


## 🚀 Future Enhancements

- Email Notifications
- JWT Authentication
- Role-Based Access Control
- Leave Balance Management
- Export Reports (PDF/Excel)
- Responsive Mobile Design



## 👨‍💻 Author

**Suriya Prabha M**

GitHub: https://github.com/SuriyaPrabha-hub

---

## 📄 License

This project is developed for educational purposes and is free to use for learning and academic projects.
