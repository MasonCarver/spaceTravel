import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading";
import SpaceTravelApi from "../services/SpaceTravelApi";
import styles from "./PlanetsPage.module.css";

import mercuryImg from "../assets/mercury.jpeg";
import venusImg from "../assets/venus.jpeg";
import earthImg from "../assets/earth.jpeg";
import marsImg from "../assets/mars.jpeg";
import jupiterImg from "../assets/jupiter.jpeg";
import saturnImg from "../assets/saturn.jpeg";
import uranusImg from "../assets/uranus.jpeg";
import neptuneImg from "../assets/neptune.jpeg";

const fallbackImages = {
  Mercury: mercuryImg,
  Venus: venusImg,
  Earth: earthImg,
  Mars: marsImg,
  Jupiter: jupiterImg,
  Saturn: saturnImg,
  Uranus: uranusImg,
  Neptune: neptuneImg,
};

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

    for (const planet of planets) {
      map.set(planet.id, []);
    }

    for (const spacecraft of spacecrafts) {
      const list = map.get(spacecraft.currentLocation) || [];
      list.push(spacecraft);
      map.set(spacecraft.currentLocation, list);
    }

    return map;
  }, [planets, spacecrafts]);

  async function handleSend(planetId) {
    setError("");

    const spacecraftId = selectedByPlanet[planetId];

    if (!spacecraftId) return;

    const spacecraft = spacecrafts.find(
      (spacecraft) => spacecraft.id === spacecraftId,
    );

    if (!spacecraft) {
      setError("Selected spacecraft not found.");
      return;
    }

    if (spacecraft.currentLocation === planetId) {
      setError("Destination must be different from current location.");
      return;
    }

    setIsLoading(true);

    const response = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId: planetId,
    });

    if (response.isError) {
      setError(response.data?.message || "Failed to send spacecraft.");
      setIsLoading(false);
      return;
    }

    setSelectedByPlanet({});
    await fetchData();
  }

  if (isLoading) return <Loading />;

  const planetNames = Object.fromEntries(
    planets.map((planet) => [planet.id, planet.name]),
  );

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

              <img
                src={planet.pictureUrl || fallbackImages[planet.name]}
                alt={planet.name}
                className={styles.planetCard__image}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackImages[planet.name];
                }}
              />

              <h3 className={styles.planetCard__sectionTitle}>
                Stationed Spacecraft
              </h3>

              {stationed.length === 0 ? (
                <p className={styles.planetCard__hint}>
                  No spacecraft stationed here.
                </p>
              ) : (
                <ul className={styles.planetCard__spacecraftList}>
                  {stationed.map((spacecraft) => (
                    <li key={spacecraft.id}>
                      {spacecraft.name} (cap: {spacecraft.capacity})
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
                  onChange={(event) =>
                    setSelectedByPlanet((previousSelected) => ({
                      ...previousSelected,
                      [planet.id]: event.target.value,
                    }))
                  }
                >
                  <option value="">Select a spacecraft</option>

                  {spacecrafts
                    .filter(
                      (spacecraft) => spacecraft.currentLocation !== planet.id,
                    )
                    .map((spacecraft) => (
                      <option key={spacecraft.id} value={spacecraft.id}>
                        {spacecraft.name} (from{" "}
                        {planetNames[spacecraft.currentLocation]})
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
