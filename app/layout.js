import "./globals.css";

export const metadata = {
  title: "Kaung Zaw Thant | AI Software Developer",
  description: "Portfolio website for Kaung Zaw Thant",
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
