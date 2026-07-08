import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className={styles.app}>
          <NavBar />
          <AppRoutes />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
