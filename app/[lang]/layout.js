// Global styles
import "../../styles/globals.css";
//Fonts
import { font } from "../../components/fonts/fonts.jsx";

export const metadata = {
  title: "Data Lake App",
  description: "Data Lake management app",
  author: "Iván Jimeno",
  keywords: "Data Lake, Data Warehouse, Data Lake Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <head></head>
      {children}
    </html>
  );
}
