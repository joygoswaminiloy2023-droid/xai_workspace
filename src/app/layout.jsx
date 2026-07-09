import "./globals.css";

export const metadata = {
  title: "Xai — Intelligence Workspace",
  description:
    "From raw data to structured intelligence to actionable insight. Xai turns your data into automations that act on your behalf.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
