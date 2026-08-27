import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Brief from "./pages/brief/Brief";
import Header from "./components/header/Header";
import { consumePendingSection, scrollToSection } from "./lib/sections";

/**
 * Sahifa almashganda scroll pozitsiyasini boshqaradi:
 * kutilayotgan bo'lim bo'lsa — o'shanga, aks holda tepaga.
 *
 * Effektlar DOM commit bo'lgandan keyin ishlagani uchun bu yerda bo'limlar
 * allaqachon mavjud bo'ladi.
 */
function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const section = consumePendingSection();

    if (section && pathname === "/") {
      scrollToSection(section);
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brief" element={<Brief />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
