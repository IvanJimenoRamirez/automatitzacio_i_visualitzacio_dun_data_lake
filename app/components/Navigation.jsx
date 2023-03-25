import Link from "next/link";

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
          <nav>
            <ul>
              {links.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}> {label}</Link>
                </li>
              ))}
            </ul>
          </nav>
    )
}