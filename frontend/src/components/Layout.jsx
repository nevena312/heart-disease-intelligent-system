import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Heart Disease AI</h2>

        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/about">About Model</NavLink>
        </nav>
      </aside>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;