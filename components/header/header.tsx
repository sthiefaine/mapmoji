import Link from "next/link";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}> 🗺️ Weather MapMoji</h1>{" "}
      </Link>
    </header>
  );
}
