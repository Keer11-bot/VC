import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ServiceDetails from './components/ServiceDetails';
import ContactForm from './components/ContactForm';
import AboutPage from './components/AboutPage';
import Collaborations from './components/Collaborations';
import AccessDenied from './pages/AccessDenied';
import SignupLogin from './pages/SignupLogin';
import UserTypeSelection from './pages/UserTypeSelection';
import AssetsPage from './pages/AssetsPage';
import StartupDashboard from './pages/StartupDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedHomePage from './components/AuthenticatedHomePage';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-dark-400 to-dark-300 text-white overflow-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<AuthenticatedHomePage />} />
            <Route path="/services" element={
              <PrivateRoute>
                <ServiceDetails />
              </PrivateRoute>
            } />
            <Route path="/portfolio" element={
              <PrivateRoute>
                <Portfolio />
              </PrivateRoute>
            } />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/colaborations" element={
              <PrivateRoute>
                <Collaborations />
              </PrivateRoute>
            } />
            <Route path="/assets" element={
              <PrivateRoute>
                <AssetsPage />
              </PrivateRoute>
            } />
            <Route path="/about" element={
              <PrivateRoute>
                <AboutPage />
              </PrivateRoute>
            } />
            <Route path="/selection" element={<UserTypeSelection />} />
            <Route path="/auth" element={<SignupLogin />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/startup-dashboard" element={
              <PrivateRoute>
                <StartupDashboard />
              </PrivateRoute>
            } />
            <Route path="/investor-dashboard" element={
              <PrivateRoute>
                <InvestorDashboard />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;