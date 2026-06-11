import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import AdminDashboard from "./app/components/AdminDashboard.tsx";
import Admissions from "./app/components/Admissions.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admissions" element={<Admissions />} />
    </Routes>
  </BrowserRouter>
);