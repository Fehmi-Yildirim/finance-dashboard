import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './components/Footer'; // Adjust the path if your file is located elsewhere
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { Route, Routes } from "react-router-dom";
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
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <Footer />

    </MainLayout>
  );
}

export default App;