import "./home.css";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import Services from "../../components/services/Services";
import Portfolio from "../../components/portfolio/Portfolio";
import Contact from "../../components/contact/Contact";

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  );
}

export default Home;
