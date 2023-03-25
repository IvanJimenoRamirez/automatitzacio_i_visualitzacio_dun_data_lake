import { Navigation } from "./components/Navigation";

export const metadata = {
  title: "Data Lake App",
  description: "Data Lake management app",
  author: "Iván Jimeno",
  keywords: "Data Lake, Data Warehouse, Data Lake Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <header>
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
