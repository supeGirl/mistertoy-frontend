# MisterToy Project

## Overview

MisterToy is a full-stack web application that allows users to browse, manage, and interact with toys. The project is split into two main parts: **Frontend** and **Backend**, with each part having its own folder and repository.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Frontend](#frontend)
   - [Folder Structure](#frontend-folder-structure)
   - [Features](#frontend-features)
3. [Backend](#backend)
   - [API Endpoints](#api-endpoints)
   - [Database Setup](#database-setup)
4. [Part 2: Awesome MisterToy](#part-2-awesome-mistertoy)
   - [UI Components](#ui-components)
   - [Charts & Dashboard](#charts-dashboard)
5. [Part 3: Toys and Users with Mongo](#part-3-toys-and-users-with-mongo)
   - [Authentication](#authentication)
   - [Messages](#messages)
6. [Part 4: Beautiful MisterToy with SCSS](#part-4-beautiful-mistertoy-with-scss)
7. [How to Run](#how-to-run)
8. [Technologies Used](#technologies-used)

---

## Project Setup

### 1. Set up the project folder:

- Create the root project folder: `mistertoy-proj`
- Inside this folder, create two subfolders:
  - `mistertoy-frontend` (Frontend)
  - `mistertoy-backend` (Backend)

### 2. Git Setup:

- Initialize Git for both frontend and backend folders.
- Keep separate commits for frontend and backend progress.
- Ensure meaningful commit messages to track development progress.

---

## Frontend

### Folder Structure

mistertoy-frontend/ │ ├── src/ │ ├── components/ │ ├── services/ │ ├── store/ │ ├── pages/ │ └── App.js ├── public/ └── package.json

### Features

1. **Store**:
   - Manage global state of the application.
2. **ToyService**:

   - CRUD operations with localStorage initially, to be later connected to the backend.

3. **Pages**:
   - **ToyDetails**: Renders full details of a toy.
   - **ToyEdit**: Allows editing toy details.
   - **ToyIndex**: Displays a list of toys, includes:
     - **ToyList**: Displays all toys.
     - **ToyPreview**: A preview of each toy.
     - **ToyFilter**: Filter toys by name (with debounce), stock status, labels, and sort by name, price, or created date.

### Git Workflow:

- Commit and push frontend code with meaningful commit messages, e.g., `"Frontend basic functionality"`.

---

## Backend

### API Endpoints

1. **GET /api/toy**: Returns a list of all toys.
2. **GET /api/toy/:id**: Returns details of a specific toy by its ID.
3. **DELETE /api/toy/:id**: Deletes a toy by its ID.
4. **POST /api/toy**: Adds a new toy.
5. **PUT /api/toy**: Updates a toy.

### Database Setup

- **Toy Collection**: Store toy data in a MongoDB collection.
- **Toy Service**: Service that interacts with the database.
- **Toy Controller**: Handles business logic for CRUD operations.
- **Toy Routes**: Routes that map the endpoints to controller functions.

### Testing with Postman:

- Test all the endpoints using Postman to ensure functionality.

---

## Part 2: Awesome MisterToy

### UI Components

- Use community components and libraries, such as form validation libraries and UI component libraries like `react-select`.

### Charts & Dashboard

- Implement a dashboard page with the following charts:
  - **Prices per Label**: A chart that displays the prices of toys categorized by labels (Art, Baby, etc.).
  - **Inventory by Label**: A chart showing the percentage of toys that are in stock by labels.
  - **Line Chart**: Display random numbers and dates.

---

## Part 3: Toys and Users with Mongo

### Authentication

- Implement a **user collection** to store user data (`_id`, `fullname`, `username`, `password`, `isAdmin`).
- Create an admin user (`isAdmin: true`) who can manage toys (edit, delete, add).
- Protect the relevant routes with middleware to ensure only admin users can edit/delete toys.

### Messages

- Add a **messages** array to each toy to store user feedback or messages.
- Allow logged-in users to add messages to toys.
- **POST /api/toy/:id/msg**: Add a message to a toy's message array.

---

## Part 4: Beautiful MisterToy with SCSS

### SCSS Architecture

- Convert your CSS to SCSS and implement a structured SCSS architecture.
- Use SCSS features such as variables, mixins, and functions for a cleaner and more maintainable stylesheet.

---

## How to Run

### Frontend

1. Navigate to the `mistertoy-frontend` folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend:
   npm run dev

### Backend

1. Navigate to the mistertoy-backend folder.

2. Install dependencies:

   ```
   npm install
   ```

3. Start the frontend:
   npm ren dev

License
This project is licensed under the MIT License - see the LICENSE file for details.

css
Copy code

This `README.md` file covers the main sections of your project, including setup instructions, features, API endpoints, and usage. You can adjust it based on further requirements or specific details related to your project.
