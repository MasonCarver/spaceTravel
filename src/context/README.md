# Space Travel

## Project Overview

Space Travel is a React application that simulates managing spacecraft as humanity expands throughout the solar system. Users can build spacecraft, view spacecraft details, decommission spacecraft, and dispatch spacecraft between planets while tracking each planet's population.

---

## Features

- Home page introducing the application
- View a list of all spacecraft
- View details for an individual spacecraft
- Build new spacecraft
- Decommission spacecraft
- View all planets
- View spacecraft stationed on each planet
- Dispatch spacecraft between planets
- Prevent dispatching a spacecraft to its current location
- Loading component displayed while data is being fetched
- Redirect undefined routes to the Home page

---

## Technologies Used

- React
- React Router
- JavaScript (ES6)
- CSS Modules
- Vite
- NanoID

---

## Project Structure

```text
src/
├── assets/
├── components/
├── pages/
├── routes/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

---

## Application Pages

### Home

Provides an overview of the application and navigation to the main sections.

### Spacecrafts

Displays all spacecraft and allows the user to:

- View spacecraft details
- Build a new spacecraft
- Decommission a spacecraft

### Spacecraft Details

Displays detailed information for an individual spacecraft, including its current location and description.

### Build Spacecraft

Allows the user to create a new spacecraft using a validated form.

### Planets

Displays all planets, their current populations, spacecraft stationed on each planet, and allows spacecraft to be dispatched between planets.

---

## React Concepts Demonstrated

This project demonstrates the following React concepts:

- Functional components
- React Hooks (`useState`, `useEffect`, `useMemo`)
- React Router
- Dynamic routes
- State management
- Event handling
- Form validation
- Conditional rendering
- Component reuse
- Error handling

---

## Notes

- Planet images use local fallback images if an external image cannot be loaded.
- Spacecraft cannot be dispatched to the planet they are already stationed on.
- Planet populations are updated when spacecraft are dispatched.

---

## Author

Mason Carver

Springboard Full Stack Software Engineering Career Track
