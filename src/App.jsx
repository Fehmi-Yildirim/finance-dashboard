import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Budgets from "./pages/Budgets";
import AboutApp from "./pages/AboutApp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import "./css/darkmode.css";
import { nl, enGB } from "date-fns/locale";

registerLocale("nl", nl);
registerLocale("en", enGB);

function App() {

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/transactions"
          element={
            <MainLayout>
              <Transactions />
            </MainLayout>
          }
        />

        <Route
          path="/budgets"
          element={
            <MainLayout>
              <Budgets />
            </MainLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <MainLayout>
              <Reports />
            </MainLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutApp />
            </MainLayout>
          }
        />
      </Route>
    </Routes>
  );

}

export default App;
