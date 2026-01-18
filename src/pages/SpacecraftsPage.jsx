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
        <h1>Spacecrafts</h1>
        <Link to="/spacecrafts/new">Build New Spacecraft</Link>
      </div>

      {error && <p className={styles.spacecrafts__error}>{error}</p>}

      {spacecrafts.length === 0 ? (
        <p>No spacecraft found.</p>
      ) : (
        <ul className={styles.spacecrafts__list}>
          {spacecrafts.map((sc) => (
            <li key={sc.id} className={styles.card}>
              <h3 className={styles.card__title}>{sc.name}</h3>
              <p>
                <strong>Capacity:</strong> {sc.capacity}
              </p>
              <p>{sc.description}</p>

              <div className={styles.card__actions}>
                <Link
                  className={styles.card__link}
                  to={`/spacecrafts/${sc.id}`}
                >
                  View Details
                </Link>
                <button
                  className={styles.card__button}
                  onClick={() => handleDelete(sc.id)}
                >
                  Destroy
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpacecraftsPage;
