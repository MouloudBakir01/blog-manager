import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <header className="header">
        <div className="container"><Header /></div>
      </header>

      <main className="container" role="main" aria-label="Main content">
        <Outlet />
      </main>

      <footer className="footer" role="contentinfo" aria-label="Site footer">
        <div className="container"><Footer /></div>
      </footer>
    </div>
  );
}
