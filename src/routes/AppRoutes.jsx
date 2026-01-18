import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import SpacecraftsPage from "../pages/SpacecraftsPage";
import SpacecraftPage from "../pages/SpacecraftPage";
import ConstructionPage from "../pages/ConstructionPage";
import PlanetsPage from "../pages/PlanetsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/Spacecrafts" element={<SpacecraftsPage />} />
      <Route path="/Spacecrafts/:id" element={<SpacecraftPage />} />
      <Route path="/Spacecrafts/new" element={<ConstructionPage />} />

      <Route path="/planets" element={<PlanetsPage />} />

      {/* Redirect all unkown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default AppRoutes;
