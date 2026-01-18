import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading";
import SpaceTravelApi from "../services/SpaceTravelApi";
import styles from "./PlanetsPage.module.css";

function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedByPlanet, setSelectedByPlanet] = useState({});

  async function fetchData() {
    setIsLoading(true);
    setError("");

    const [planetsRes, spacecraftsRes] = await Promise.all([
      SpaceTravelApi.getPlanets(),
      SpaceTravelApi.getSpacecrafts(),
    ]);

    if (planetsRes.isError || spacecraftsRes.isError) {
      setError("Failed to load planets or spacecraft.");
      setPlanets([]);
      setSpacecrafts([]);
      setIsLoading(false);
      return;
    }

    setPlanets(planetsRes.data);
    setSpacecrafts(spacecraftsRes.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const spacecraftsByPlanet = useMemo(() => {
    const map = new Map();
    for (const p of planets) map.set(p.id, []);
    for (const sc of spacecrafts) {
      const list = map.get(sc.currentLocation) || [];
      list.push(sc);
      map.set(sc.currentLocation, list);
    }
    return map;
  }, [planets, spacecrafts]);

  async function handleSend(planetId) {
    setError("");

    const spacecraftId = selectedByPlanet[planetId];
    if (!spacecraftId) return;

    const sc = spacecrafts.find((s) => s.id === spacecraftId);
    if (!sc) {
      setError("Selected spacecraft not found.");
      return;
    }

    if (sc.currentLocation === planetId) {
      setError("Destination must be different from current location.");
      return;
    }

    setIsLoading(true);

    const res = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId: planetId,
    });

    setIsLoading(false);

    if (res.isError) {
      setError("Failed to send spacecraft.");
      return;
    }

    fetchData();
  }

  if (isLoading) return <Loading />;

  return (
    <div className={styles.planets}>
      <h1 className={styles.planets__title}>Planets</h1>

      {error && <p className={styles.planets__error}>{error}</p>}

      <div className={styles.planets__grid}>
        {planets.map((planet) => {
          const stationed = spacecraftsByPlanet.get(planet.id) || [];

          return (
            <div key={planet.id} className={styles.planetCard}>
              <div className={styles.planetCard__header}>
                <h2 className={styles.planetCard__name}>{planet.name}</h2>
                <p className={styles.planetCard__population}>
                  <strong>Population:</strong> {planet.currentPopulation}
                </p>
              </div>

              {planet.pictureUrl && (
                <img
                  src={planet.pictureUrl}
                  alt={planet.name}
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    borderRadius: "8px",
                  }}
                />
              )}

              <h3 className={styles.planetCard__sectionTitle}>
                Stationed Spacecraft
              </h3>

              {stationed.length === 0 ? (
                <p className={styles.planetCard__hint}>
                  No spacecraft stationed here.
                </p>
              ) : (
                <ul className={styles.planetCard__spacecraftList}>
                  {stationed.map((sc) => (
                    <li key={sc.id}>
                      {sc.name} (cap: {sc.capacity})
                    </li>
                  ))}
                </ul>
              )}

              <h3 className={styles.planetCard__sectionTitle}>
                Send Spacecraft Here
              </h3>

              <div className={styles.planetCard__sendRow}>
                <select
                  className={styles.planetCard__select}
                  value={selectedByPlanet[planet.id] || ""}
                  onChange={(e) =>
                    setSelectedByPlanet((prev) => ({
                      ...prev,
                      [planet.id]: e.target.value,
                    }))
                  }
                >
                  <option value="">Select a spacecraft</option>
                  {spacecrafts
                    .filter((sc) => sc.currentLocation !== planet.id)
                    .map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.name} (from planet {sc.currentLocation})
                      </option>
                    ))}
                </select>

                <button
                  className={styles.planetCard__button}
                  onClick={() => handleSend(planet.id)}
                  disabled={!selectedByPlanet[planet.id]}
                >
                  Send
                </button>

                <p className={styles.planetCard__hint}>
                  Destination must be different from the spacecraft&apos;s
                  current planet.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanetsPage;
