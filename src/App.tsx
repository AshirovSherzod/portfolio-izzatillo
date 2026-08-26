import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Breaf from "./pages/breaf/Breaf";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breaf" element={<Breaf />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
