import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { Link } from "react-router-dom";
import styles from "./SpacecraftsPage.module.css";

function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSpacecrafts() {
    setIsLoading(true);
    setError("");

    const res = await SpaceTravelApi.getSpacecrafts();

    if (res.isError) {
      setError("Failed to load spacecraft");
      setSpacecrafts([]);
    } else {
      setSpacecrafts(res.data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchSpacecrafts();
  }, []);

  async function handleDelete(id) {
    const res = await SpaceTravelApi.destroySpacecraftById({ id });

    if (res.isError) {
      setError("Failed to delete spacecraft");
      return;
    }

    // Refresh list after delete
    fetchSpacecrafts();
  }

  if (isLoading) return <Loading />;

  return (
    <div className={styles.spacecrafts}>
      <div className={styles.spacecrafts__header}>
        <h1 className={styles.spacecrafts__title}>Spacecrafts</h1>

        <Link to="/spacecrafts/new" className={styles.spacecrafts__buildLink}>
          Build New Spacecraft
        </Link>
      </div>

      {error && <p className={styles.spacecrafts__error}>{error}</p>}

      <div className={styles.spacecrafts__list}>
        {spacecrafts.map((spacecraft) => (
          <div key={spacecraft.id} className={styles.spacecraftCard}>
            <h2 className={styles.spacecraftCard__name}>{spacecraft.name}</h2>

            <p className={styles.spacecraftCard__meta}>
              <strong>Capacity:</strong> {spacecraft.capacity}
            </p>

            <p className={styles.spacecraftCard__description}>
              {spacecraft.description}
            </p>

            <div className={styles.spacecraftCard__actions}>
              <Link
                to={`/spacecrafts/${spacecraft.id}`}
                className={styles.spacecraftCard__details}
              >
                View Details
              </Link>

              <button
                className={styles.spacecraftCard__button}
                onClick={() => handleDelete(spacecraft.id)}
              >
                Destroy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpacecraftsPage;
