import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <ul>
        <li><Link href={"/users"}>Users</Link></li>
        <li><Link href={"/portfolios"}>Portfolios</Link></li>
        <li><Link href={"/company"}>Companies</Link></li>
      </ul>
    </div>
  );
}
