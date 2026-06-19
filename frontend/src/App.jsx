import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";


import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;