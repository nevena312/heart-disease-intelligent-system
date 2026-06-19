import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Heart Disease AI Tool</h2>

        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
        </nav>
      </aside>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;