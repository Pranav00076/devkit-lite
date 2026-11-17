import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Comparison from "./components/Comparison.jsx";
import Features from "./components/Features.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Playground from "./components/Playground.jsx";
import Docs from "./components/Docs.jsx";
import DevExperience from "./components/DevExperience.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <Features />
        <HowItWorks />
        <Playground />
        <Docs />
        <DevExperience />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
