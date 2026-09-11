# Laravel React Docker App

Full-stack web application built with **Laravel API** and **React**, running in a Docker environment.

The project includes authentication, role-based access control, permissions management, user management, role management, and product CRUD.

## 🚀 Tech Stack

### Backend

* PHP 8.2
* Laravel 12
* Laravel Sanctum
* Spatie Laravel Permission
* PostgreSQL 16
* REST API

### Frontend

* React 19
* Vite
* React Router
* Axios
* JavaScript

### DevOps

* Docker
* Docker Compose
* Apache

## ✨ Features

### Authentication

* User registration
* User login
* User logout
* Authenticated user information
* Token-based authentication with Laravel Sanctum

### Authorization

* Role-based access control
* Permission-based access control
* Multiple roles per user
* Dynamic permissions
* Protected API routes
* Protected React routes

### Roles & Permissions

* Create roles
* Update roles
* Delete roles
* Create permissions
* Update permissions
* Delete permissions
* Assign permissions to roles
* Synchronize role permissions

### User Management

* List users
* Create users
* Update users
* Delete users
* Assign multiple roles to users

### Products

* List products
* View a product
* Create products
* Update products
* Delete products

## 🏗️ Project Architecture


laravel-react-docker-app/
│
├── app/
│   ├── Http/
│   │   └── Controllers/
│   └── Models/
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── routes/
│   ├── api.php
│   └── web.php
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── routes/
│       └── services/
│
├── Dockerfile
├── docker-compose.yml
└── composer.json


## 🐳 Running the Project with Docker

### Requirements

Make sure you have installed:

* Docker Desktop
* Git

### 1. Clone the repository


git clone https://github.com/abdelalizahouani/laravel-react-docker-app.git



cd laravel-react-docker-app


### 2. Configure environment

Create the Docker environment file:


cp .env.example .env.docker

Then configure your PostgreSQL connection in `.env.docker`.

Example:


APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=pos_react
DB_USERNAME=postgres
DB_PASSWORD=admin


Generate an application key:


docker compose run --rm app php artisan key:generate --env=docker


### 3. Start Docker containers


docker compose up -d


Check the containers:


docker compose ps


### 4. Run migrations


docker compose exec app php artisan migrate


### 5. Seed roles and permissions


docker compose exec app php artisan db:seed --class=RolePermissionSeeder


## 🌐 Application URLs

### Laravel API


http://localhost:8000


### React Frontend


http://localhost:5173


## 🔐 API Authentication

Authentication is implemented using **Laravel Sanctum**.

The React application stores the authentication token and sends it with API requests using the `Authorization` header.

Example:


Authorization: Bearer <token>


## 🛡️ Permissions

The application uses **Spatie Laravel Permission**.

Example permissions:


products.view
products.create
products.update
products.delete

users.view
users.create
users.update
users.delete

permissions.view
permissions.create
permissions.update
permissions.delete

roles.view
roles.create
roles.update
roles.delete
roles.permissions


## 👥 Default Roles

The application includes three main roles:

| Role    | Description       |
| ------- | ----------------- |
| admin   | Full access       |
| manager | Management access |
| user    | Limited access    |

Permissions can be assigned dynamically to roles.

## 🗄️ Database

The application uses:


PostgreSQL 16


The PostgreSQL database runs inside Docker and uses a persistent Docker volume.

## 📦 Main API Resources


POST   /api/register
POST   /api/login
POST   /api/logout
GET    /api/user

GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}

GET    /api/users
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}

GET    /api/roles
POST   /api/roles
PUT    /api/roles/{id}
DELETE /api/roles/{id}

GET    /api/permissions
POST   /api/permissions
PUT    /api/permissions/{id}
DELETE /api/permissions/{id}


## 📚 What This Project Demonstrates

This project was built to practice and demonstrate:

* Laravel REST API development
* React application development
* Authentication with Laravel Sanctum
* Authorization with roles and permissions
* CRUD operations
* API integration with Axios
* Protected React routes
* Protected Laravel API routes
* PostgreSQL database management
* Docker containerization
* Docker Compose
* Full-stack application architecture

## 👨‍💻 Author

**Abdelali Zahouani**

Full-Stack Developer

GitHub:
https://github.com/abdelalizahouani

## 📄 License

This project is open-sourced software licensed under the MIT license.
