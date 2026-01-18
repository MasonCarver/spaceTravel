import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import SpaceTravelApi from "../services/SpaceTravelApi";
import styles from "./ConstructionPage.module.css";

function ConstructionPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    const nextErrors = {};

    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!capacity.trim()) nextErrors.capacity = "Capacity is required.";
    if (!description.trim())
      nextErrors.description = "Description is required.";

    const capNum = Number(capacity);
    if (capacity.trim() && (!Number.isFinite(capNum) || capNum <= 0)) {
      nextErrors.capacity = "Capacity must be a positive number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setIsLoading(true);

    const res = await SpaceTravelApi.buildSpacecraft({
      name: name.trim(),
      capacity: Number(capacity),
      description: description.trim(),
      pictureUrl: pictureUrl.trim() ? pictureUrl.trim() : undefined,
    });

    setIsLoading(false);

    if (res.isError) {
      setApiError("Failed to build spacecraft");
      return;
    }

    navigate("/spacecrafts");
  }

  if (isLoading) return <Loading />;

  return (
    <div className={styles.construction}>
      <Link to="/spacecrafts" className={styles.construction__back}>
        ← Back to Spacecrafts
      </Link>

      <h1 className={styles.construction__title}>Build New Spacecraft</h1>

      {apiError && <p className={styles.construction__error}>{apiError}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__group}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && (
            <p className={styles.form__fieldError}>{errors.name}</p>
          )}
        </div>

        <div className={styles.form__group}>
          <label>Capacity</label>
          <input
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          {errors.capacity && (
            <p className={styles.form__fieldError}>{errors.capacity}</p>
          )}
        </div>

        <div className={styles.form__group}>
          <label>Description</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className={styles.form__fieldError}>{errors.description}</p>
          )}
        </div>

        <div className={styles.form__group}>
          <label>Picture URL (optional)</label>
          <input
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.form__submit}>
          Build Spacecraft
        </button>
      </form>
    </div>
  );
}

export default ConstructionPage;
