import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import {
  ProviderSignUpPage,
  VisitorSignUpPage,
  SignUpSuccessPage,
} from '@/pages/SignUp';
import { MapPage } from '@/pages/Map';
import { DashboardPage } from '@/pages/Dashboard';

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/visitor" element={<VisitorSignUpPage />} />
          <Route path="/signup/provider" element={<ProviderSignUpPage />} />
          <Route path="/signup/success" element={<SignUpSuccessPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/place" element={<DashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
