import Link from "next/link";
import styles from "./Navigation.module.css";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Login",
    route: "/login",
  },
];

export function Navigation() {
    return (
          <nav className={styles.navbar}>
            <ul className={styles.navigation}>
              {links.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}> {label}</Link>
                </li>
              ))}
            </ul>
          </nav>
    )
}