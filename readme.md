# Arbetsprov 2025

A modern web application built with React, Express, and TypeScript, featuring a responsive UI styled with Tailwind CSS.

## Technologies

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Hook Form with Yup validation
  - Lucide React icons

- **Backend:**
  - Express.js
  - Node.js
  - TypeScript
  - CORS enabled

## Prerequisites

- Node.js (v20.0.0 or higher recommended)
- npm or yarn package manager

## Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd arbetsprov2025
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

The application consists of both a client and server component. You'll need to run both to use the application fully.

### Start the Client (Vite Development Server)
```bash
npm run start:client
```
This will start the development server, typically at `http://localhost:5173`

### Start the Server
```bash
npm run start:server
```
This will start the Express server with hot-reload enabled through nodemon.

## Development Notes

- The project uses TypeScript for type safety
- Tailwind CSS is configured for styling
- Form validation is handled through React Hook Form with Yup schemas
- The server is set up with CORS enabled for development

