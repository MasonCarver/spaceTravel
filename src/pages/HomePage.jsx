import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <p className={styles.hero__eyebrow}>Mission Control</p>

        <h1 className={styles.hero__title}>
          Space Travel: Expanding Horizons Beyond Earth
        </h1>

        <p className={styles.hero__text}>
          Manage spacecraft construction, deploy missions across the solar
          system, and monitor planetary populations as humanity establishes new
          homes beyond Earth.
        </p>

        <div className={styles.hero__actions}>
          <Link to="/spacecrafts" className={styles.button}>
            View Spacecraft
          </Link>

          <Link to="/planets" className={styles.buttonSecondary}>
            View Planets
          </Link>
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Build</h2>
          <p>
            Construct new spacecraft by entering a name, passenger capacity,
            description, and optional image URL.
          </p>
        </article>

        <article className={styles.card}>
          <h2>Manage</h2>
          <p>
            Review spacecraft details, track current locations, and decommission
            ships that are no longer needed.
          </p>
        </article>

        <article className={styles.card}>
          <h2>Dispatch</h2>
          <p>
            Send spacecraft between planets while preventing invalid transfers
            to the same location.
          </p>
        </article>

        <article className={styles.card}>
          <h2>Colonize</h2>
          <p>
            Watch planetary populations update as spacecraft move colonists from
            one planet to another.
          </p>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
