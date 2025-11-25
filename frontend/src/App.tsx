import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import ValidatorHub from "./pages/ValidatorHub";
import Scoreboard from "./pages/Scoreboard";
import "./App.css";

function App() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      isActive
        ? "bg-brand-600 text-white shadow-card"
        : "text-slate-500 hover:text-slate-900"
    }`;

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                YoTouch
              </p>
              <h1 className="text-xl font-semibold text-slate-900">
                Trust Fabric Control Center
              </h1>
            </div>
            <nav className="flex gap-3">
              <NavLink to="/" className={navLinkClass} end>
                Onboarding
              </NavLink>
              <NavLink to="/validators" className={navLinkClass}>
                Validators
              </NavLink>
              <NavLink to="/scoreboard" className={navLinkClass}>
                Scoreboard
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/validators" element={<ValidatorHub />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
