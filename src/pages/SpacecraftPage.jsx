import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SpaceTravelApi from "../services/SpaceTravelApi";
import styles from "./SpacecraftPage.module.css";

function SpacecraftPage() {
  const { id } = useParams();

  const [spacecraft, setSpacecraft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSpacecraft() {
      setIsLoading(true);
      setError("");

      const res = await SpaceTravelApi.getSpacecraftById({ id });

      if (res.isError) {
        setError("Failed to load spacecraft.");
        setSpacecraft(null);
      } else {
        setSpacecraft(res.data);
      }

      setIsLoading(false);
    }

    fetchSpacecraft();
  }, [id]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/spacecrafts">Back to Spacecrafts</Link>
      </div>
    );
  }

  if (!spacecraft) {
    return (
      <div>
        <p>Spacecraft not found.</p>
        <Link to="/spacecrafts">Back to Spacecrafts</Link>
      </div>
    );
  }

  return (
    <div className={styles.spacecraft}>
      <Link to="/spacecrafts" className={styles.spacecraft__back}>
        ← Back to Spacecrafts
      </Link>

      <h1 className={styles.spacecraft__title}>{spacecraft.name}</h1>

      <div className={styles.spacecraft__meta}>
        <p>
          <strong>Capacity:</strong> {spacecraft.capacity}
        </p>
        <p>
          <strong>Current Location (Planet ID):</strong>{" "}
          {spacecraft.currentLocation}
        </p>
      </div>

      <p className={styles.spacecraft__description}>
        <strong>Description:</strong> {spacecraft.description}
      </p>

      {spacecraft.pictureUrl && (
        <div className={styles.spacecraft__image}>
          <img src={spacecraft.pictureUrl} alt={spacecraft.name} />
        </div>
      )}
    </div>
  );
}

export default SpacecraftPage;
