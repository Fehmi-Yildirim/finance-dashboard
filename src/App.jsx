import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from './components/Footer';
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Budgets from "./pages/Budgets";
import AboutApp from "./pages/AboutApp";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { nl, enGB } from "date-fns/locale";
import { useEffect } from "react";

// Register locales for date-fns
registerLocale("nl", nl);
registerLocale("en", enGB);


function App() {

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle(
      "dark-mode",
      darkMode
    );
  }, []);

  return (
    <MainLayout>
      <Header />
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutApp />} />
        </Routes>
      </main>
      <Footer />
    </MainLayout>
  );
}

export default App;