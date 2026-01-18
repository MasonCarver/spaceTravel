import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <NavBar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
