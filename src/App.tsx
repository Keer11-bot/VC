import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetails from './components/ServiceDetails';
import PortfolioDetails from './components/PortfolioDetails';
import ContactForm from './components/ContactForm';
import AboutPage from './components/AboutPage';
import Collaborations from './components/Collaborations';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-dark-400 to-dark-300 text-white overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Services />
              <Portfolio />              
              <Contact />
              <Testimonials />
              <Collaborations />
              <Pricing />
            </>
          } />
          <Route path="/services" element={<ServiceDetails />} />
          <Route path="/portfolio" element={<PortfolioDetails />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;