import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>
        Space Travel: Expanding Horizons Beyond Earth
      </h1>

      <div className={styles.home__sections}>
        <section className={styles.home__section}>
          <h2>Journey into the Future</h2>
          <p>
            In a world where the impossible has become reality, humanity has
            reached beyond Earth to build new homes among the stars.
          </p>
        </section>

        <section className={styles.home__section}>
          <h2>From Neglect to Innovation</h2>
          <p>
            Earth now stands as a reminder of the cost of neglect, and the power
            of human ingenuity to rise beyond it.
          </p>
        </section>

        <section className={styles.home__section}>
          <h2>Engineer, Explore, Leader</h2>
          <p>
            Design, deploy, and decommission spacecraft as you guide humanity's
            future.
          </p>
        </section>

        <section className={styles.home__section}>
          <h2>A Universe of Awaits</h2>
          <p>
            Immerse yourself in the thrill of exploration as you chart
            interplanetary courses within our solar system. Seamlessly navigate
            your fleet of spacecraft, hurtling through the cosmic void from one
            celestial body to another. The universe becomes your playground, and
            every planet a potential new home.
          </p>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
