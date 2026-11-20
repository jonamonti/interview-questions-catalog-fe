import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}></aside>
      <main className={styles.panel}></main>
    </div>
  );
};

export default HomePage;
